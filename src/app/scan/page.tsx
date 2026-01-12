"use client";

import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { parseQRData, CONTRACT_ADDRESS, CHAIN_ID } from "@/lib/contracts";

interface VerificationResult {
  success: boolean;
  message: string;
  data?: {
    tokenId: string;
    owner: string;
    used: boolean;
    eventName: string;
  };
}

type ScanStatus = "idle" | "scanning" | "verifying" | "success" | "error";

export default function ScanPage() {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [scannedData, setScannedData] = useState<string>("");
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
    }

    setStatus("scanning");
    setResult(null);

    // Small delay to ensure the DOM is ready
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
          showTorchButtonIfSupported: true,
        },
        false
      );

      scanner.render(onScanSuccess, onScanError);
      scannerRef.current = scanner;
    }, 100);
  };

  const onScanSuccess = async (decodedText: string) => {
    // Stop scanning
    if (scannerRef.current) {
      await scannerRef.current.clear();
      scannerRef.current = null;
    }

    setScannedData(decodedText);
    setStatus("verifying");

    try {
      const qrData = parseQRData(decodedText);
      
      if (!qrData) {
        setResult({
          success: false,
          message: "Invalid QR code format",
        });
        setStatus("error");
        return;
      }

      // Verify the QR data matches our contract
      if (qrData.contract.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) {
        setResult({
          success: false,
          message: "This ticket is from a different event contract",
        });
        setStatus("error");
        return;
      }

      if (qrData.chainId !== CHAIN_ID) {
        setResult({
          success: false,
          message: "This ticket is from a different blockchain network",
        });
        setStatus("error");
        return;
      }

      // Call verification API
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contract: qrData.contract,
          tokenId: qrData.tokenId,
          chainId: qrData.chainId,
          markUsed: true, // Mark as used on successful verification
        }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setResult({
          success: true,
          message: "Ticket verified successfully!",
          data: {
            tokenId: qrData.tokenId,
            owner: data.owner,
            used: false,
            eventName: data.eventName || "Event",
          },
        });
        setStatus("success");
      } else {
        setResult({
          success: false,
          message: data.error || "Ticket verification failed",
          data: data.used
            ? {
                tokenId: qrData.tokenId,
                owner: data.owner || "",
                used: true,
                eventName: data.eventName || "Event",
              }
            : undefined,
        });
        setStatus("error");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setResult({
        success: false,
        message: "Failed to verify ticket. Please try again.",
      });
      setStatus("error");
    }
  };

  const onScanError = (errorMessage: string) => {
    // Ignore most scan errors (they're just "no QR found" messages)
    console.debug("Scan error:", errorMessage);
  };

  const resetScanner = () => {
    setStatus("idle");
    setResult(null);
    setScannedData("");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm text-white/80">Gate Staff Scanner</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Ticket <span className="gradient-text">Verification</span>
          </h1>
          <p className="text-white/60">
            Scan attendee QR codes to verify and validate entry
          </p>
        </div>

        {/* Scanner / Results Area */}
        <div className="glass p-6 rounded-2xl">
          {status === "idle" && (
            <div className="text-center py-12">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Ready to Scan</h2>
              <p className="text-white/60 mb-8">
                Click the button below to start scanning QR codes
              </p>
              <button onClick={startScanner} className="btn-primary">
                Start Scanner
              </button>
            </div>
          )}

          {status === "scanning" && (
            <div>
              <div 
                id="qr-reader" 
                ref={containerRef}
                className="rounded-xl overflow-hidden mb-4"
              />
              <p className="text-white/60 text-center text-sm">
                Position the QR code within the frame
              </p>
            </div>
          )}

          {status === "verifying" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 relative mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-primary-500/20" />
                <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Verifying Ticket</h2>
              <p className="text-white/60">Checking blockchain for ownership...</p>
            </div>
          )}

          {status === "success" && result && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse-glow" style={{ "--tw-pulse-glow-color": "rgba(34, 197, 94, 0.5)" } as React.CSSProperties}>
                <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">ENTRY APPROVED</h2>
              <p className="text-white/60 mb-6">{result.message}</p>
              
              {result.data && (
                <div className="text-left space-y-3 border-t border-white/10 pt-6 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Token ID</span>
                    <span className="text-white font-medium">#{result.data.tokenId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Event</span>
                    <span className="text-white font-medium">{result.data.eventName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Owner</span>
                    <span className="text-white/80 font-mono text-xs">
                      {result.data.owner.slice(0, 8)}...{result.data.owner.slice(-6)}
                    </span>
                  </div>
                </div>
              )}

              <button onClick={resetScanner} className="btn-primary w-full">
                Scan Next Ticket
              </button>
            </div>
          )}

          {status === "error" && result && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">ENTRY DENIED</h2>
              <p className="text-white/60 mb-6">{result.message}</p>

              {result.data?.used && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 mb-6 text-left">
                  <p className="text-red-400 font-medium mb-2">⚠️ This ticket has already been used</p>
                  <p className="text-white/60 text-sm">
                    Token #{result.data.tokenId} was previously scanned for entry.
                  </p>
                </div>
              )}

              <button onClick={resetScanner} className="btn-primary w-full">
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">Instructions</h3>
          <ul className="space-y-3 text-white/60 text-sm">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 text-primary-400 text-xs font-bold">1</span>
              Click "Start Scanner" to activate the camera
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 text-primary-400 text-xs font-bold">2</span>
              Ask the attendee to show their ticket QR code
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 text-primary-400 text-xs font-bold">3</span>
              Position the QR code within the scanner frame
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 text-primary-400 text-xs font-bold">4</span>
              Wait for verification (green = allow entry, red = deny)
            </li>
          </ul>
        </div>

        {/* Status Legend */}
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-white/60">Valid - Allow Entry</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-white/60">Invalid - Deny Entry</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { EVENT_TICKET_ABI, CONTRACT_ADDRESS, generateQRData } from "@/lib/contracts";
import Link from "next/link";

interface Ticket {
  tokenId: number;
  isUsed: boolean;
}

export default function MyTicketsPage() {
  const { isConnected, address } = useAccount();
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  // Get user's ticket balance
  const { data: balance } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: EVENT_TICKET_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!CONTRACT_ADDRESS,
    },
  });

  // Get event details
  const { data: eventName } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: EVENT_TICKET_ABI,
    functionName: "eventName",
    query: {
      enabled: !!CONTRACT_ADDRESS,
    },
  });

  const { data: eventVenue } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: EVENT_TICKET_ABI,
    functionName: "eventVenue",
    query: {
      enabled: !!CONTRACT_ADDRESS,
    },
  });

  const { data: eventDate } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: EVENT_TICKET_ABI,
    functionName: "eventDate",
    query: {
      enabled: !!CONTRACT_ADDRESS,
    },
  });

  const ticketCount = balance ? Number(balance) : 0;

  // Create array of contract calls to get each ticket's token ID and used status
  const tokenIdCalls = ticketCount > 0
    ? Array.from({ length: ticketCount }, (_, i) => ({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: EVENT_TICKET_ABI,
        functionName: "tokenOfOwnerByIndex" as const,
        args: [address!, BigInt(i)] as const,
      }))
    : [];

  const { data: tokenIds } = useReadContracts({
    contracts: tokenIdCalls,
    query: {
      enabled: ticketCount > 0 && isConnected,
    },
  });

  // Get used status for each ticket
  const ticketUsedCalls = tokenIds
    ? tokenIds
        .filter((t) => t.status === "success")
        .map((t) => ({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: EVENT_TICKET_ABI,
          functionName: "ticketUsed" as const,
          args: [t.result as bigint] as const,
        }))
    : [];

  const { data: ticketUsedStatus } = useReadContracts({
    contracts: ticketUsedCalls,
    query: {
      enabled: ticketUsedCalls.length > 0,
    },
  });

  // Combine data into tickets array
  const tickets: Ticket[] = tokenIds
    ? tokenIds
        .filter((t) => t.status === "success")
        .map((t, i) => ({
          tokenId: Number(t.result),
          isUsed: ticketUsedStatus?.[i]?.result === true,
        }))
    : [];

  const formatEventDate = (timestamp: bigint | undefined) => {
    if (!timestamp) return "";
    return new Date(Number(timestamp) * 1000).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">View Your Tickets</h1>
          <p className="text-white/60 mb-8">
            Connect your wallet to view your NFT tickets and generate QR codes for event entry.
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  if (!CONTRACT_ADDRESS) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Contract Not Deployed</h1>
          <p className="text-white/60 mb-8">
            The smart contract hasn't been deployed yet. Please check back later or contact support.
          </p>
          <Link href="/events" className="btn-primary">
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            My <span className="gradient-text">Tickets</span>
          </h1>
          <p className="text-white/60">
            Your NFT tickets are stored in your wallet. Present the QR code at the event for entry.
          </p>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No tickets yet</h2>
            <p className="text-white/60 mb-8">
              You haven't purchased any NFT tickets. Browse events to get started!
            </p>
            <Link href="/events" className="btn-primary">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Tickets List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white mb-4">
                Your Tickets ({tickets.length})
              </h2>
              {tickets.map((ticket) => (
                <button
                  key={ticket.tokenId}
                  onClick={() => setSelectedTicket(ticket.tokenId)}
                  className={`w-full text-left card transition-all duration-300 ${
                    selectedTicket === ticket.tokenId
                      ? "ring-2 ring-primary-500 glow-sm"
                      : ""
                  } ${ticket.isUsed ? "opacity-60" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        ticket.isUsed
                          ? "bg-red-500/20"
                          : "bg-gradient-to-br from-primary-500/20 to-accent-500/20"
                      }`}>
                        <svg className={`w-6 h-6 ${ticket.isUsed ? "text-red-400" : "text-primary-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          Ticket #{ticket.tokenId}
                        </div>
                        <div className="text-sm text-white/60">
                          {eventName as string}
                        </div>
                      </div>
                    </div>
                    <div>
                      {ticket.isUsed ? (
                        <span className="status-error">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Used
                        </span>
                      ) : (
                        <span className="status-success">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Valid
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* QR Code Display */}
            <div className="lg:sticky lg:top-24">
              {selectedTicket !== null ? (
                <div className="glass p-8 rounded-2xl text-center">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    Ticket #{selectedTicket}
                  </h2>

                  {/* QR Code */}
                  <div className="qr-container inline-block mb-6">
                    <QRCodeSVG
                      value={generateQRData(selectedTicket)}
                      size={200}
                      level="H"
                      includeMargin
                      bgColor="#ffffff"
                      fgColor="#000000"
                    />
                  </div>

                  <p className="text-white/60 text-sm mb-6">
                    Present this QR code at the event entrance for verification
                  </p>

                  {/* Event Details */}
                  <div className="text-left space-y-3 border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Event</span>
                      <span className="text-white font-medium">{eventName as string}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Date</span>
                      <span className="text-white font-medium">
                        {formatEventDate(eventDate as bigint)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Venue</span>
                      <span className="text-white font-medium">{eventVenue as string}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Token ID</span>
                      <span className="text-white font-medium">#{selectedTicket}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Contract</span>
                      <span className="text-white/80 font-mono text-xs">
                        {CONTRACT_ADDRESS.slice(0, 8)}...{CONTRACT_ADDRESS.slice(-6)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass p-8 rounded-2xl text-center">
                  <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-white mb-2">Select a Ticket</h3>
                  <p className="text-white/60 text-sm">
                    Click on a ticket from the list to view its QR code
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getEventById, formatDate } from "@/lib/events";
import { EVENT_TICKET_ABI, CONTRACT_ADDRESS } from "@/lib/contracts";
import { useState } from "react";

export default function EventDetailPage() {
  const params = useParams();
  const { isConnected, address } = useAccount();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const event = getEventById(params.id as string);

  const { writeContract, data: hash, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handlePurchase = async () => {
    if (!event || !isConnected) return;

    try {
      setIsPurchasing(true);
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: EVENT_TICKET_ABI,
        functionName: "mintTicket",
        value: parseEther(event.ticketPrice),
      });
    } catch (err) {
      console.error("Purchase error:", err);
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Event Not Found</h1>
          <Link href="/events" className="btn-primary">
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  const ticketsRemaining = event.maxSupply - event.ticketsSold;
  const soldPercentage = (event.ticketsSold / event.maxSupply) * 100;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/events" className="text-white/60 hover:text-white">
                Events
              </Link>
            </li>
            <li className="text-white/40">/</li>
            <li className="text-white">{event.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-primary-900/50 to-accent-900/50 mb-8 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-24 h-24 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <span className="absolute top-4 left-4 px-4 py-1.5 rounded-lg text-sm font-medium bg-black/50 backdrop-blur-sm text-white">
                {event.category}
              </span>
            </div>

            {/* Event Details */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{event.name}</h1>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/40">Date</div>
                    <div className="text-white">{formatDate(event.date)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/40">Venue</div>
                    <div className="text-white">{event.venue}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/40">Organizer</div>
                    <div className="text-white">{event.organizer}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/40">Ticket Type</div>
                    <div className="text-white">NFT (ERC-721)</div>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-white mb-4">About This Event</h2>
                <p className="text-white/70 leading-relaxed">{event.description}</p>
              </div>

              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-white mb-4">NFT Ticket Benefits</h2>
                <ul className="space-y-3">
                  {[
                    "Tamper-proof and impossible to counterfeit",
                    "Verifiable ownership on the blockchain",
                    "True digital ownership in your wallet",
                    "Instant verification at event entry",
                    "Potential for future collectible value",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3 text-white/60">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Purchase Card - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="glass p-6 rounded-2xl">
                <h2 className="text-xl font-semibold text-white mb-6">Get Your Ticket</h2>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60">Price</span>
                  <span className="text-2xl font-bold gradient-text">{event.ticketPrice} ETH</span>
                </div>

                {/* Tickets Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/60">{event.ticketsSold} sold</span>
                    <span className="text-white/60">{ticketsRemaining} remaining</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                      style={{ width: `${soldPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Purchase Button */}
                {!isConnected ? (
                  <div className="space-y-4">
                    <ConnectButton.Custom>
                      {({ openConnectModal }) => (
                        <button
                          onClick={openConnectModal}
                          className="w-full btn-primary"
                        >
                          Connect Wallet to Purchase
                        </button>
                      )}
                    </ConnectButton.Custom>
                    <p className="text-xs text-white/40 text-center">
                      You need to connect your wallet to purchase tickets
                    </p>
                  </div>
                ) : isConfirmed ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-center">
                      <svg className="w-10 h-10 text-green-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-400 font-semibold">Purchase Successful!</p>
                      <p className="text-white/60 text-sm mt-1">Your NFT ticket has been minted</p>
                    </div>
                    <Link href="/my-tickets" className="block w-full btn-primary text-center">
                      View My Tickets
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={handlePurchase}
                      disabled={isPurchasing || isConfirming || ticketsRemaining === 0}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPurchasing || isConfirming ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {isConfirming ? "Confirming..." : "Processing..."}
                        </span>
                      ) : ticketsRemaining === 0 ? (
                        "Sold Out"
                      ) : (
                        `Purchase for ${event.ticketPrice} ETH`
                      )}
                    </button>

                    {writeError && (
                      <p className="text-red-400 text-sm text-center">
                        {writeError.message.includes("user rejected")
                          ? "Transaction cancelled"
                          : "Failed to purchase. Please try again."}
                      </p>
                    )}

                    <p className="text-xs text-white/40 text-center">
                      Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>
                )}

                {/* Info */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Secured by blockchain
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Instant delivery to wallet
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Valid until event date
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

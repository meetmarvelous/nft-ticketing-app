"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function HomePage() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-float animate-delay-200" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary-400/10 rounded-full blur-2xl animate-float animate-delay-300" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/80">Live on Sepolia Testnet</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
              <span className="text-white">The Future of</span>
              <br />
              <span className="gradient-text">Event Ticketing</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-8 animate-slide-up animate-delay-100">
              Say goodbye to fake tickets and fraud. Our blockchain-powered platform ensures every 
              ticket is unique, verifiable, and impossible to duplicate. Experience secure, 
              transparent ticketing for the Web3 era.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animate-delay-200">
              <Link href="/events" className="btn-primary text-lg px-8 py-4">
                Browse Events
              </Link>
              {!isConnected && (
                <div className="btn-secondary">
                  <ConnectButton label="Connect Wallet" />
                </div>
              )}
              {isConnected && (
                <Link href="/my-tickets" className="btn-secondary text-lg px-8 py-4">
                  View My Tickets
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in animate-delay-300">
              {[
                { value: "100%", label: "Fraud Prevention" },
                { value: "<2s", label: "Verification Time" },
                { value: "0", label: "Duplicate Scans" },
                { value: "24/7", label: "On-chain Availability" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Why NFT Tickets Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="why-nft">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why <span className="gradient-text">NFT Tickets</span>?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Traditional ticketing systems are broken. Fraud, counterfeits, and double-selling 
              cost the industry billions. Blockchain technology provides an elegant solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Impossible to Fake",
                description: "Each NFT ticket is cryptographically secured on the blockchain. It's mathematically impossible to create counterfeit tickets.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                title: "Transparent Ownership",
                description: "Anyone can verify ticket ownership on the public blockchain. No more disputes about who owns what.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Instant Verification",
                description: "Gate staff can verify tickets in under 2 seconds. Real-time blockchain queries ensure accuracy.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                ),
                title: "No Double Entry",
                description: "Once a ticket is scanned, it's marked as used on-chain. Screenshots and copies are worthless.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                title: "True Ownership",
                description: "You actually own your ticket in your wallet. No platform can revoke it without your consent.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
                title: "Auditable Trail",
                description: "Every transaction is permanently recorded. Complete transparency for organizers and attendees.",
              },
            ].map((feature) => (
              <div key={feature.title} className="card group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-4 text-primary-400 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Getting started is simple. Connect your wallet, purchase your ticket, and you're ready to go.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Your Wallet",
                description: "Use MetaMask or any WalletConnect-compatible wallet. Your wallet is your identity and ticket holder.",
                color: "from-primary-500 to-primary-600",
              },
              {
                step: "02",
                title: "Purchase Tickets",
                description: "Browse events and buy NFT tickets directly. Each ticket is minted as a unique ERC-721 token to your wallet.",
                color: "from-accent-500 to-accent-600",
              },
              {
                step: "03",
                title: "Present at Entry",
                description: "Show your QR code at the venue. Gate staff scan it, verify ownership on-chain, and you're in!",
                color: "from-green-500 to-green-600",
              },
            ].map((step) => (
              <div key={step.step} className="relative">
                <div className="card h-full">
                  <div className={`inline-block text-5xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Traditional vs <span className="gradient-text">NFT Tickets</span>
            </h2>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-white/60 font-medium">Issue</th>
                  <th className="px-6 py-4 text-center text-white/60 font-medium">Traditional</th>
                  <th className="px-6 py-4 text-center text-white/60 font-medium">NFT Tickets</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { issue: "Fake Tickets", traditional: "Common problem", nft: "Impossible" },
                  { issue: "Double Selling", traditional: "Database conflicts", nft: "Single on-chain owner" },
                  { issue: "Verification", traditional: "Trust the platform", nft: "Trust the blockchain" },
                  { issue: "Transparency", traditional: "Closed systems", nft: "Public ledger" },
                  { issue: "Ownership", traditional: "License to attend", nft: "True digital ownership" },
                ].map((row, i) => (
                  <tr key={row.issue} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                    <td className="px-6 py-4 text-white font-medium">{row.issue}</td>
                    <td className="px-6 py-4 text-center text-red-400">{row.traditional}</td>
                    <td className="px-6 py-4 text-center text-green-400">{row.nft}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-dark p-12 rounded-3xl glow">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Experience the Future?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Join thousands of event-goers who have already discovered the security and 
              convenience of NFT-based ticketing.
            </p>
            <Link href="/events" className="btn-primary text-lg px-10 py-4 inline-block">
              Explore Events Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

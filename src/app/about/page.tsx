import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - NFT Tickets | Blockchain Event Ticketing",
  description: "Learn how NFT-based ticketing eliminates fraud, provides transparency, and revolutionizes the event industry.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">NFT Tickets</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We're revolutionizing event ticketing by leveraging blockchain technology to 
            create a secure, transparent, and fraud-proof ticketing ecosystem.
          </p>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                The Problem with Traditional Ticketing
              </h2>
              <p className="text-white/70 mb-4">
                The event ticketing industry is plagued with issues that cost organizers and 
                attendees billions of dollars every year:
              </p>
              <ul className="space-y-3">
                {[
                  "Fake and counterfeit tickets flood the secondary market",
                  "Double-selling leads to denied entry for legitimate buyers",
                  "Screenshots and copied QR codes enable fraudulent entry",
                  "Centralized databases are opaque and can be manipulated",
                  "Buyers have no way to verify ticket authenticity",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/60">
                    <span className="text-red-400 font-bold mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass p-8 rounded-2xl">
              <div className="text-center mb-6">
                <span className="text-6xl font-bold text-red-400">$8.6B</span>
                <p className="text-white/60 mt-2">Annual losses from ticket fraud globally</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-6xl font-bold text-orange-400">12%</span>
                <p className="text-white/60 mt-2">Of tickets sold are counterfeit or fraudulent</p>
              </div>
              <div className="text-center">
                <span className="text-6xl font-bold text-yellow-400">50M+</span>
                <p className="text-white/60 mt-2">People scammed by fake tickets each year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50" id="solution">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our <span className="gradient-text">Solution</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              NFT Tickets uses blockchain technology to create an immutable, transparent, 
              and verifiable ticketing system that eliminates fraud entirely.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </span>
                NFTs as Tickets
              </h3>
              <p className="text-white/60">
                Each ticket is minted as an ERC-721 NFT (Non-Fungible Token) on the Ethereum 
                blockchain. This means every ticket is unique, has a verifiable owner, and 
                cannot be duplicated or counterfeited.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center text-accent-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                On-Chain Verification
              </h3>
              <p className="text-white/60">
                Ticket ownership is verified directly on the blockchain. Gate staff simply 
                scan a QR code, and our system queries the blockchain to confirm the scanner 
                owns the ticket and it hasn't been used.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </span>
                Anti-Double-Scan
              </h3>
              <p className="text-white/60">
                Once a ticket is scanned for entry, it's marked as "used" on the blockchain. 
                Any subsequent scan attempts will be rejected, preventing one ticket from 
                being used multiple times.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
                Public Transparency
              </h3>
              <p className="text-white/60">
                All transactions are recorded on a public blockchain. Anyone can audit 
                ticket sales, ownership transfers, and usage. Complete transparency builds 
                trust between organizers and attendees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Detail */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
          </div>

          {/* For Attendees */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">For Attendees</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Connect Wallet",
                  description: "Connect your Ethereum wallet (MetaMask, WalletConnect, etc.) to our platform.",
                },
                {
                  step: "2",
                  title: "Browse & Buy",
                  description: "Explore upcoming events and purchase tickets using ETH. The NFT is minted to your wallet instantly.",
                },
                {
                  step: "3",
                  title: "View Ticket",
                  description: "Access your tickets anytime in \"My Tickets\". Each ticket has a unique QR code.",
                },
                {
                  step: "4",
                  title: "Enter Event",
                  description: "Show your QR code at the venue. Staff scan it, verify on-chain, and grant entry.",
                },
              ].map((item) => (
                <div key={item.step} className="card text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* For Organizers */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">For Event Organizers</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Create Event",
                  description: "Set up your event with details, ticket price, and maximum supply.",
                },
                {
                  step: "2",
                  title: "Deploy Contract",
                  description: "Your event gets a dedicated smart contract deployed on Ethereum.",
                },
                {
                  step: "3",
                  title: "Sell Tickets",
                  description: "Attendees purchase tickets; funds go directly to your wallet.",
                },
                {
                  step: "4",
                  title: "Verify Entry",
                  description: "Use our scanner app to verify and mark tickets as used at the venue.",
                },
              ].map((item) => (
                <div key={item.step} className="card text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* For Gate Staff */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">For Gate Staff</h3>
            <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Scan QR Code</h4>
                  <p className="text-white/60 text-sm">
                    Use our scanner page on any device with a camera. Point at the attendee's QR code.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Instant Result</h4>
                  <p className="text-white/60 text-sm">
                    Get a clear green checkmark for valid tickets or red X for invalid/used tickets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is an NFT ticket?",
                a: "An NFT (Non-Fungible Token) ticket is a blockchain-based digital ticket that is unique, verifiable, and owned by you in your cryptocurrency wallet. Unlike traditional e-tickets which are just files that can be copied, NFT tickets cannot be duplicated.",
              },
              {
                q: "Do I need to know about blockchain to use this?",
                a: "Not at all! We've designed the experience to be as simple as any traditional ticket platform. You'll need a wallet like MetaMask (which we'll guide you through setting up), but the purchasing and verification process is straightforward.",
              },
              {
                q: "What if I lose access to my wallet?",
                a: "Just like with any cryptocurrency wallet, it's crucial to keep your recovery phrase (seed phrase) safe. If you have it, you can recover your wallet and tickets. This is why we recommend writing it down and storing it securely.",
              },
              {
                q: "Can I transfer or sell my ticket?",
                a: "As the owner of the NFT, you can transfer it to any other wallet. Future versions will include a built-in marketplace for secure secondary sales with anti-scalping measures.",
              },
              {
                q: "What happens if there's a network issue at the event?",
                a: "Our system is designed for reliability. Verification typically takes less than 2 seconds. We also implement fallback mechanisms and can pre-cache ticket data for offline verification if needed.",
              },
              {
                q: "Which blockchain do you use?",
                a: "We currently use Ethereum (Sepolia testnet for this demo, mainnet for production). Ethereum provides the security and decentralization needed for trustworthy ticketing.",
              },
            ].map((faq) => (
              <details key={faq.q} className="group card">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                  <svg
                    className="w-5 h-5 text-white/60 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-white/60">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Experience the future of event ticketing today. Browse our upcoming events 
            and secure your NFT tickets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/events" className="btn-primary">
              Browse Events
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

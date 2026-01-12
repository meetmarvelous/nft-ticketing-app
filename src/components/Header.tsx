"use client";

import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/my-tickets", label: "My Tickets" },
    { href: "/about", label: "About" },
    { href: "/scan", label: "Scan", badge: "Staff" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
            aria-label="NFT Tickets Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <span className="text-xl font-bold hidden sm:block">
              <span className="gradient-text">NFT</span>
              <span className="text-white">Tickets</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-white/70 hover:text-white transition-colors duration-300 font-medium group"
              >
                {link.label}
                {link.badge && (
                  <span className="absolute -top-2 -right-8 text-xs px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-400 border border-accent-500/30">
                    {link.badge}
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Wallet Connect & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <ConnectButton 
                showBalance={false}
                chainStatus="icon"
                accountStatus="avatar"
              />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-400 border border-accent-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-4 px-4 sm:hidden">
                <ConnectButton 
                  showBalance={false}
                  chainStatus="icon"
                  accountStatus="full"
                />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFT Tickets - Secure Blockchain Event Ticketing",
  description: "Experience the future of event ticketing. Buy, hold, and verify NFT tickets with complete transparency and security. No fake tickets, no fraud.",
  keywords: ["NFT", "tickets", "blockchain", "events", "Web3", "Ethereum", "secure ticketing"],
  authors: [{ name: "NFT Tickets" }],
  openGraph: {
    title: "NFT Tickets - Secure Blockchain Event Ticketing",
    description: "Experience the future of event ticketing with NFT-based tickets.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          {/* Skip link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          
          <Header />
          
          <main id="main-content" className="flex-1 pt-16 md:pt-20">
            {children}
          </main>
          
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

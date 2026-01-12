# NFT Event Ticketing System

A production-ready decentralized web application for event ticketing using ERC-721 NFTs.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📦 Deployed Contract

| Field        | Value                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| **Network**  | Sepolia Testnet                                                                                      |
| **Address**  | `0xef657f0E38a7Fc7a80D766B6C1B6d24F1976EC16`                                                         |
| **Explorer** | [View on Etherscan](https://sepolia.etherscan.io/address/0xef657f0E38a7Fc7a80D766B6C1B6d24F1976EC16) |

## ⚙️ Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
# Blockchain
SEPOLIA_RPC_URL=your_rpc_url
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_key

# Frontend
NEXT_PUBLIC_CONTRACT_ADDRESS=0xef657f0E38a7Fc7a80D766B6C1B6d24F1976EC16
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

## 🛠️ Scripts

| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npm run dev`            | Start development server |
| `npm run build`          | Build for production     |
| `npm run compile`        | Compile smart contracts  |
| `npm run test:contracts` | Run contract tests       |
| `npm run deploy:sepolia` | Deploy to Sepolia        |

## 📁 Project Structure

```
├── contracts/          # Solidity smart contracts
├── scripts/            # Deployment scripts
├── test/               # Contract tests
├── docs/               # Documentation
└── src/
    ├── app/            # Next.js pages
    ├── components/     # React components
    └── lib/            # Utilities & config
```

## 📚 Documentation

- [Smart Contract](./docs/SMART_CONTRACT.md) - Contract functions & security
- [Deployment Log](./docs/DEPLOYMENT.md) - Deployment details

## 🔐 Features

- **NFT Tickets** - ERC-721 standard, wallet-stored
- **Anti-Fraud** - On-chain ownership verification
- **Double-Scan Prevention** - One-time entry per ticket
- **QR Verification** - Instant gate staff scanning
- **Wallet Connect** - MetaMask, WalletConnect support

## 📄 License

MIT

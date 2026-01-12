# NFT Event Ticketing System

A decentralized, secure, and transparent event ticketing platform built on the Ethereum blockchain.

## 💡 The Problem

Traditional event ticketing is broken:

- **Fraud & Counterfeits**: Fake tickets are easily sold to unsuspecting buyers.
- **Scalping**: Bots and scalpers inflate prices, hurting real fans.
- **Lack of Control**: Organizers lose visibility once a ticket is resold.
- **Double Spending**: Duplicate tickets can be sold multiple times.

## 🚀 The Solution

This application uses **ERC-721 NFTs** to represent tickets, ensuring:

- **True Ownership**: Tickets are digital assets stored in the user's wallet.
- **Immutability**: Ownership history is recorded on the blockchain and cannot be forged.
- **Verifiable Authenticity**: Gate staff can instantly verify ticket validity on-chain.
- **Controlled Resale**: Smart contracts can enforce royalty fees or price caps (future feature).

## ✨ Key Features

- **Minting**: Users can purchase unique NFT tickets directly from the smart contract.
- **Wallet Connection**: Seamless login with MetaMask, Rainbow, and other WalletConnect wallets.
- **QR Code Entry**: Each ticket generates a unique QR code for easy scanning at the venue.
- **Gatekeeper Mode**: Dedicated interface for event staff to scan and verify tickets in real-time.
- **Double-Entry Prevention**: Smart contract logic ensures a ticket can only be "used" once.
- **Responsive Design**: A premium, mobile-first UI built with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Blockchain Interaction**: Wagmi, Viem, RainbowKit, TanStack Query
- **Smart Contracts**: Solidity (v0.8.20), Hardhat, OpenZeppelin
- **Testing**: Chai, Mocha, Hardhat Toolbox

## 📦 Deployed Contract (Sepolia Testnet)

| Parameter            | Value                                                                                                |
| :------------------- | :--------------------------------------------------------------------------------------------------- |
| **Network**          | Sepolia                                                                                              |
| **Contract Address** | `0x4f5082Ac451DE16e1f6db074B0c7956366BB0966`                                                         |
| **Explorer**         | [View on Etherscan](https://sepolia.etherscan.io/address/0x4f5082Ac451DE16e1f6db074B0c7956366BB0966) |

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- A crypto wallet (e.g., MetaMask) with some Sepolia ETH.

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/meetmarvelous/nft-ticketing-app.git
    cd nft-ticketing-app
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment**
    Copy `.env.example` to `.env.local` and add your keys:

    ```bash
    cp .env.example .env.local
    ```

    Update the following variables in `.env.local`:

    - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Get one from [WalletConnect Cloud](https://cloud.walletconnect.com/).
    - `NEXT_PUBLIC_RPC_URL`: Your Sepolia RPC URL (e.g., Alchemy/Infura).

4.  **Run the application**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Running Tests

To run the smart contract test suite:

```bash
npm run test:contracts
```

## 📄 License

This project is licensed under the MIT License.

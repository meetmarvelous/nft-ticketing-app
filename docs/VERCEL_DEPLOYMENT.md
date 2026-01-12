# Vercel Deployment Guide

This guide outlines the steps to deploy the NFT Ticketing App to Vercel.

## Prerequisites

1.  **GitHub Repository**: Ensure your project is pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you haven't already.
3.  **WalletConnect Project ID**: You need a Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).
4.  **RPC URL**: A Sepolia RPC URL (e.g., from Alchemy, Infura, or QuickNode).

## Environment Variables

When deploying to Vercel, you must configure the following environment variables in the **Settings > Environment Variables** section of your Vercel project.

**DO NOT commit these values to GitHub.**

| Variable Name                          | Description                                 | Example Value (Do not use real secrets here) |
| :------------------------------------- | :------------------------------------------ | :------------------------------------------- |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Your WalletConnect Project ID               | `a1b2c3...`                                  |
| `NEXT_PUBLIC_CONTRACT_ADDRESS`         | The address of your deployed smart contract | `0x123...`                                   |
| `NEXT_PUBLIC_RPC_URL`                  | HTTP RPC URL for Sepolia Testnet            | `https://eth-sepolia.g.alchemy.com/v2/...`   |
| `NEXT_PUBLIC_CHAIN_ID`                 | The Chain ID for the network (Sepolia)      | `11155111`                                   |

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Ensure you do not add private keys (like your wallet private key) to Vercel environment variables unless you are using them in server-side API routes (which this app currently does not use for sensitive operations).

## Deployment Steps

1.  **Log in to Vercel** and go to your Dashboard.
2.  Click **"Add New..."** -> **"Project"**.
3.  **Import** your GitHub repository.
4.  In the **Configure Project** screen:
    - **Framework Preset**: Next.js (should be auto-detected).
    - **Root Directory**: `./` (default).
    - **Build Command**: `next build` (default).
    - **Output Directory**: `.next` (default).
5.  Expand the **Environment Variables** section and add the variables listed above.
6.  Click **Deploy**.

## Post-Deployment

- Vercel will build your application and provide a production URL (e.g., `https://your-project.vercel.app`).
- Test the application by connecting your wallet and verifying that it correctly reads data from the Sepolia testnet.

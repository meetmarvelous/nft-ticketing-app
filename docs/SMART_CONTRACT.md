# Smart Contract Documentation

## EventTicket.sol

**Contract Address (Sepolia):** `0xef657f0E38a7Fc7a80D766B6C1B6d24F1976EC16`

**Etherscan:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xef657f0E38a7Fc7a80D766B6C1B6d24F1976EC16)

---

## Overview

The `EventTicket` contract is an ERC-721 NFT implementation designed for event ticketing. Each ticket is a unique, non-fungible token that proves ownership and can be verified at event entry.

### Key Features

| Feature                   | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| **ERC-721 Standard**      | Full compatibility with NFT marketplaces and wallets |
| **ERC721Enumerable**      | Allows listing all tickets owned by an address       |
| **Reentrancy Protection** | Guards against reentrancy attacks during minting     |
| **Access Control**        | Owner and authorized verifiers only                  |
| **Usage Tracking**        | Prevents double-entry at events                      |

---

## Contract Functions

### Public Functions

| Function                 | Description                           | Access |
| ------------------------ | ------------------------------------- | ------ |
| `mintTicket()`           | Purchase a ticket by sending ETH      | Anyone |
| `verifyTicket(tokenId)`  | Check if a ticket is valid and unused | View   |
| `getTicketInfo(tokenId)` | Get full ticket details               | View   |
| `ticketsRemaining()`     | Get how many tickets are left         | View   |
| `totalTicketsSold()`     | Get total tickets minted              | View   |

### Owner Functions

| Function                       | Description                      |
| ------------------------------ | -------------------------------- |
| `ownerMint(address)`           | Mint a free ticket (promotional) |
| `batchMint(address, quantity)` | Mint multiple tickets at once    |
| `setVerifier(address, status)` | Authorize/deauthorize a verifier |
| `setTicketPrice(price)`        | Update the ticket price          |
| `setEventURI(uri)`             | Update metadata URI              |
| `withdraw()`                   | Withdraw contract funds          |

### Verifier Functions

| Function            | Description                     |
| ------------------- | ------------------------------- |
| `markUsed(tokenId)` | Mark a ticket as used for entry |

---

## Events

The contract emits events for all important actions:

```solidity
event TicketMinted(address indexed buyer, uint256 indexed tokenId, uint256 price);
event TicketUsed(uint256 indexed tokenId, address indexed verifier, uint256 timestamp);
event VerifierStatusChanged(address indexed verifier, bool status);
event PriceUpdated(uint256 oldPrice, uint256 newPrice);
event FundsWithdrawn(address indexed to, uint256 amount);
```

---

## Security Features

### 1. Reentrancy Protection

```solidity
function mintTicket() external payable nonReentrant returns (uint256)
```

Uses OpenZeppelin's `ReentrancyGuard` to prevent reentrancy attacks.

### 2. Checks-Effects-Interactions (CEI) Pattern

All functions follow the CEI pattern to prevent vulnerabilities:

1. **Checks** - Validate conditions
2. **Effects** - Update state
3. **Interactions** - External calls

### 3. Access Control

- `onlyOwner` - Contract owner only
- `onlyVerifier` - Authorized verifiers or owner

### 4. Custom Errors (Gas Efficient)

```solidity
error MaxSupplyReached();
error InsufficientPayment();
error TicketAlreadyUsed();
error NotAuthorizedVerifier();
error TicketDoesNotExist();
```

---

## Deployment Details

| Parameter        | Value                |
| ---------------- | -------------------- |
| **Network**      | Sepolia Testnet      |
| **Chain ID**     | 11155111             |
| **Event Name**   | Tech Conference 2026 |
| **Symbol**       | TECH26               |
| **Max Supply**   | 1000 tickets         |
| **Ticket Price** | 0.01 ETH             |
| **Event Date**   | June 15, 2026        |

---

## Integration

### Frontend Integration (wagmi/viem)

```typescript
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";

// Purchase a ticket
const { writeContract } = useWriteContract();
await writeContract({
  address: CONTRACT_ADDRESS,
  abi: EVENT_TICKET_ABI,
  functionName: "mintTicket",
  value: parseEther("0.01"),
});
```

### Verifying a Ticket

```typescript
// Check ticket validity
const [isValid, owner] = await contract.verifyTicket(tokenId);

// Mark as used (verifier only)
await contract.markUsed(tokenId);
```

---

## Gas Estimates

| Function         | Gas (approx) |
| ---------------- | ------------ |
| `mintTicket()`   | ~150,000     |
| `markUsed()`     | ~50,000      |
| `verifyTicket()` | View (free)  |
| `ownerMint()`    | ~130,000     |

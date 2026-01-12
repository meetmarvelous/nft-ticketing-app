import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

// Contract ABI for verification functions
const VERIFY_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "verifyTicket",
    outputs: [
      { internalType: "bool", name: "isValid", type: "bool" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ticketUsed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eventName",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eventVenue",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// In-memory cache for double-scan prevention (use Redis/KV in production)
const usedTicketsCache = new Map<string, { timestamp: number; tokenId: string }>();

// Rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests per minute

interface VerifyRequest {
  contract: string;
  tokenId: string;
  chainId: number;
  markUsed?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateLimit = rateLimitMap.get(clientIP);

    if (rateLimit) {
      if (now - rateLimit.timestamp < RATE_LIMIT_WINDOW) {
        if (rateLimit.count >= RATE_LIMIT_MAX) {
          return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }
        rateLimit.count++;
      } else {
        rateLimitMap.set(clientIP, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(clientIP, { count: 1, timestamp: now });
    }

    // Parse request body
    const body: VerifyRequest = await request.json();

    // Input validation
    if (!body.contract || !body.tokenId || !body.chainId) {
      return NextResponse.json(
        { error: "Missing required fields: contract, tokenId, chainId" },
        { status: 400 }
      );
    }

    // Validate contract address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(body.contract)) {
      return NextResponse.json(
        { error: "Invalid contract address format" },
        { status: 400 }
      );
    }

    // Validate tokenId is a valid number
    const tokenId = BigInt(body.tokenId);
    if (tokenId < 0) {
      return NextResponse.json(
        { error: "Invalid token ID" },
        { status: 400 }
      );
    }

    // Validate chain ID
    if (body.chainId !== 11155111) {
      return NextResponse.json(
        { error: "Unsupported chain. Only Sepolia (11155111) is supported." },
        { status: 400 }
      );
    }

    // Create cache key for double-scan prevention
    const cacheKey = `${body.contract.toLowerCase()}-${body.tokenId}`;

    // Check if ticket was recently verified (prevent rapid re-scanning)
    const cachedEntry = usedTicketsCache.get(cacheKey);
    if (cachedEntry && body.markUsed) {
      const timeSinceUse = now - cachedEntry.timestamp;
      if (timeSinceUse < 5000) {
        // Within 5 seconds, likely duplicate scan
        return NextResponse.json(
          {
            valid: false,
            error: "This ticket was just verified. Please wait before scanning again.",
            used: false,
          },
          { status: 200 }
        );
      }
    }

    // Create public client for blockchain queries
    const client = createPublicClient({
      chain: sepolia,
      transport: http(process.env.NEXT_PUBLIC_RPC_URL || process.env.SEPOLIA_RPC_URL),
    });

    // Check if ticket is already used on-chain
    const isUsed = await client.readContract({
      address: body.contract as `0x${string}`,
      abi: VERIFY_ABI,
      functionName: "ticketUsed",
      args: [tokenId],
    });

    if (isUsed) {
      return NextResponse.json({
        valid: false,
        error: "This ticket has already been used for entry",
        used: true,
      });
    }

    // Verify ticket ownership
    const [isValid, owner] = await client.readContract({
      address: body.contract as `0x${string}`,
      abi: VERIFY_ABI,
      functionName: "verifyTicket",
      args: [tokenId],
    });

    // Get event details
    const eventName = await client.readContract({
      address: body.contract as `0x${string}`,
      abi: VERIFY_ABI,
      functionName: "eventName",
    });

    const eventVenue = await client.readContract({
      address: body.contract as `0x${string}`,
      abi: VERIFY_ABI,
      functionName: "eventVenue",
    });

    if (!isValid) {
      return NextResponse.json({
        valid: false,
        error: "Ticket is not valid",
        used: false,
      });
    }

    // Mark as verified in cache (for rapid re-scan prevention)
    if (body.markUsed) {
      usedTicketsCache.set(cacheKey, { timestamp: now, tokenId: body.tokenId });
    }

    // Return success response
    return NextResponse.json({
      valid: true,
      owner: owner as string,
      tokenId: body.tokenId,
      eventName: eventName as string,
      eventVenue: eventVenue as string,
      message: "Ticket verified successfully",
    });

  } catch (error) {
    console.error("Verification error:", error);

    // Handle specific errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Check for contract revert errors
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    if (errorMessage.includes("TicketDoesNotExist")) {
      return NextResponse.json({
        valid: false,
        error: "Ticket does not exist",
        used: false,
      });
    }

    return NextResponse.json(
      { error: "Failed to verify ticket. Please try again." },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Verification API is running",
    supportedChains: [{ id: 11155111, name: "Sepolia" }],
  });
}

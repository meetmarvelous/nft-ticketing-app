import { ethers, run, network } from "hardhat";

async function main() {
  console.log("🚀 Starting EventTicket deployment...\n");

  // Deployment parameters - customize as needed
  const EVENT_NAME = "Tech Conference 2026";
  const EVENT_SYMBOL = "TECH26";
  const MAX_SUPPLY = 1000;
  const TICKET_PRICE = ethers.parseEther("0.01"); // 0.01 ETH
  const EVENT_DATE = Math.floor(new Date("2026-06-15").getTime() / 1000);
  const EVENT_VENUE = "Convention Center, San Francisco";
  const EVENT_URI = "ipfs://QmExampleHash/metadata.json"; // Replace with actual IPFS URI

  console.log("📋 Deployment Parameters:");
  console.log(`   Event Name: ${EVENT_NAME}`);
  console.log(`   Symbol: ${EVENT_SYMBOL}`);
  console.log(`   Max Supply: ${MAX_SUPPLY}`);
  console.log(`   Ticket Price: ${ethers.formatEther(TICKET_PRICE)} ETH`);
  console.log(`   Event Date: ${new Date(EVENT_DATE * 1000).toISOString()}`);
  console.log(`   Venue: ${EVENT_VENUE}\n`);

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log(`👤 Deploying with account: ${deployer.address}`);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`💰 Account balance: ${ethers.formatEther(balance)} ETH\n`);

  // Deploy contract
  console.log("📦 Deploying EventTicket contract...");
  
  const EventTicket = await ethers.getContractFactory("EventTicket");
  const eventTicket = await EventTicket.deploy(
    EVENT_NAME,
    EVENT_SYMBOL,
    MAX_SUPPLY,
    TICKET_PRICE,
    EVENT_DATE,
    EVENT_VENUE,
    EVENT_URI
  );

  await eventTicket.waitForDeployment();
  
  const contractAddress = await eventTicket.getAddress();
  console.log(`✅ EventTicket deployed to: ${contractAddress}\n`);

  // Verify on Etherscan (if not local network)
  if (network.name === "sepolia" && process.env.ETHERSCAN_API_KEY) {
    console.log("⏳ Waiting for block confirmations...");
    await eventTicket.deploymentTransaction()?.wait(6);

    console.log("🔍 Verifying contract on Etherscan...");
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: [
          EVENT_NAME,
          EVENT_SYMBOL,
          MAX_SUPPLY,
          TICKET_PRICE,
          EVENT_DATE,
          EVENT_VENUE,
          EVENT_URI,
        ],
      });
      console.log("✅ Contract verified on Etherscan!\n");
    } catch (error: any) {
      if (error.message.includes("Already Verified")) {
        console.log("ℹ️  Contract already verified\n");
      } else {
        console.error("❌ Verification failed:", error.message);
      }
    }
  }

  // Summary
  console.log("═══════════════════════════════════════════");
  console.log("           DEPLOYMENT SUMMARY              ");
  console.log("═══════════════════════════════════════════");
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`Network: ${network.name}`);
  console.log(`Chain ID: ${network.config.chainId}`);
  console.log("═══════════════════════════════════════════\n");
  
  console.log("📝 Next Steps:");
  console.log("   1. Copy the contract address above");
  console.log("   2. Update NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local");
  console.log("   3. Run the frontend with: npm run dev");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

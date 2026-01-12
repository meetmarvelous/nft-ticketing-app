import { expect } from "chai";
import { ethers } from "hardhat";
import { EventTicket } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("EventTicket", function () {
  let eventTicket: EventTicket;
  let owner: HardhatEthersSigner;
  let buyer: HardhatEthersSigner;
  let verifier: HardhatEthersSigner;
  let attacker: HardhatEthersSigner;

  const EVENT_NAME = "Test Event";
  const EVENT_SYMBOL = "TEST";
  const MAX_SUPPLY = 100;
  const TICKET_PRICE = ethers.parseEther("0.0001");
  const EVENT_DATE = Math.floor(Date.now() / 1000) + 86400;
  const EVENT_VENUE = "Test Venue";
  const EVENT_URI = "ipfs://test";

  beforeEach(async function () {
    [owner, buyer, verifier, attacker] = await ethers.getSigners();

    const EventTicketFactory = await ethers.getContractFactory("EventTicket");
    eventTicket = await EventTicketFactory.deploy(
      EVENT_NAME,
      EVENT_SYMBOL,
      MAX_SUPPLY,
      TICKET_PRICE,
      EVENT_DATE,
      EVENT_VENUE,
      EVENT_URI
    );
    await eventTicket.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct event details", async function () {
      expect(await eventTicket.eventName()).to.equal(EVENT_NAME);
      expect(await eventTicket.maxSupply()).to.equal(MAX_SUPPLY);
      expect(await eventTicket.ticketPrice()).to.equal(TICKET_PRICE);
    });

    it("Should set the correct owner", async function () {
      expect(await eventTicket.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function () {
    it("Should mint a ticket with correct payment", async function () {
      await expect(eventTicket.connect(buyer).mintTicket({ value: TICKET_PRICE }))
        .to.emit(eventTicket, "TicketMinted")
        .withArgs(buyer.address, 0, TICKET_PRICE);

      expect(await eventTicket.ownerOf(0)).to.equal(buyer.address);
    });

    it("Should revert with insufficient payment", async function () {
      const insufficientPayment = ethers.parseEther("0.00001");
      await expect(
        eventTicket.connect(buyer).mintTicket({ value: insufficientPayment })
      ).to.be.revertedWithCustomError(eventTicket, "InsufficientPayment");
    });
  });

  describe("Ticket Verification", function () {
    beforeEach(async function () {
      await eventTicket.connect(buyer).mintTicket({ value: TICKET_PRICE });
    });

    it("Should verify valid unused ticket", async function () {
      const [isValid, ticketOwner] = await eventTicket.verifyTicket(0);
      expect(isValid).to.be.true;
      expect(ticketOwner).to.equal(buyer.address);
    });
  });

  describe("Ticket Usage", function () {
    beforeEach(async function () {
      await eventTicket.connect(buyer).mintTicket({ value: TICKET_PRICE });
      await eventTicket.connect(owner).setVerifier(verifier.address, true);
    });

    it("Should allow verifier to mark ticket as used", async function () {
      await expect(eventTicket.connect(verifier).markUsed(0))
        .to.emit(eventTicket, "TicketUsed");
    });

    it("Should prevent double usage", async function () {
      await eventTicket.connect(verifier).markUsed(0);
      await expect(
        eventTicket.connect(verifier).markUsed(0)
      ).to.be.revertedWithCustomError(eventTicket, "TicketAlreadyUsed");
    });
  });
});

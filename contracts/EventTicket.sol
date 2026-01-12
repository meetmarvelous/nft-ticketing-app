// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title EventTicket
 * @author NFT Ticketing System
 * @notice ERC-721 based event ticketing with anti-fraud protection
 * @dev Implements secure minting, ownership verification, and usage tracking
 * 
 * Security Features:
 * - Reentrancy protection via OpenZeppelin's ReentrancyGuard
 * - Overflow protection (Solidity 0.8+)
 * - Access control via Ownable
 * - CEI pattern (Checks-Effects-Interactions)
 * - Event emissions for auditability
 */
contract EventTicket is ERC721, ERC721Enumerable, Ownable, ReentrancyGuard {
    
    // ========================================
    // STATE VARIABLES
    // ========================================
    
    /// @notice Maximum number of tickets that can be minted
    uint256 public immutable maxSupply;
    
    /// @notice Current ticket price in wei
    uint256 public ticketPrice;
    
    /// @notice Event metadata URI
    string public eventURI;
    
    /// @notice Event name
    string public eventName;
    
    /// @notice Event date (unix timestamp)
    uint256 public eventDate;
    
    /// @notice Event venue/location
    string public eventVenue;
    
    /// @notice Counter for token IDs
    uint256 private _tokenIdCounter;
    
    /// @notice Mapping to track if a ticket has been used for entry
    mapping(uint256 => bool) public ticketUsed;
    
    /// @notice Mapping to track authorized gate verifiers
    mapping(address => bool) public authorizedVerifiers;
    
    // ========================================
    // EVENTS
    // ========================================
    
    /// @notice Emitted when a ticket is minted
    event TicketMinted(address indexed buyer, uint256 indexed tokenId, uint256 price);
    
    /// @notice Emitted when a ticket is used for entry
    event TicketUsed(uint256 indexed tokenId, address indexed verifier, uint256 timestamp);
    
    /// @notice Emitted when a verifier is authorized or deauthorized
    event VerifierStatusChanged(address indexed verifier, bool status);
    
    /// @notice Emitted when ticket price is updated
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    
    /// @notice Emitted when funds are withdrawn
    event FundsWithdrawn(address indexed to, uint256 amount);
    
    // ========================================
    // ERRORS
    // ========================================
    
    /// @notice Thrown when max supply is reached
    error MaxSupplyReached();
    
    /// @notice Thrown when payment is insufficient
    error InsufficientPayment();
    
    /// @notice Thrown when ticket has already been used
    error TicketAlreadyUsed();
    
    /// @notice Thrown when caller is not an authorized verifier
    error NotAuthorizedVerifier();
    
    /// @notice Thrown when ticket does not exist
    error TicketDoesNotExist();
    
    /// @notice Thrown when withdrawal fails
    error WithdrawalFailed();
    
    /// @notice Thrown when invalid max supply is provided
    error InvalidMaxSupply();
    
    // ========================================
    // MODIFIERS
    // ========================================
    
    /// @notice Ensures caller is an authorized verifier
    modifier onlyVerifier() {
        if (!authorizedVerifiers[msg.sender] && msg.sender != owner()) {
            revert NotAuthorizedVerifier();
        }
        _;
    }
    
    /// @notice Ensures token exists
    modifier tokenExists(uint256 tokenId) {
        if (tokenId >= _tokenIdCounter) {
            revert TicketDoesNotExist();
        }
        _;
    }
    
    // ========================================
    // CONSTRUCTOR
    // ========================================
    
    /**
     * @notice Initializes the event ticket contract
     * @param _name Event name used for NFT name
     * @param _symbol Token symbol
     * @param _maxSupply Maximum number of tickets
     * @param _ticketPrice Initial ticket price in wei
     * @param _eventDate Event date as unix timestamp
     * @param _eventVenue Event venue/location
     * @param _eventURI IPFS or HTTP URI for event metadata
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _maxSupply,
        uint256 _ticketPrice,
        uint256 _eventDate,
        string memory _eventVenue,
        string memory _eventURI
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        if (_maxSupply == 0) {
            revert InvalidMaxSupply();
        }
        
        maxSupply = _maxSupply;
        ticketPrice = _ticketPrice;
        eventName = _name;
        eventDate = _eventDate;
        eventVenue = _eventVenue;
        eventURI = _eventURI;
    }
    
    // ========================================
    // MINTING FUNCTIONS
    // ========================================
    
    /**
     * @notice Purchase a ticket
     * @dev Follows CEI pattern, nonReentrant for security
     * @return tokenId The ID of the newly minted ticket
     */
    function mintTicket() external payable nonReentrant returns (uint256) {
        // CHECKS
        if (_tokenIdCounter >= maxSupply) {
            revert MaxSupplyReached();
        }
        if (msg.value < ticketPrice) {
            revert InsufficientPayment();
        }
        
        // EFFECTS
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        // INTERACTIONS
        _safeMint(msg.sender, tokenId);
        
        // Refund excess payment
        if (msg.value > ticketPrice) {
            uint256 refund = msg.value - ticketPrice;
            (bool success, ) = payable(msg.sender).call{value: refund}("");
            if (!success) {
                // If refund fails, keep the excess (rare edge case)
                // User can still contact support
            }
        }
        
        emit TicketMinted(msg.sender, tokenId, ticketPrice);
        
        return tokenId;
    }
    
    /**
     * @notice Owner can mint tickets for free (promotional, etc.)
     * @param to Recipient address
     * @return tokenId The ID of the minted ticket
     */
    function ownerMint(address to) external onlyOwner nonReentrant returns (uint256) {
        if (_tokenIdCounter >= maxSupply) {
            revert MaxSupplyReached();
        }
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        
        emit TicketMinted(to, tokenId, 0);
        
        return tokenId;
    }
    
    /**
     * @notice Batch mint tickets (owner only)
     * @param to Recipient address
     * @param quantity Number of tickets to mint
     */
    function batchMint(address to, uint256 quantity) external onlyOwner nonReentrant {
        if (_tokenIdCounter + quantity > maxSupply) {
            revert MaxSupplyReached();
        }
        
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter;
            _tokenIdCounter++;
            _safeMint(to, tokenId);
            emit TicketMinted(to, tokenId, 0);
        }
    }
    
    // ========================================
    // TICKET VERIFICATION FUNCTIONS
    // ========================================
    
    /**
     * @notice Mark a ticket as used (for event entry)
     * @dev Only authorized verifiers or owner can call this
     * @param tokenId The ticket ID to mark as used
     */
    function markUsed(uint256 tokenId) external onlyVerifier tokenExists(tokenId) {
        if (ticketUsed[tokenId]) {
            revert TicketAlreadyUsed();
        }
        
        ticketUsed[tokenId] = true;
        
        emit TicketUsed(tokenId, msg.sender, block.timestamp);
    }
    
    /**
     * @notice Check if a ticket is valid and unused
     * @param tokenId The ticket ID to verify
     * @return isValid True if ticket exists and hasn't been used
     * @return owner The owner of the ticket
     */
    function verifyTicket(uint256 tokenId) external view tokenExists(tokenId) 
        returns (bool isValid, address owner) 
    {
        return (!ticketUsed[tokenId], ownerOf(tokenId));
    }
    
    /**
     * @notice Get detailed ticket information
     * @param tokenId The ticket ID
     * @return owner Ticket owner address
     * @return used Whether ticket has been used
     * @return eventInfo Event name
     * @return date Event date
     * @return venue Event venue
     */
    function getTicketInfo(uint256 tokenId) external view tokenExists(tokenId) 
        returns (
            address owner,
            bool used,
            string memory eventInfo,
            uint256 date,
            string memory venue
        ) 
    {
        return (
            ownerOf(tokenId),
            ticketUsed[tokenId],
            eventName,
            eventDate,
            eventVenue
        );
    }
    
    // ========================================
    // ADMIN FUNCTIONS
    // ========================================
    
    /**
     * @notice Set verifier authorization status
     * @param verifier Address to authorize/deauthorize
     * @param status New authorization status
     */
    function setVerifier(address verifier, bool status) external onlyOwner {
        authorizedVerifiers[verifier] = status;
        emit VerifierStatusChanged(verifier, status);
    }
    
    /**
     * @notice Update ticket price
     * @param newPrice New price in wei
     */
    function setTicketPrice(uint256 newPrice) external onlyOwner {
        uint256 oldPrice = ticketPrice;
        ticketPrice = newPrice;
        emit PriceUpdated(oldPrice, newPrice);
    }
    
    /**
     * @notice Update event metadata URI
     * @param newURI New metadata URI
     */
    function setEventURI(string memory newURI) external onlyOwner {
        eventURI = newURI;
    }
    
    /**
     * @notice Withdraw contract funds to owner
     */
    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(owner()).call{value: balance}("");
        if (!success) {
            revert WithdrawalFailed();
        }
        emit FundsWithdrawn(owner(), balance);
    }
    
    // ========================================
    // VIEW FUNCTIONS
    // ========================================
    
    /**
     * @notice Get total number of tickets sold
     * @return Total tickets minted
     */
    function totalTicketsSold() external view returns (uint256) {
        return _tokenIdCounter;
    }
    
    /**
     * @notice Get remaining tickets available
     * @return Number of tickets still available
     */
    function ticketsRemaining() external view returns (uint256) {
        return maxSupply - _tokenIdCounter;
    }
    
    /**
     * @notice Get contract balance
     * @return Contract balance in wei
     */
    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @notice Token URI for NFT metadata
     * @param tokenId Token ID
     * @return URI string
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (tokenId >= _tokenIdCounter) {
            revert TicketDoesNotExist();
        }
        return eventURI;
    }
    
    // ========================================
    // REQUIRED OVERRIDES
    // ========================================
    
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

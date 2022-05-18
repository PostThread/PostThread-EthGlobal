// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721Sendable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract DAO is ERC721, ERC721Burnable, ERC721Sendable, AccessControl  {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Proposal {
        uint proposalId;
        uint userIdOfProposer;
        string description;
        uint blockMinted;
        bytes functionParameters;
        string[] votingOptions;
        uint[] optionsVoteCounts;
        uint[] userIdsThatVoted;
        uint bounty;
        bool ended;
    }

    mapping(address => uint) public numProposals;
    mapping(uint => Proposal) public idToProposal;
    uint proposalCount;
    event proposalMinted(Proposal proposal, address sender);
    uint defaultBounty = 100;

    constructor() ERC721("Proposal", "PRP") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _tokenIdCounter.increment();
    }

    // Overrides interface
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function grantMinterRole(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, minter);
    }

    function safeMint(address to) internal returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        return tokenId;
    }

    function mintProposal(
            uint userId, string memory description, bytes memory functionParameters, 
            string[] memory votingOptions, address to
        ) public onlyRole(MINTER_ROLE) 
    {
        uint256 tokenId = safeMint(to);
        uint[] memory emptyList;
        Proposal memory proposal = Proposal(
            tokenId, userId, description, block.number, functionParameters, 
            votingOptions, emptyList, emptyList, defaultBounty, false
        );
        idToProposal[tokenId] = proposal;
        proposalCount++;
        numProposals[to]++;
        emit proposalMinted(proposal, to);
    }

    function voteOnProposal(uint proposalId, uint userId, uint optionNumber, uint numVotes) public onlyRole(MINTER_ROLE) {
        idToProposal[proposalId].optionsVoteCounts[optionNumber] += numVotes;
        idToProposal[proposalId].userIdsThatVoted.push(userId);
    }
    
    function sqrt(uint x) public view returns (uint y) {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function getStandardError(uint proposalId) public view returns(uint) {
        Proposal memory proposal = idToProposal[proposalId];
        uint totalVotes;
        for (uint256 i; i < proposal.optionsVoteCounts.length; i++) {
            totalVotes += proposal.optionsVoteCounts[i];
        }
        uint mean = totalVotes / proposal.optionsVoteCounts.length;
        uint standardDeviation;
        for (uint256 i; i < proposal.optionsVoteCounts.length; i++) {
            standardDeviation += (proposal.optionsVoteCounts[i] - mean)**2;
        }
        standardDeviation /= totalVotes;
        standardDeviation = sqrt(standardDeviation);
        uint standardError = standardDeviation / sqrt(totalVotes);

        return standardError;
    }

    function getBounty(uint proposalId) public returns(uint) {
        // TODO: determine algorithm for bounty
        
        // return idToProposal[proposalId].bounty;
        return 0;
    }

    function getPurposalResult(uint proposalId) public onlyRole(MINTER_ROLE) returns(uint, string memory, bytes memory) {
        Proposal memory proposal = idToProposal[proposalId];
        require(proposal.ended, "Proposal still voting");
        uint winningOption;
        for (uint256 i = 1; i < proposal.optionsVoteCounts.length; i++) {
            if (proposal.optionsVoteCounts[i] > proposal.optionsVoteCounts[winningOption]) {
                winningOption = i;
            }
        }
        return (winningOption, proposal.votingOptions[winningOption], proposal.functionParameters);
    }
}
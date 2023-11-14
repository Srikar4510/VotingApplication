// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/IERC20.sol";


// contract VotingToken is ERC20, Ownable {
//     constructor() ERC20("VotingToken", "VOTE") Ownable(msg.sender) {}

//     function mint(address account, uint256 amount) external onlyOwner {
//         _mint(account, amount);
//     }
// }

// contract DAO is Ownable {
//     VotingToken public votingToken;
//     uint256 public proposalCount;

//     struct Proposal {
//         uint256 id;
//         string name;
//         uint256 voteCount;
//         bool executed;
//     }

//     mapping(uint256 => Proposal) public proposals;
//     mapping(address => bool) public voters;

//     constructor(address _votingToken) Ownable(msg.sender){
//         votingToken = VotingToken(_votingToken);
//     }

//     modifier onlyVoter {
//         require(voters[msg.sender], "You are not a voter.");
//         _;
//     }

//     function addVoter(address _voter) external onlyOwner {
//         voters[_voter] = true;
//     }

//     function addProposal(string memory _name) external onlyOwner {
//         uint256 proposalId = proposalCount++;
//         proposals[proposalId] = Proposal({
//             id: proposalId,
//             name: _name,
//             voteCount: 0,
//             executed: false
//         });
//     }

//     function vote(uint256 _proposalId) external onlyVoter {
//         require(!proposals[_proposalId].executed, "Proposal already executed.");
//         require(votingToken.balanceOf(msg.sender) > 0, "Insufficient voting tokens.");

//         proposals[_proposalId].voteCount += votingToken.balanceOf(msg.sender);
//         votingToken.burn(msg.sender, votingToken.balanceOf(msg.sender));
//     }

//     function executeProposal(uint256 _proposalId) external onlyOwner {
//         require(!proposals[_proposalId].executed, "Proposal already executed.");

//         if (proposals[_proposalId].voteCount > (votingToken.totalSupply() / 2)) {
//             // Execute proposal logic here
//             proposals[_proposalId].executed = true;
//         }
//     }
// }

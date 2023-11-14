// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting{
    struct Candidate {
       string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address owner;
    mapping(address => bool) public voters;

    uint256 public votingStart;
    uint256 public votingEnd;

constructor(string[] memory _candidateNames, uint startTime, uint256 _durationInMinutes) {
    for (uint256 i = 0; i < _candidateNames.length; i++) {
        candidates.push(Candidate({
            name: _candidateNames[i],
            voteCount: 0
        }));
    }
    owner = msg.sender;
    votingStart = startTime;
    votingEnd = startTime + (_durationInMinutes * 60 * 1000);
}

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate({
                name: _name,
                voteCount: 0
        }));
    }

    function proposeCandidate(string memory _name) public {
        if(address(msg.sender) == address(0xCD89a0bF01B8f732919Bd63D42655EddF1DDC0e1) || address(msg.sender) == address(0x330467bc53c4D8463222F0B5A60333fd9A19a7d7) || address(msg.sender) == address(0x6da9031429F83C8F3BcB225468535d7Dd705E6E0)|| address(msg.sender) == address(0x1ee3138bD416faaeFbddD120d7378024Ad8ee9e2)|| address(msg.sender) == address(0xCA772c12df3cDEb9A82CCE7f0c3BdF20cbA60679) ){
            candidates.push(Candidate({
                name: _name,
                voteCount: 0
        }));
        }
    }

    function vote(uint256 _candidateIndex) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");
        uint voteValue = 1;
        if(address(msg.sender) == address(0xCD89a0bF01B8f732919Bd63D42655EddF1DDC0e1) || address(msg.sender) == address(0x330467bc53c4D8463222F0B5A60333fd9A19a7d7) ){
            voteValue = 2;
        }
        candidates[_candidateIndex].voteCount+=voteValue;
        voters[msg.sender] = true;
    }

    function getAllVotesOfCandiates() public view returns (Candidate[] memory){
        return candidates;
    }

    function getVotingStatus(uint currentTime) public view returns (bool) {
        return (currentTime >= votingStart && currentTime < votingEnd);
    }

    function determineWinner() public view returns (Candidate memory){
        uint max = 0;
        Candidate memory winner;
        for (uint c=0; c<candidates.length; c++){
            if (max < candidates[c].voteCount){
                max = candidates[c].voteCount;
                winner = candidates[c];
            }
        }
        return winner;
    }


    function getRemainingTime(uint currentTime) public view returns (uint256) {
        require(currentTime >= votingStart, "Voting has not started yet.");
        if (currentTime >= votingEnd) {
            return 0;
    }
        return votingEnd - currentTime;
    }
}

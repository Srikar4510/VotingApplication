// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Tournament {
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
        if(address(msg.sender) == address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266) || address(msg.sender) == address(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC) || address(msg.sender) == address(0x90F79bf6EB2c4f870365E785982E1f101E93b906) ){
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
        if(address(msg.sender) == address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8) || address(msg.sender) == address(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC) || address(msg.sender) == address(0x90F79bf6EB2c4f870365E785982E1f101E93b906) ){
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

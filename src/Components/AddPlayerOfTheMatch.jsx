import React ,{useState}from 'react'
import { ethers } from 'ethers';
import './AddPlayerOfTheMatch.css'; 

const AddPlayerOfTheMatch = ({contractAddress,contractAbi,updateCandidates}) => {
    const [pcand,setPCand]=useState('');

    async function proposeCandidate() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          contractAddress, contractAbi, signer
        );
        await contractInstance.proposeCandidate(pcand);
        await getCandidates();
      }
    
      async function getCandidates() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          contractAddress, contractAbi, signer
        );
        const candidatesList = await contractInstance.getAllVotesOfCandiates();
        const formattedCandidates = candidatesList.map((candidate, index) => {
          return {
            index: index,
            name: candidate.name,
            voteCount: candidate.voteCount.toNumber()
          }
        });
        updateCandidates(formattedCandidates);
      }
    
  return (
    <div className="form-container">
      <div className="add-player-container">
        <input
          className="input-field"
          value={pcand}
          type="text"
          onChange={(e) => {
            setPCand(e.target.value);
          }}
        />
        <button className="propose-button" onClick={proposeCandidate}>
          Propose Candidate for Match
        </button>
      </div>
    </div>
  )
}

export default AddPlayerOfTheMatch
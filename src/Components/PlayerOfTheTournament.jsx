import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import './Connected.css';
import TournamentAddress from '../contractsData/Tournament-address.json';
import TournamentABI from '../contractsData/Tournament.json';

const PlayerOfTheTournament = ({Twinner,account,updateTournamentCandidates,tourCandidates}) => {
   
    const contractAbi=TournamentABI.abi;
    const contractAddress=TournamentAddress.address;


  
  
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const candidates=tourCandidates;
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(false);
  const [winner, setWinner] = useState("");
  const [pcand, setPCand] = useState("");


  useEffect(() => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
   
  });


  async function vote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );

    const tx = await contractInstance.vote(number);
    await tx.wait();
    canVote();
  }


  async function canVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const voteStatus = await contractInstance.voters(await signer.getAddress());
    console.log("Tournament  "+voteStatus);
    setCanVote(voteStatus);

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
    updateTournamentCandidates(formattedCandidates);
  }


  async function getCurrentStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const status = await contractInstance.getVotingStatus(Date.now());
    console.log(status);
    if (!status) {
      getWinner();
      
    }
    setVotingStatus(status);
  }

  async function getWinner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const winner = await contractInstance.determineWinner();
    Twinner(winner.name);
  }

  async function getRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const time = await contractInstance.getRemainingTime(Date.now());
    console.log(time);
    let minutes = Math.floor(time / (60 * 1000));
    let seconds = Math.floor(time / (1000)) - minutes * 60;
    setremainingTime(`${minutes} minutes, ${seconds} seconds`);
  }
  

  


  

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  
  return (
    <div className="connected-container">
            <h1 className="connected-header">You are Connected to Metamask</h1>
            <p className="connected-account">Metamask Account: {account}</p>
            <p className="connected-account">Remaining Time: {remainingTime}</p>
            { CanVote ? (
                <p className="connected-account">You have already voted</p>
            ) : (
                <div className="input-container">
                    <input type="number" placeholder="Enter Candidate Index" value={number} onChange={handleNumberChange}></input>
            <br />
            <button className="login-button" onClick={vote}>Vote</button>

                </div>
            )}
            
            <table id="myTable" className="candidates-table">
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Candidate name</th>
                    <th>Candidate votes</th>
                </tr>
                </thead>
                <tbody>
                {candidates.map((candidate, index) => (
                    <tr key={index}>
                    <td>{candidate.index}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.voteCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
  )
}

export default PlayerOfTheTournament
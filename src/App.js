import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VotingContractAddress from './contractsData/Voting-address.json';
import VotingABi from './contractsData/Voting.json';
import Login from './Components/Login';
import Finished from './Components/Finished';
import Connected from './Components/Connected';
import Navbar from './Components/Navbar';
import AddPlayerOfTheMatch from './Components/AddPlayerOfTheMatch';
import { useNavigate } from 'react-router-dom';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Route
import PlayerOfTheTournament from './Components/PlayerOfTheTournament';
import AddPlayerOfTheTournamnet from './Components/AddPlayerOfTheTournament';
function App() {
  const contractAddress=VotingContractAddress.address;
  const contractAbi=VotingABi.abi;
  const navigate=useNavigate();
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(false);
  const [winner, setWinner] = useState("");
  const [pcand, setPCand] = useState("");
  const [twinner,setTwinner]=useState("");
  const [tourCandidates,setTourCandidates]=useState([]);


  useEffect(() => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
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
    console.log("Voting  "+voteStatus);
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
    setCandidates(formattedCandidates);
  }


  async function getCurrentStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const status = await contractInstance.getVotingStatus(Date.now());
    // console.log(status);
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
    setWinner(winner.name);
  }

  async function getRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const time = await contractInstance.getRemainingTime(Date.now());
    // console.log(time);
    let minutes = Math.floor(time / (60 * 1000));
    let seconds = Math.floor(time / (1000)) - minutes * 60;
    setremainingTime(`${minutes} minutes, ${seconds} seconds`);
  }
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

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }


  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
        canVote();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  const updateCandidates = (newCandidates) => {
    setCandidates(newCandidates);
  };
  const updateTournamentCandidates=(tourCandidates)=>{
    setTourCandidates(tourCandidates);
    
  };

  const Twinner=(towinner)=>{
    setTwinner(towinner)
  }
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={ // Use element instead of children
                <Login connectWallet={connectToMetamask} />
          } />
          <Route path="/add-player-of-match" element={<AddPlayerOfTheMatch contractAbi={contractAbi} contractAddress={contractAddress} updateCandidates={updateCandidates} />} />
          <Route path="/add-player-of-tournament" element={<AddPlayerOfTheTournamnet updateTournamentCandidates={updateTournamentCandidates} tourCandidates={tourCandidates}/>} />
          <Route path="/player-of-the-match" element={ // Use element instead of children
            votingStatus ? (
              isConnected ? (
                <>
                  <Connected
                    account={account}
                    candidates={candidates}
                    remainingTime={remainingTime}
                    number={number}
                    handleNumberChange={handleNumberChange}
                    voteFunction={vote}
                    showButton={CanVote}
                  />
                  
                </>

              ) : (
                <Login connectWallet={connectToMetamask} />
              )
            ) : (
              <Finished winner={winner} />
            )
          } />
          
          <Route path="/player-of-the-tournament" element={votingStatus?<PlayerOfTheTournament account={account} Twinner={Twinner} tourCandidates={tourCandidates} updateTournamentCandidates={updateTournamentCandidates}/>:<Finished winner={twinner} /> } />
        </Routes>
      </div>
    </>
  );


}





export default App;

import React from "react";
import { Link } from "react-router-dom"; 
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
      <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/add-player-of-match" className="nav-link">Add Player of the Match</Link>
        </li>
        <li className="nav-item">
          <Link to="/add-player-of-tournament" className="nav-link">Add Player of the Tournament</Link>
        </li>
        <li className="nav-item">
          <Link to="/player-of-the-match" className="nav-link">Player of the Match</Link>
        </li>
        <li className="nav-item">
          <Link to="/player-of-the-tournament" className="nav-link">Player of the Tournament</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

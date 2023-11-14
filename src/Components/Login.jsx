// Login.jsx
import React from "react";
import './Login.css';

const Login = (props) => {
    return (
        <div className="login-container">
            <h1 className="welcome-message">Commentators, it's your time to shine.</h1>
            <h2 className="welcome-message"> Vote for the Players of the Match and decide the Player of the Tournament.</h2>
            <h2 className="welcome-message"> Make your mark on the game! </h2>
            <button className="login-button" onClick={props.connectWallet}>Login Metamask</button>
        </div>
    );
}

export default Login;

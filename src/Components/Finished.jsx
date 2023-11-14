// Finished.jsx

import React, { useEffect } from "react";
import "./Finished.css";

const Finished = ({ winner }) => {
    useEffect(() => {
        // Function to create a random number within a range
        const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

        // Add celebration emojis dynamically
        const emojiContainer = document.querySelector(".emoji-container");

        for (let i = 0; i < 300; i++) {
            const emoji = document.createElement("div");
            emoji.className = "celebration-emoji";
            emoji.innerHTML = "🎉";

            // Set random position for each emoji
            const positionStyle = `
                top: ${getRandomNumber(0, 100)}vh;
                left: ${getRandomNumber(0, 100)}vw;
            `;

            emoji.setAttribute("style", positionStyle);
            emojiContainer.appendChild(emoji);
        }
    }, []);

    return (
        <div className="login-container">
            <h1 className="celebration-message">Voting is Finished</h1>
            <h2 className="celebration-message">Winner is: {winner}</h2>
            <div className="emoji-container"></div>
        </div>
    );
};

export default Finished;

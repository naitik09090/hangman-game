import React, { useEffect, useState } from "react";
import { checkWin } from "../helpers/Helpers";

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) => {
  const [showPopup, setShowPopup] = useState(false);
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;
  let status = checkWin(correctLetters, wrongLetters, selectedWord);

  if (status === "win") {
    finalMessage = "Congratulations! You won! 😃";
    playable = false;
  } else if (status === "lose") {
    finalMessage = "SNAKE BITE! GAME OVER 🐍";
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  }, [playable, setPlayable]);

  // Handle delay for lose popup
  useEffect(() => {
    if (status === "win") {
      setShowPopup(true);
    } else if (status === "lose") {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5200); // 5.2s delay to show popup "directly" upon death
      return () => clearTimeout(timer);
    } else {
      setShowPopup(false);
    }
  }, [status]);

  const handlePlayAgain = () => {
    setShowPopup(false);
    playAgain();
  };

  return (
    <div className="popup-container" style={showPopup ? { display: "flex" } : { display: "none" }}>
      <div className={`popup ${status === "lose" ? "lose-animation" : "win-animation"}`}>
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={handlePlayAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;

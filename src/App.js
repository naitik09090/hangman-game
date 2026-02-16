import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show } from "./helpers/Helpers";
import "./styles/App.css";

const words = [
  "jungle",
  "tiger",
  "snake",
  "monkey",
  "parrot",
  "amazon",
  "safari",
  "bamboo",
  "canopy",
  "panther",
  "river",
  "jaguar",
  "lizard",
  "forest",
  "gorilla",
  "chimpanzee",
  "orangutan",
  "toucan",
  "sloth",
  "piranha",
  "anaconda",
  "crocodile",
  "alligator",
  "lemur",
  "tapir",
  "capybara",
  "macaw",
  "tarantula",
  "scorpion",
  "butterfly",
  "dragonfly",
  "chameleon",
  "iguana",
  "leopard",
  "cougar",
  "ocelot",
  "vine",
  "fern",
  "orchid",
  "mahogany",
  "moss",
  "swamp",
  "marsh",
  "waterfall",
  "tropical",
  "wilderness",
  "wildlife",
  "exploration",
  "adventure",
  "mosquito",
  "beetle"
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const inputRef = useRef(null);

  const processLetter = (letter) => {
    if (playable) {
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          setCorrectLetters((currentLetters) => [...currentLetters, letter]);
        } else {
          show(setShowNotification);
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          setWrongLetters((currentLetters) => [...currentLetters, letter]);
        } else {
          show(setShowNotification);
        }
      }
    }
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        processLetter(key.toLowerCase());
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />

        {/* Clickable Word Container to trigger Mobile Keyboard */}
        <div onClick={() => inputRef.current.focus()} className="word-click-wrapper">
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>

        {/* <p className="mobile-only-instruction">Tap here to type</p> */}
      </div>

      {/* Hidden Input for Mobile Keyboard */}
      <input
        type="text"
        ref={inputRef}
        onChange={(e) => {
          const char = e.target.value.slice(-1);
          if (/^[a-zA-Z]$/.test(char)) {
            processLetter(char.toLowerCase());
          }
          e.target.value = "";
        }}
        style={{ opacity: 0, position: 'absolute', top: '-1000px' }}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
      />

      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;

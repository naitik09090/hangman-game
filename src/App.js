import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show } from "./helpers/Helpers";
import "./styles/App.css";

const wordsData = [
  { word: "jungle", hint: "A wild forest" },
  { word: "tiger", hint: "Big striped cat" },
  { word: "snake", hint: "Long reptile, no legs" },
  { word: "monkey", hint: "Loves bananas" },
  { word: "parrot", hint: "Colorful talking bird" },
  { word: "amazon", hint: "Biggest rainforest" },
  { word: "safari", hint: "Trip to see animals" },
  { word: "bamboo", hint: "Panda food" },
  { word: "canopy", hint: "Treetops of a forest" },
  { word: "panther", hint: "Big black cat" },
  { word: "river", hint: "Flowing water" },
  { word: "jaguar", hint: "Spotted American cat" },
  { word: "lizard", hint: "Small reptile with a tail" },
  { word: "forest", hint: "Lots of trees" },
  { word: "gorilla", hint: "Big strong ape" },
  { word: "chimpanzee", hint: "Smart ape" },
  { word: "orangutan", hint: "Red-haired ape" },
  { word: "toucan", hint: "Bird with big beak" },
  { word: "sloth", hint: "Slow animal" },
  { word: "piranha", hint: "Fish with sharp teeth" },
  { word: "anaconda", hint: "Huge snake" },
  { word: "crocodile", hint: "Reptile with V-snout" },
  { word: "alligator", hint: "Reptile with U-snout" },
  { word: "lemur", hint: "Long-tailed animal from Madagascar" },
  { word: "tapir", hint: "Animal with a short trunk" },
  { word: "capybara", hint: "Giant guinea pig" },
  { word: "macaw", hint: "Big colorful parrot" },
  { word: "tarantula", hint: "Big hairy spider" },
  { word: "scorpion", hint: "Bug with a stinger" },
  { word: "butterfly", hint: "Pretty flying insect" },
  { word: "dragonfly", hint: "Fast flying insect" },
  { word: "chameleon", hint: "Color-changing lizard" },
  { word: "iguana", hint: "Big green lizard" },
  { word: "leopard", hint: "Spotted cat" },
  { word: "cougar", hint: "Mountain lion" },
  { word: "ocelot", hint: "Small spotted cat" },
  { word: "vine", hint: "Climbing plant" },
  { word: "fern", hint: "Green leafy plant" },
  { word: "orchid", hint: "Pretty tropical flower" },
  { word: "mahogany", hint: "Reddish wood" },
  { word: "moss", hint: "Soft green plant on rocks" },
  { word: "swamp", hint: "Wet muddy land" },
  { word: "marsh", hint: "Grassy wetland" },
  { word: "waterfall", hint: "Falling water" },
  { word: "tropical", hint: "Hot and humid place" },
  { word: "wilderness", hint: "Wild nature" },
  { word: "wildlife", hint: "Wild animals" },
  { word: "exploration", hint: "Discovering new places" },
  { word: "adventure", hint: "Exciting trip" },
  { word: "mosquito", hint: "Biting insect" },
  { word: "beetle", hint: "Bug with hard shell" }
];

let randomData = wordsData[Math.floor(Math.random() * wordsData.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedData, setSelectedData] = useState(randomData);
  const inputRef = useRef(null);

  const processLetter = useCallback((letter) => {
    if (playable) {
      if (selectedData.word.includes(letter)) {
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
  }, [correctLetters, wrongLetters, playable, selectedData]);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        processLetter(key.toLowerCase());
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [playable, processLetter]);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    const random = Math.floor(Math.random() * wordsData.length);
    setSelectedData(wordsData[random]);
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />

        <div onClick={() => inputRef.current.focus()} className="word-click-wrapper">
          <Word selectedWord={selectedData.word} correctLetters={correctLetters} />
        </div>

        {/* Hint Section */}
        <div className="hint-container">
          <p className="hint-text">💡 Hint: {selectedData.hint}</p>
        </div>
      </div>

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
        style={{
          opacity: 0,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '1px',
          height: '1px',
          padding: 0,
          margin: 0,
          border: 'none',
          outline: 'none',
          pointerEvents: 'none'
        }}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
      />

      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedData.word} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;

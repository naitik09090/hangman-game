import React from 'react';

const Keyboard = ({ onKeyPress, correctLetters, wrongLetters }) => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

    return (
        <div className="keyboard-container">
            {letters.map((letter) => {
                const isCorrect = correctLetters.includes(letter);
                const isWrong = wrongLetters.includes(letter);
                const isDisabled = isCorrect || isWrong;

                return (
                    <button
                        key={letter}
                        className={`key-btn ${isCorrect ? 'key-correct' : ''} ${isWrong ? 'key-wrong' : ''}`}
                        onClick={() => onKeyPress(letter)}
                        disabled={isDisabled}
                    >
                        {letter}
                    </button>
                );
            })}
        </div>
    );
};

export default Keyboard;

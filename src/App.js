import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import StartScene from './StartScene';
import GameScene from './GameScene';

const maxLives = 7;
const maxTime = 30;

function App() {
  const [newGame, setNewGame] = useState(true);
  const [secretWord, setSecretWord] = useState('');
  const [enteredLetters, setEnteredLetters] = useState({});
  const [lives, setLives] = useState(maxLives);
  const [time, setTime] = useState(maxTime);
  const [countdown, setCountdown] = useState(() => {});
  const [playerWon, setPlayerWon] = useState(null);

  const appRef = useRef(null);

  const handleKeyInput = (e, playerWon, newGame, secretWord) => {
    const { keyCode, key } = e;

    // Checks if it's a letter, otherwise returns;
    if (keyCode < 65 && keyCode > 90) {
      return;
    }

    // Checks if the game is still ongoing
    if (playerWon === null && !newGame) {
      // Sets the entered letter
      setEnteredLetters(prevState => {
        if (!prevState[key]) {
          return {
            ...prevState,
            [key]: true,
          };
        }
        return prevState;
      });

      // Check if the secret word includes the letter or reduces the player's lives by one
      if (!secretWord.includes(key)) {
        setLives(prevLives => prevLives - 1);
      }
    }
  };

  // Side effect that happens when newGame changes
  useEffect(() => {
    // Used to focus on the div so that the player doesn't have to click to enter
    if (!newGame) {
      appRef.current.focus();
    }
  }, [newGame]);

  // "Side effect" that happens when typing letters
  useEffect(() => {
    const allLetters =
      secretWord.length &&
      secretWord.split('').every((l, i, { length }) => {
        return i === 0 || i === length - 1 || Boolean(enteredLetters[l]);
      });

    if (allLetters) {
      setPlayerWon(true);
      clearInterval(countdown);
    } else {
      setTime(maxTime);
    }
  }, [enteredLetters, secretWord, countdown]);

  // This side effect is called when player lives change
  useEffect(() => {
    if (lives <= 0) {
      setPlayerWon(false);
      clearInterval(countdown);
    }
  }, [lives, countdown]);

  // This side effect changes with time
  useEffect(() => {
    if (time === 0) {
      setLives(prevLives => prevLives - 1);
      setTime(maxTime);
    }
  }, [time]);

  // Function called when starting a new game
  const handleNewGame = () => {
    setNewGame(false);
    setCountdown(setInterval(() => setTime(prev => prev - 1), 1000));
  };

  // Function called to reset the game and start again
  const resetAll = () => {
    setNewGame(true);
    setSecretWord('');
    setEnteredLetters({});
    setLives(maxLives);
    setTime(maxTime);
    setPlayerWon(null);
  };

  return (
    <div
      className="App"
      data-testid="app-root"
      tabIndex={1}
      onKeyDown={e => handleKeyInput(e, playerWon, newGame, secretWord)}
      ref={appRef}
    >
      <main className="Main">
        <span className="Main__title">Sacha's Hangman</span>
        {newGame ? (
          <StartScene
            setNewGame={handleNewGame}
            setSecretWord={setSecretWord}
          />
        ) : (
          <GameScene
            lives={lives}
            time={time}
            secretWord={secretWord}
            enteredLetters={enteredLetters}
            resetAll={resetAll}
            playerWon={playerWon}
          />
        )}
      </main>
    </div>
  );
}

export default App;

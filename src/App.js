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
    if (keyCode < 65 && keyCode > 90) {
      return;
    }

    if (playerWon === null && !newGame) {
      setEnteredLetters(prevState => {
        if (!prevState[key]) {
          return {
            ...prevState,
            [key]: true,
          };
        }
        return prevState;
      });

      if (!secretWord.includes(key)) {
        setLives(prevLives => prevLives - 1);
      }
    }
  };

  useEffect(() => {
    if (!newGame) {
      appRef.current.focus();
    }
  }, [newGame]);

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

  useEffect(() => {
    if (lives <= 0) {
      setPlayerWon(false);
      clearInterval(countdown);
    }
  }, [lives, countdown]);

  useEffect(() => {
    if (time === 0) {
      setLives(prevLives => prevLives - 1);
      setTime(maxTime);
    }
  }, [time]);

  const handleNewGame = () => {
    setNewGame(false);
    setCountdown(setInterval(() => setTime(prev => prev - 1), 1000));
  };

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

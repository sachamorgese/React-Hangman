import React, { useState, useEffect } from 'react';
import './App.scss';
import Home from './Home'

function App() {
  const [newGame, setNewGame] = useState(true);
  const [secretWord, setSecretWord] = useState('');
  const [enteredLetters, setEnteredLetters] = useState({});
  
  useEffect(() => {
    const handleKeyInput = (e) => {
      console.log(enteredLetters)
      setEnteredLetters(prevState => ({
        ...prevState,
        [e.key.toLowerCase()]: true
        })
      );
    };
    
    if (!newGame) {
      document.addEventListener('keypress', handleKeyInput)
    } else {
      document.removeEventListener('keypress', handleKeyInput)
    }
  }, [newGame]);
  
  const showLetters = secretWord => {
    const { length } = secretWord;
    return secretWord.split('').map((letter, i) => {
      if (i === 0 || i === length - 1 || Boolean(enteredLetters[letter])) {
        return <span key={i}>{`${letter}${i !== length - 1 ? ' ' : ''}`}</span>
      } else {
        return <span key={i}>_ </span>
      }
    });
  };
  
  return (
    <div className="App">
      {
        newGame ?
          <Home setNewGame={setNewGame} setSecretWord={setSecretWord} /> :
          <div>{ showLetters(secretWord) }</div>
      }
    </div>
  );
}

export default App;

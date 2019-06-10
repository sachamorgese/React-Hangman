import React, { useState } from 'react';

export const onlyLettersRegex = /[a-z]/g;

function StartScene(props) {
  const [word, setWord] = useState('');
  const [error, setError] = useState(false);

  const { setNewGame, setSecretWord } = props;

  const handleInput = e => {
    const {
      target: { value },
    } = e;

    if (!value) {
      setWord('');
      return;
    }

    if (value.length > 15) {
      setError(true);
      return;
    }

    const lowerCaseValue = value.toLowerCase();

    const onlyLetters = lowerCaseValue.match(onlyLettersRegex).join('');

    setWord(onlyLetters);
    setError(false);
  };

  const handleSubmit = input => {
    const length = input.length;

    if (length >= 5 && length <= 15) {
      setSecretWord(input);
      setNewGame(input);
    } else {
      setError(true);
    }
  };

  const handleEnter = (e, input) => {
    if (e.key !== 'Enter') {
      return;
    }

    handleSubmit(input);
  };

  return (
    <>
      <label htmlFor="word-input" className="Main__text">
        Insert the word
      </label>
      <input
        id="word-input"
        type="password"
        className="Main__input"
        onChange={handleInput}
        onKeyPress={e => handleEnter(e, word)}
        value={word}
        autoComplete="off"
      />
      {error && (
        <span className="Main__error">
          The word should be 5 and 15 characters long
        </span>
      )}
      <button
        type="button"
        className="Main__button"
        onClick={() => handleSubmit(word)}
      >
        Done
      </button>
    </>
  );
}

export default StartScene;

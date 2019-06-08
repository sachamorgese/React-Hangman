import React, { useState } from 'react';

function StartScene(props) {
  const [word, setWord] = useState('');
  const [error, setError] = useState(false);

  const { setNewGame, setSecretWord } = props;

  const handleInput = e => {
    const {
      target: { value },
    } = e;
    if (value.length > 15) {
      setError(true);
      return;
    }

    const lowerCaseValue = value.toLowerCase();

    const onlyLetters = lowerCaseValue.match(/[a-z]/g).join('');

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

  return (
    <>
      <span className="Main__text">Insert the word</span>
      <input
        type="password"
        className="Main__input"
        onChange={handleInput}
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

import React from 'react';

export default props => {
  const {
    lives,
    time,
    secretWord,
    enteredLetters,
    playerWon,
    resetAll,
  } = props;

  const showLetters = secretWord => {
    const { length } = secretWord;
    return secretWord.split('').map((letter, i) => {
      if (i === 0 || i === length - 1 || Boolean(enteredLetters[letter])) {
        return <span key={i}>{`${letter}${i !== length - 1 ? ' ' : ''}`}</span>;
      } else {
        return <span key={i}>_ </span>;
      }
    });
  };

  const tryAgainSpan = resetAll => (
    <>
      <span class="Main__text">{playerWon ? 'You Win!' : 'You died...'}</span>
      <button className="Main__button" type="button" onClick={resetAll}>
        Try Again
      </button>
    </>
  );

  return (
    <>
      <span className="Main__lives">Remaining lives: {lives}</span>
      <span className="Main__time">Remaining time: {time}</span>
      <div className="Main__letters">{showLetters(secretWord)}</div>
      {playerWon !== null && tryAgainSpan(resetAll)}
    </>
  );
};

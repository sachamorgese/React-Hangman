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

  const makeLettersArray = (secretWord, enteredLetters) =>
    secretWord.split('').map((letter, i) => {
      let spanContent;
      if (
        i === 0 ||
        i === secretWord.length - 1 ||
        Boolean(enteredLetters[letter])
      ) {
        spanContent = `${letter}${i !== secretWord.length - 1 ? ' ' : ''}`;
      } else {
        spanContent = '_ ';
      }
      return <span key={i}>{spanContent}</span>;
    });

  const tryAgainSpan = resetAll => (
    <>
      <span className="Main__text">
        {playerWon ? 'You Win!' : 'Game Over...'}
      </span>
      <button className="Main__button" type="button" onClick={resetAll}>
        Try Again
      </button>
    </>
  );

  return (
    <>
      <span className="Main__lives">Remaining lives: {lives}</span>
      <span className="Main__time">Remaining time: {time}</span>
      <div className="Main__letters">
        {makeLettersArray(secretWord, enteredLetters)}
      </div>
      {playerWon !== null && tryAgainSpan(resetAll)}
    </>
  );
};

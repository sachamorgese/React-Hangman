import React, { useState } from 'react';

function Home (props) {
  const [ word, setWord ] = useState('');
  const [ error, setError ] = useState(false);

  const { setNewGame, setSecretWord } = props;
  
  const handleInput = (e) => {
    const { value } = e.target;
    if (value.length > 15) {
      setError(true);
      return;
    }
    setWord(value.toLowerCase());
    setError(false)
  };

  const handleSubmit = (input) => {
    const length = input.length;
    
    if(length >= 5 && length <= 15) {
      setSecretWord(input);
      setNewGame(false);
    } else {
      setError(true)
    }
  };
  
  return (
    <>
      <span className="Home__text">Insert the word</span>s
      <input type="password" className="Home__input" onChange={handleInput} value={word} />
      {error && <span>The word should be 5 and 15 characters long</span>}
      <button type="button" className="Home__button" onClick={() => handleSubmit(word)}>Done</button>
    </>
  )
}

export default Home;
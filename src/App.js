import React, { useState } from 'react';
import './App.scss';
import Home from './Home'

function App() {
  const [newGame, setNewGame] = useState(true);
  
  return (
    <div className="App">
      {
        newGame ?
          <Home/> :
          <div>Nohome</div>
      }
    </div>
  );
}

export default App;

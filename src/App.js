import React from 'react';
import './App.css';

import Game from './components/Game';

function App() {
  return (
    <div>
      <header>
        Tic Tac Toe
      </header>

      <div>
        <Game />
      </div>
    </div>
  )
}

export default App;

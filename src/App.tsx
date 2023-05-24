import React from 'react';
import './reset.scss';
import './App.scss';
import TicTacToe from './tic-tac-toe/TicTacToe';
import Calculator from './calculator/Calculator';
import CardMemoryGame from './card-memory-game/CardMemoryGame';
import Sidebar from './sidebar/Sidebar';

function App() {
  return (
    <div className='App'>
      <Sidebar></Sidebar>
      <main>
        <ul>
          <li>
            <TicTacToe></TicTacToe>
          </li>
          <li>
            <Calculator></Calculator>
          </li>
          <li>
            <CardMemoryGame></CardMemoryGame>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;

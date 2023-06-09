import React from 'react';
import './reset.scss';
import './App.scss';
import TicTacToe from './tic-tac-toe/TicTacToe';
import Calculator from './calculator/Calculator';
import Sidebar from './sidebar/Sidebar';
import Stopwatch from './stop-watch/Stopwatch';
import DogImages from './dog-images/DogImages';
//import WordDefinition from './word-definition/WordDefinition';
//import CardMemoryGame from './card-memory-game/CardMemoryGame';

function App() {
  const components = [
    <TicTacToe />,
    <Stopwatch />,
    <Calculator />,
    <DogImages />,
    //CardMemoryGame,
    //WordDefinition,
  ];
  return (
    <div className='App'>
      <Sidebar components={components}></Sidebar>
      <main>
        <ul>
          {components.map((Component) => (
            <li key={Component.type.name}>
              {Component}
              {String(Component.type)}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

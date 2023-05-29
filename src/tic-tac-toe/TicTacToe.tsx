import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './TicTacToe.scss';

type Players = 'x' | 'o';
type CellOptions = Players | ' ';
const players: Array<Players> = ['x', 'o'];

const findWinner = (grid: CellOptions[]): CellOptions => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const winningCombo of winningCombos) {
    const [a, b, c] = winningCombo.map((index) => grid[index]);
    if (a === b && a === c && ['x', 'o'].includes(a)) {
      return a;
    }
  }
  return ' ';
};

export default function TicTacToe() {
  const [grid, setGrid] = useState<CellOptions[]>(Array<CellOptions>(9).fill(' '));
  const [moves, setMoves] = useState<CellOptions[]>([]);
  const xsTurn = moves.length % 2 === 0;
  const whoseTurn = xsTurn ? 'x' : 'o';
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState({ x: 0, o: 0 });

  const newGame = () => {
    grid.fill(' ');
    setGrid([...grid]);
    setMoves([]);
    setGameOver(false);
  };

  const reset = () => {
    newGame();
    setScore({ x: 0, o: 0 });
  };

  const cellClick = (index: number) => {
    grid[index] = whoseTurn;
    setGrid([...grid]);
    setMoves([...moves, whoseTurn]);
    let winner;
    if ((winner = findWinner(grid)) !== ' ') {
      setGameOver(true);
      score[winner] += 1;
      setScore({ ...score });
    }
  };

  return (
    <Card header='Tic-Tac-Toe'>
      <section className='TicTacToe'>
        <div className='board'>
          {grid.map((c, index) => {
            return (
              <button
                key={index}
                onClick={() => cellClick(index)}
                className={clsx({ active: grid[index] === ' ' && !gameOver })}
                disabled={grid[index] !== ' ' || gameOver}
              >
                {c}
              </button>
            );
          })}
        </div>
        <div className='controls'>
          <div className='score'>
            {players.map((player) => (
              <ul key={player}>
                <li className={clsx({ active: whoseTurn === player })}>{player}</li>
                <li>{score[player]}</li>
              </ul>
            ))}
          </div>
          <div>
            <button onClick={newGame}>New Game</button>
          </div>
          <div>
            <button onClick={reset}>Reset</button>
          </div>
          <div>{gameOver ? `Game over!` : null}</div>
        </div>
      </section>
    </Card>
  );
}

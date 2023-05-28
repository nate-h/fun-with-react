import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './TicTacToe.scss';

type CellOptions = 'x' | 'o' | ' ';

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
    if (a === b && a === c && a === 'x') {
      return 'x';
    }
    if (a === b && a === c && a === 'o') {
      return 'o';
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

  const reset = () => {
    grid.fill(' ');
    setGrid([...grid]);
    setMoves([]);
  };

  const cellClick = (index: number) => {
    grid[index] = whoseTurn;
    setGrid([...grid]);
    setMoves([...moves, whoseTurn]);
    let winner;
    if ((winner = findWinner(grid) !== ' ')) {
      setGameOver(true);
    }
  };

  return (
    <Card header='Tic-Tac-Toe'>
      <section className='TicTacToe'>
        <p>Your move {whoseTurn}</p>
        <button onClick={reset}>Reset</button>
        <div className='board'>
          {grid.map((c, index) => {
            return (
              <button
                key={index}
                onClick={() => cellClick(index)}
                className={clsx({ active: grid[index] === ' ' })}
                disabled={grid[index] !== ' ' || gameOver}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>
    </Card>
  );
}

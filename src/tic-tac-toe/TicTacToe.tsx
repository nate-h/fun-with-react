import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './TicTacToe.scss';

export default function TicTacToe() {
  type MoveOptions = 'x' | 'o';
  type CellOptions = MoveOptions | null;
  const [grid, setGrid] = useState<CellOptions[]>(Array<CellOptions>(9).fill(null));
  const [moves, setMoves] = useState<MoveOptions[]>([]);
  const xsTurn = moves.length % 2 === 0;
  const whoseTurn = xsTurn ? 'x' : 'o';

  const reset = () => {
    grid.fill(null);
    setGrid([...grid]);
    setMoves([]);
  };

  const isWinner = (): boolean => {
    console.log('TODO: find winner.');
    return false;
  };

  const cellClick = (index: number) => {
    grid[index] = whoseTurn;
    setGrid([...grid]);
    setMoves([...moves, whoseTurn]);
    if (isWinner()) {
    }
  };

  return (
    <Card header='Tic-Tac-Toe'>
      <section className='TicTacToe'>
        <p>Your move {whoseTurn}</p>
        <button onClick={reset}>Reset</button>
        <div className='board'>
          {grid.map((h, index) => {
            return (
              <button
                key={index}
                onClick={() => cellClick(index)}
                className={clsx({ active: grid[index] == null })}
                disabled={grid[index] != null}
              >
                {h}
              </button>
            );
          })}
        </div>
      </section>
    </Card>
  );
}

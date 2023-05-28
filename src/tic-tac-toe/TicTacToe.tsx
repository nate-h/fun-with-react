import React, { useState } from 'react';
import Card from '../Card';
import './TicTacToe.scss';
import styled from 'styled-components';

const Board = styled.div`
  display: grid;
  grid-template-columns: 2em 2em 2em;
  grid-gap: 1px;
`;

const Cell = styled.button`
  aspect-ratio: 1;
  background-color: red;
`;

export default function TicTacToe() {
  type MoveOptions = 'x' | 'o';
  type CellOptions = MoveOptions | null;
  const [grid, setGrid] = useState<CellOptions[]>(Array<CellOptions>(9).fill(null));
  const [moves, setMoves] = useState<MoveOptions[]>([]);
  const xsTurn = moves.length % 2 == 0;
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
      <section className='Tic-Tac-Toe'>
        <p>Your move {whoseTurn}</p>
        <button onClick={reset}>Reset</button>
        <Board>
          {grid.map((h, index) => {
            return (
              <Cell key={index} onClick={() => cellClick(index)}>
                {h}
              </Cell>
            );
          })}
        </Board>
      </section>
    </Card>
  );
}

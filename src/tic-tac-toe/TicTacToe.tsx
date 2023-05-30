import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './TicTacToe.scss';

type Players = 'X' | 'O';
type CellOptions = Players | ' ';
const players: Array<Players> = ['X', 'O'];

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
    if (a === b && a === c && players.some((p) => p === a)) {
      return a;
    }
  }
  return ' ';
};

export default function TicTacToe() {
  const [grid, setGrid] = useState<CellOptions[]>(Array<CellOptions>(9).fill(' '));
  const [moves, setMoves] = useState<CellOptions[]>([]);
  const [gameOverText, setGameOverText] = useState<string>('');
  const [roundCount, setRoundCount] = useState<number>(0);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const xsTurn = (moves.length + roundCount) % 2 === 0;
  const whoseTurn = xsTurn ? 'X' : 'O';

  const newRound = () => {
    grid.fill(' ');
    setGrid([...grid]);
    setMoves([]);
    setGameOverText('');
    setRoundCount(roundCount + 1);
  };

  const reset = () => {
    newRound();
    setScore({ X: 0, O: 0 });
    setRoundCount(0);
  };

  const cellClick = (index: number) => {
    grid[index] = whoseTurn;
    setGrid([...grid]);
    const newMoves: CellOptions[] = [...moves, whoseTurn];
    setMoves(newMoves);
    let winner;
    if ((winner = findWinner(grid)) !== ' ') {
      setGameOverText(`Game over. ${winner} won!`);
      score[winner] += 1;
      setScore({ ...score });
    } else if (newMoves.length === 9) {
      setGameOverText('Game over. Draw');
    }
  };

  return (
    <Card header='Tic-Tac-Toe'>
      <section className='TicTacToe'>
        <div className='board'>
          {grid.map((cell_text, index) => {
            return (
              <button
                key={index}
                onClick={() => cellClick(index)}
                className={clsx({ active: grid[index] === ' ' && !gameOverText })}
                disabled={grid[index] !== ' ' || gameOverText !== ''}
              >
                {cell_text}
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
            <button onClick={newRound}>New Round</button>
          </div>
          <div>
            <button onClick={reset}>Reset</button>
          </div>
          <div>{gameOverText}</div>
        </div>
      </section>
    </Card>
  );
}

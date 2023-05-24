import React from 'react';
import Card from '../Card';
import './TicTacToe.scss';

export default function TicTacToe() {
  let xsTurn = true;
  const history = new Array(9).fill(null);
  const reset = () => {
    history.fill(null);
  };
  return (
    <Card header='Tic-Tac-Toe'>
      <section className='Tic-Tac-Toe'>
        <p>Your move {xsTurn ? 'x' : 'o'}</p>
        {history.map((h) => {
          return <div className='cell'>{h}</div>;
        })}
      </section>
    </Card>
  );
}

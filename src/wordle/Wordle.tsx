import './Wordle.scss';
import Card from '../Card';
import { useState } from 'react';
import clsx from 'clsx';

const allWords = [
  'blind',
  'sheet',
  'crush',
  'relax',
  'drain',
  'label',
  'expel',
  'thump',
  'hacks',
  'bagel',
];

const possibleWords = ['hacks', 'bagel'];

const keyboard: Array<Array<string>> = [
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  'zxcvbnm'.split(''),
];

export default function Wordle() {
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [gamesWon, setGamesWon] = useState<number>(0);
  const answer = 'hacks';
  const [guessCount, setGuessCount] = useState<number>(0);
  const [guesses, setGuesses] = useState<string[][]>(
    Array.from(Array(6), (_) => Array(5).fill('')),
  );

  const won = guessCount > 0 && guesses[guessCount - 1].join('') === answer;
  const gameOver = guessCount === 6 || won;

  function press(char: string) {
    if (gameOver) {
      return;
    }
    const row = guesses[guessCount];
    const index = row.indexOf('');
    if (index === -1) {
      return;
    }
    row[index] = char;
    setGuesses([...guesses]);
  }

  function backspace() {
    if (gameOver) {
      return;
    }
    const row = guesses[guessCount];
    const index = row.indexOf('');
    if (index === 0) {
      return;
    } else if (index === -1) {
      row[4] = '';
    } else {
      row[index - 1] = '';
    }
    setGuesses([...guesses]);
  }

  function charColor(guessRow: number, charIndex: number, char: string) {
    if (char === '') {
      return '';
    }
    if (guessRow === guessCount) {
      return 'unevaluated';
    }

    if (answer[charIndex] === char) {
      return 'green';
    } else if (answer.includes(char)) {
      return 'yellow';
    }
    return 'gray';
  }

  function incrementGuessCount() {
    if (gameOver || guessCount > 5) {
      return;
    }
    setGuessCount(guessCount + 1);
  }

  const resetGame = () => {
    setGuessCount(0);
    setGuesses(Array.from(Array(6), (_) => Array(5).fill('')));
    setGamesWon(gamesWon + Number(won));
    setGamesPlayed(gamesPlayed + 1);
  };

  function keyboardRow(row: string[]) {
    {
      return row.map((c) => {
        return (
          <li key={c}>
            <button className='keyboard-key' onClick={() => press(c)}>
              {c}
            </button>
          </li>
        );
      });
    }
  }

  return (
    <Card header='Wordle'>
      <section className='Wordle'>
        <div className='guesses'>
          {` won: ${won}`}
          <br />
          {` gameOver: ${gameOver}`}
          <br />
          {guesses.map((guess, guessRow) => {
            return (
              <ul className='guess' key={guessRow}>
                {guess.map((c, index) => {
                  return (
                    <li key={index} className={clsx('char', charColor(guessRow, index, c))}>
                      {c}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>

        <br />

        <div className='keyboard'>
          <ul className='keyboard-row'>{keyboardRow(keyboard[0])}</ul>
          <ul className='keyboard-row offset'>{keyboardRow(keyboard[1])}</ul>
          <ul className='keyboard-row'>
            <li>
              <button className='keyboard-key enter' onClick={incrementGuessCount}>
                enter
              </button>
            </li>
            {keyboardRow(keyboard[2])}
            <li>
              <button className='keyboard-key backspace' onClick={backspace}>
                ⌫
              </button>
            </li>
          </ul>
        </div>

        <div className='score'>
          <span>
            🏆 {gamesWon} / {gamesPlayed}
          </span>
          {won ? <span>You Won! 😃</span> : null}
          {!won && gameOver ? <span>You Lose! 😞</span> : null}

          {gameOver ? <button onClick={resetGame}>New Game?</button> : null}
        </div>
      </section>
    </Card>
  );
}

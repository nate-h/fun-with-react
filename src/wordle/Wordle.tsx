/**
 * MVP:
 * - keyboard
 * - hotkeys
 * - popups
 * - some animations
 */

import clsx from 'clsx';
import { useState } from 'react';
import Card from '../Card';
import './Wordle.scss';
import Keyboard from './Keyboard';
import valid_words from './valid_words.json';
import valid_answers from './valid_answers.json';

// Shuffle answers.
valid_answers.sort(() => (Math.random() > 0.5 ? 1 : -1));

export default function Wordle() {
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [gamesWon, setGamesWon] = useState<number>(0);
  const answer = valid_answers[gamesPlayed];
  const [guessCount, setGuessCount] = useState<number>(0);
  const [guesses, setGuesses] = useState<string[][]>(
    Array.from(Array(6), (_) => Array(5).fill('')),
  );

  console.log(`Wordle answer: ${answer}`);

  const won = guessCount > 0 && guesses[guessCount - 1].join('') === answer;
  const gameOver = guessCount === 6 || won;

  function press(char: string) {
    if (gameOver) {
      return;
    }

    if (char === 'enter') {
      enter();
    } else if (char === 'backspace') {
      backspace();
    } else {
      pressChar(char);
    }
  }

  function enter() {
    const guess = guesses[guessCount];
    if (guess.indexOf('') !== -1) {
      console.log('TODO: Not enough letters');
    } else if (valid_words.indexOf(guess.join('')) === -1) {
      console.log('TODO: Not in word list');
    } else {
      setGuessCount(guessCount + 1);
    }
  }

  function backspace() {
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

  function pressChar(char: string) {
    const row = guesses[guessCount];
    const index = row.indexOf('');
    if (index === -1) {
      return;
    }
    row[index] = char;
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

  const resetGame = () => {
    setGuessCount(0);
    setGuesses(Array.from(Array(6), (_) => Array(5).fill('')));
    setGamesWon(gamesWon + Number(won));
    setGamesPlayed(gamesPlayed + 1);
  };

  return (
    <Card header='Wordle'>
      <section className='Wordle'>
        <div className='guesses'>
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

        <Keyboard press={press}></Keyboard>

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

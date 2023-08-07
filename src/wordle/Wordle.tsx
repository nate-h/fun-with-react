/**
 * Extra credit:
 * - some animations
 * - some message about keyboard shortcuts on click
 */

import './Wordle.scss';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Card from '../Card';
import Keyboard from './Keyboard';
import valid_words from './valid_words.json';
import valid_answers from './valid_answers.json';
import PopUp from '../pop-up/PopUp';
import { useFocus } from '../utils';

// Shuffle answers.
valid_answers.sort(() => (Math.random() > 0.5 ? 1 : -1));

export default function Wordle() {
  const [wordleRef, setWordleFocus] = useFocus();
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const answer = valid_answers[gamesPlayed];
  const [guessCount, setGuessCount] = useState(0);
  const [popupText, setPopupText] = useState('');
  const [guesses, setGuesses] = useState<string[][]>(
    Array.from(Array(6), (_) => Array(5).fill('')),
  );
  const won = guessCount > 0 && guesses[guessCount - 1].join('') === answer;
  const gameOver = guessCount === 6 || won;

  useEffect(() => {
    console.log(`Wordle answer: ${answer}`);
  }, [answer]);

  const resetGame = () => {
    setGuessCount(0);
    setGuesses(Array.from(Array(6), (_) => Array(5).fill('')));
    setGamesWon(gamesWon + Number(won));
    setGamesPlayed(gamesPlayed + 1);
  };

  function press(char: string) {
    if (gameOver) {
      return;
    }

    setWordleFocus();

    if (char === 'enter') {
      enter();
    } else if (char === 'backspace') {
      backspace();
    } else if (/^[A-Z]$/i.test(char)) {
      pressChar(char);
    }
  }

  function enter() {
    const guess = guesses[guessCount];
    if (guess.indexOf('') !== -1) {
      setPopupText('Not 5 Letters');
    } else if (valid_words.indexOf(guess.join('')) === -1) {
      setPopupText('Invalid Word');
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
      // TODO: this is slow. Rewrite.
      const row = guesses[guessRow];
      const accurateSpots: number[] = row.map((r, i) => (r === answer[i] ? 1 : 0));
      const countCorrect = accurateSpots.reduce((a, b) => a + b, 0);
      const countCharInAnswer = answer.split(char).length - 1;
      let countWrongSpotBeforeMe = 0;
      for (let i = 0; i < charIndex; ++i) {
        if (answer[i] !== char && row[i] === char) {
          countWrongSpotBeforeMe += 1;
        }
      }
      if (countCorrect + countWrongSpotBeforeMe < countCharInAnswer) {
        return 'yellow';
      }
    }
    return 'gray';
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toLowerCase();
    press(key);
  };

  return (
    <Card header='Wordle' id='Wordle'>
      <section className='Wordle' tabIndex={0} onKeyUp={onKeyUp} ref={wordleRef}>
        <PopUp text={popupText} onClose={() => setPopupText('')}></PopUp>

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

        <Keyboard press={press} answer={answer} guesses={guesses.slice(0, guessCount)}></Keyboard>

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

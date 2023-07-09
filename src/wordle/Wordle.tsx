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
  const answer = 'hacks';
  const [guessCount, setGuessCount] = useState<number>(0);
  const [guesses, setGuesses] = useState<Array<Array<string>>>(Array(6).fill(Array(5).fill('')));
  const loss = guessCount > 5;

  function press(char: string) {
    console.log(char);
  }

  function charColor(guessRow: number, charIndex: number, char: string) {
    if (char === '') {
      return '';
    }
    if (guessRow === guessCount) {
      return 'unevaluated';
    }
    return 'green';
  }

  function incrementGuessCount() {
    if (guessCount > 5) {
      return;
    }
    setGuessCount(guessCount + 1);
  }

  function backspace() {
    console.log('backspace!');
  }

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
          {`guess count: ${guessCount}`}
          {` loss: ${loss}`}
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
      </section>
    </Card>
  );
}

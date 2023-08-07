import clsx from 'clsx';
import './Keyboard.scss';

const keyboard: Array<Array<string>> = [
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  'zxcvbnm'.split(''),
];

interface KeyboardProps {
  press: (p: string) => void;
  answer: string;
  guesses: string[][];
}

export default function Keyboard({ press, answer, guesses }: KeyboardProps) {
  const d = new Map<string, string>();
  for (const guess of guesses) {
    for (let i = 0; i < guess.length; ++i) {
      const c = guess[i];
      if (guess[i] === answer[i]) {
        d.set(c, 'green');
      } else if (d.get(c) !== 'green' && answer.includes(c)) {
        d.set(c, 'yellow');
      } else if (!d.get(c)) {
        d.set(c, 'gray');
      }
    }
  }

  function charColor(char: string) {
    return d.get(char);
  }

  function keyboardRow(row: string[]) {
    return row.map((c) => (
      <li key={c}>
        <button className={clsx('keyboard-key', charColor(c))} onClick={() => press(c)}>
          {c}
        </button>
      </li>
    ));
  }

  return (
    <div className='Keyboard'>
      <ul className='keyboard-row'>{keyboardRow(keyboard[0])}</ul>
      <ul className='keyboard-row offset'>{keyboardRow(keyboard[1])}</ul>
      <ul className='keyboard-row'>
        <li>
          <button className='keyboard-key enter' onClick={() => press('enter')}>
            enter
          </button>
        </li>
        {keyboardRow(keyboard[2])}
        <li>
          <button className='keyboard-key backspace' onClick={() => press('backspace')}>
            ⌫
          </button>
        </li>
      </ul>
    </div>
  );
}

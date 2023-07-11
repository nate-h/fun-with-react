import './Keyboard.scss';

const keyboard: Array<Array<string>> = [
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  'zxcvbnm'.split(''),
];

export default function Keyboard({ press }: { press: (p: string) => void }) {
  function keyboardRow(row: string[]) {
    return row.map((c) => (
      <li key={c}>
        <button className='keyboard-key' onClick={() => press(c)}>
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

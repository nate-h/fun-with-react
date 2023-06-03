import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './Calculator.scss';

function formatNumber(strNumber: string): string {
  // https://stackoverflow.com/a/2901298/2809674
  return strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const buttons = [
  ['AC', 'gray'],
  ['+/-', 'gray'],
  ['%', 'gray'],
  ['÷', 'orange'],
  ['7', ''],
  ['8', ''],
  ['9', ''],
  ['x', 'orange'],
  ['4', ''],
  ['5', ''],
  ['6', ''],
  ['-', 'orange'],
  ['1', ''],
  ['2', ''],
  ['3', ''],
  ['+', 'orange'],
  ['0', 'grow'],
  ['.', ''],
  ['=', 'orange'],
];

export default function Calculator() {
  const [last, setLast] = useState<string>('');
  const [curr, setCurr] = useState<string>('0');
  const [operator, setOperator] = useState<string>('');

  const equals = () => {
    if (!operator) {
      return;
    }
    let t = 0;
    const [l, c] = [+last, +curr];
    if (operator === '+') {
      t = l + c;
    } else if (operator === '-') {
      t = l - c;
    } else if (operator === 'x') {
      t = l * c;
    } else {
      t = l / c;
    }

    setLast('0');
    setCurr(t.toString());
    setOperator('');
  };

  const onNumberClick = (text: string) => {
    if (operator) {
      setLast(curr);
    }
    if (curr == '0') {
      setCurr(text);
    } else if (curr.length === 9) {
      return;
    } else {
      setCurr(curr + text);
    }
  };

  const times = (num: Number) => {};

  const press = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.nativeEvent.target as HTMLElement;
    const text = el.innerHTML;
    if (!isNaN(+text)) {
      onNumberClick(text);
    } else if ('x-+÷'.includes(text)) {
      setOperator(text);
    } else if (text === '=') {
      equals();
    } else if (text === '.') {
      if (!curr.includes('.')) {
        setCurr(curr + '.');
      }
    } else if (text === 'AC') {
      setCurr('0');
      setLast('');
      setOperator('');
    } else if (text === '+/-') {
      times(-1);
    } else if (text === '%') {
      times(0.01);
    } else {
      console.error('invalid option.');
    }
  };

  return (
    <Card header='Calculator' subheader='iPhone clone'>
      <section className='Calculator'>
        <div className='display'>{formatNumber(curr)}</div>
        <div className='buttons'>
          {buttons.map((b) => (
            <button key={b[0]} className={b[1]} onClick={press}>
              {b[0]}
            </button>
          ))}
        </div>
      </section>
      last: {last}
      <br />
      curr: {curr}
      <br />
      op: {operator}
    </Card>
  );
}

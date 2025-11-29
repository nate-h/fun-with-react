import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './Calculator.scss';
import { ReactFitty } from 'react-fitty';

function formatNumber(strNumber: string): string {
  if (strNumber.replace('.', '').length > 9) {
    return (+strNumber).toExponential(5);
  }
  // https://stackoverflow.com/a/2901298/2809674
  const parts = strNumber.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
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
  const [op, setOp] = useState<string>('');
  const display = formatNumber(curr);

  const equals = () => {
    if (!op) {
      return;
    }
    let t = 0;
    const [l, c] = [+last, +curr];
    if (op === '+') {
      t = l + c;
    } else if (op === '-') {
      t = l - c;
    } else if (op === 'x') {
      t = l * c;
    } else {
      t = l / c;
    }

    if (isFinite(t)) {
      setCurr(t.toString());
    } else {
      setCurr('Error');
    }
    setLast('');
    setOp('');
  };

  const onNumberClick = (text: string) => {
    if (op && !last) {
      setLast(curr);
      setCurr(text);
    } else if (curr === '0') {
      setCurr(text);
    } else if (curr.length === 9) {
      return;
    } else {
      setCurr(curr + text);
    }
  };

  const times = (num: number) => {
    const c = +curr;
    setCurr((num * c).toString());
  };

  const press = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.nativeEvent.target as HTMLElement;
    const text = el.innerHTML;
    if (!isNaN(+text)) {
      onNumberClick(text);
    } else if ('x-+÷'.includes(text)) {
      setOp(text);
      setLast('');
    } else if (text === '=') {
      equals();
    } else if (text === '.') {
      if (!curr.includes('.')) {
        setCurr(curr + '.');
      }
    } else if (text === 'AC') {
      setCurr('0');
      setLast('');
      setOp('');
    } else if (text === '+/-') {
      times(-1);
    } else if (text === '%') {
      times(0.01);
    } else {
      console.error('invalid option.');
    }
  };

  return (
    <Card header='Calculator' id='Calculator'>
      <section>
        <div className='display'>
          <ReactFitty maxSize={46}>{display}</ReactFitty>
        </div>
        <div className='buttons'>
          {buttons.map((b) => (
            <button
              key={b[0]}
              className={clsx(b[1], { 'op-selected': op === b[0] && !last })}
              onClick={press}
            >
              {b[0]}
            </button>
          ))}
        </div>
      </section>
    </Card>
  );
}

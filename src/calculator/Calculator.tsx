import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './Calculator.scss';

function formatNumber(strNumber: string): string {
  return strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function Calculator() {
  const [total, setTotal] = useState<string>('0');

  const press = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.nativeEvent.target as HTMLElement;
    const text = el.innerHTML;
    if (!isNaN(+text)) {
      if (total == '0') {
        setTotal(text);
      } else if (total.length === 9) {
        return;
      } else {
        setTotal(total + text);
      }
    } else if ('x-+÷'.includes(text)) {
      console.log(`operator: ${text}`);
    } else if (text === '=') {
      console.log('equals');
    } else if (text === '.') {
      if (!total.includes('.')) {
        setTotal(total + '.');
      }
    } else if (text === 'AC') {
      setTotal('0');
    } else if (text === '+/-') {
      console.log('+-');
    } else if (text === '%') {
      console.log('percent');
    } else {
      console.error('invalid option.');
    }
  };

  return (
    <Card header='Calculator' subheader='iPhone clone'>
      <section className='Calculator'>
        <div className='display'>{formatNumber(total)}</div>
        <div className='row'>
          <button className='gray' onClick={press}>
            AC
          </button>
          <button className='gray' onClick={press}>
            +/-
          </button>
          <button className='gray' onClick={press}>
            %
          </button>
          <button className='orange' onClick={press}>
            ÷
          </button>
        </div>
        <div className='row'>
          <button onClick={press}>7</button>
          <button onClick={press}>8</button>
          <button onClick={press}>9</button>
          <button className='orange' onClick={press}>
            x
          </button>
        </div>
        <div className='row'>
          <button onClick={press}>4</button>
          <button onClick={press}>5</button>
          <button onClick={press}>6</button>
          <button className='orange' onClick={press}>
            -
          </button>
        </div>
        <div className='row'>
          <button onClick={press}>1</button>
          <button onClick={press}>2</button>
          <button onClick={press}>3</button>
          <button className='orange' onClick={press}>
            +
          </button>
        </div>
        <div className='row'>
          <button className='grow' onClick={press}>
            0
          </button>
          <button onClick={press}>.</button>
          <button className='orange' onClick={press}>
            =
          </button>
        </div>
      </section>
    </Card>
  );
}

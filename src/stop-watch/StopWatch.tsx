import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './Stopwatch.scss';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [times, setTimes] = useState<String[]>([]);
  const [lastTimeMS, setLastTimeMS] = useState<number>(0);
  const currentTimer = useRef<number>(0);

  const startTimer = () => {
    setStartTime(new Date());
    currentTimer.current = window.setInterval(() => {
      setTimes([...times, Date.now().toLocaleString()]);
      console.log('.');
    }, 1 / 30);
  };
  const endTimer = () => {
    setStartTime(null);
    setLastTimeMS(lastTimeMS + timeDiffMS());
    window.clearInterval(currentTimer.current);
    currentTimer.current = 0;
  };

  const reset = () => {
    setLastTimeMS(0);
    setTimes([]);
  };

  const lap = () => {
    console.log('lap');
  };

  const timeDiffMS = () => {
    if (startTime) {
      return new Date().getTime() - startTime.getTime();
    }
    return 0;
  };

  const displayTime = () => {
    const zeroPad = (num: number) => String(num).padStart(2, '0');
    const raw = lastTimeMS + timeDiffMS();
    const ms = Math.floor((raw % 1000) / 10);
    const secs = Math.floor((raw / 1000) % 60);
    const mins = Math.floor((raw / 1000 / 60) % 60);
    return `${zeroPad(mins)}:${zeroPad(secs)}:${zeroPad(ms)}`;
  };

  return (
    <Card header='Stopwatch' subheader='Modeled after iPhone Stopwatch'>
      <section className='Stopwatch'>
        <p>{displayTime()}</p>
        {startTime ? (
          <div>
            <button onClick={lap}>Lap</button>
            <button onClick={endTimer} className='stop'>
              Stop
            </button>
          </div>
        ) : (
          <div>
            <button onClick={reset}>Reset</button>
            <button onClick={startTimer} className='start'>
              Start
            </button>
          </div>
        )}
        <hr />
      </section>
    </Card>
  );
}

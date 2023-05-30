import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './StopWatch.scss';

export default function StopWatch() {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [times, setTimes] = useState<String[]>([]);
  const [lastTimeMS, setLastTimeMS] = useState<number>(0);
  const currentTimer = useRef<number>(0);

  const startTimer = () => {
    setStartTime(new Date());
    currentTimer.current = window.setInterval(() => {
      setTimes([...times, Date.now().toLocaleString()]);
      console.log('called time update');
    }, 1000);
  };
  const endTimer = () => {
    setStartTime(null);
    setLastTimeMS(timeDiffMS());
    window.clearInterval(currentTimer.current);
    currentTimer.current = 0;
  };

  const reset = () => {
    setLastTimeMS(0);
    setTimes([]);
  };

  const timeDiffMS = () => {
    if (startTime) {
      return new Date().getTime() - startTime.getTime();
    }
    throw TypeError('start time should be instantiated to calculate diff.');
  };

  return (
    <Card header='Stop Watch'>
      <section className='StopWatch'>
        {startTime ? (
          <div>
            <button onClick={endTimer} className='stop'>
              Stop
            </button>
            Time: {(lastTimeMS + timeDiffMS()) / 1000}
          </div>
        ) : (
          <div>
            <button onClick={startTimer} className='start'>
              Start
            </button>
          </div>
        )}
        <hr />
        <button onClick={reset}>Reset</button>
      </section>
    </Card>
  );
}

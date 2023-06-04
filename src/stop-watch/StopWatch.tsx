import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './Stopwatch.scss';

function dt(t1: Date, t2: Date): number {
  return t2.getTime() - t1.getTime();
}

function formatDisplay(dt: number): string {
  const zeroPad = (num: number) => String(num).padStart(2, '0');
  const ms = Math.floor((dt % 1000) / 10);
  const secs = Math.floor((dt / 1000) % 60);
  const mins = Math.floor((dt / 1000 / 60) % 60);
  return `${zeroPad(mins)}:${zeroPad(secs)}:${zeroPad(ms)}`;
}

export default function Stopwatch() {
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [totalTimeDelta, setTotalTimeDelta] = useState<number>(0);
  const [lapStartTime, setLapStartTime] = useState<Date>(new Date());
  const [lapTimeDelta, setLapTimeDelta] = useState<number>(0);
  const [now, setNow] = useState<Date>(new Date());
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const currentTimer = useRef<number>(0);
  const totalDisplay = formatDisplay(totalTimeDelta + dt(startTime, now));
  const lapDisplay = formatDisplay(lapTimeDelta + dt(lapStartTime, now));
  let slowestLap = -1;
  let fastestLap = -1;
  if (lapTimes.length > 1) {
    slowestLap = lapTimes.indexOf(Math.max(...lapTimes));
    fastestLap = lapTimes.indexOf(Math.min(...lapTimes));
  }

  const setTimes = (newNow: Date) => {
    setStartTime(newNow);
    setLapStartTime(newNow);
    setNow(newNow);
  };

  const startTimer = () => {
    setTimes(new Date());
    currentTimer.current = window.setInterval(() => {
      setNow(new Date());
      console.log('.');
    }, 1 / 30);
  };
  const endTimer = () => {
    const now_ = new Date();
    setTimes(now_);
    setTotalTimeDelta(totalTimeDelta + dt(startTime, now_));
    setLapTimeDelta(lapTimeDelta + dt(lapStartTime, now_));
    window.clearInterval(currentTimer.current);
    currentTimer.current = 0;
  };

  const reset = () => {
    setTimes(new Date());
    setTotalTimeDelta(0);
    setLapTimeDelta(0);
    setLapTimes([]);
  };

  const lap = () => {
    setLapTimes([...lapTimes, lapTimeDelta + dt(lapStartTime, new Date())]);
    setLapTimeDelta(0);
    setLapStartTime(new Date());
  };

  const lapStyling = (index: number) => {
    return clsx({ slowest: index === slowestLap, fastest: index === fastestLap });
  };

  return (
    <Card header='Stopwatch' subheader='iPhone Clone'>
      <section className='Stopwatch'>
        <p>{totalDisplay}</p>
        <div className='spread'>
          {currentTimer.current ? (
            <>
              <button onClick={lap}>Lap</button>
              <button onClick={endTimer} className='stop'>
                Stop
              </button>
            </>
          ) : (
            <>
              <button onClick={reset}>Reset</button>
              <button onClick={startTimer} className='start'>
                Start
              </button>
            </>
          )}
        </div>
        <hr />
        <ul className='lap-times'>
          {lapTimes.map((dt, i) => {
            return (
              <li key={i} className={lapStyling(i)}>
                <span>Lap {i + 1}</span>
                <span>{formatDisplay(dt)}</span>
              </li>
            );
          })}
          {totalDisplay !== '00:00:00' ? (
            <li>
              <span>Lap {lapTimes.length + 1}</span>
              <span>{lapDisplay}</span>
            </li>
          ) : null}
        </ul>
      </section>
    </Card>
  );
}

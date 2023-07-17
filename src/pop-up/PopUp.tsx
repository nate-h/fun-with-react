import './PopUp.scss';
import { useEffect, useRef, useState } from 'react';

interface ModalProps {
  text: string;
  timeMs?: number;
  onClose: () => void;
}

export default function PopUp({ text, timeMs, onClose }: ModalProps) {
  const timer = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    clearTimeout(timer.current);
    if (text) {
      setIsVisible(true);
      console.log('start: ', text, timeMs);
      const resolvedTime = timeMs !== undefined ? timeMs : 3000;
      setTimeout(() => {
        setIsVisible(false);
        timer.current = 0;
        onClose();
      }, resolvedTime);
    }
  }, [text, timeMs]);

  return isVisible ? <div className='PopUp'>{text}</div> : null;
}

import { useRef } from 'react';

interface OnSuccess {
  (msg: any): void;
}

const myFetch = (url: string, onSuccess: OnSuccess) => {
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw res;
    })
    .then((j) => {
      onSuccess(j.message);
    });
};

const useFocus = () => {
  const htmlElRef = useRef<HTMLElement>(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus] as const;
};

export { myFetch, useFocus };

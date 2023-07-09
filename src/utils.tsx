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

export { myFetch };

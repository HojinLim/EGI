import React from 'react';
import { atom, useAtom } from 'jotai';
const Home = () => {
  const countAtom = atom(0);
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      <span>{count}</span>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
          console.log(count);
        }}
      >
        one up
      </button>
    </div>
  );
};

export default Home;

// /page/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import GetPost from '../components/posts/GetPost';
const countAtom = atom(0);

const Home = () => {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/post">
          <button>글작성</button>
        </Link>
        <GetPost />
      </div>
      {/* Add a navigation link to navigate to the Mypage */}
      <Link to="/">Home</Link> <p />
      <Link to="/mypage">Mypage</Link>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      {/* Jotai 테스트 */}
      <div>
        <span>{count}</span>
        <button
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          one up
        </button>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import GetPost from '../components/posts/GetPost';
import Header from '../components/common/Header';

const Home = () => {
  return (
    <>
      <Header />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/post">
          <button>글작성</button>
        </Link>
        <GetPost />
      </div>
    </>
  );
};

export default Home;

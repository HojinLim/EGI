import React from 'react';
import { Link } from 'react-router-dom';
import GetPost from '../components/posts/GetPost';
import Header from '../components/common/Header';

const Home = () => {
  return (
    <div>
      <Header />
      <div>
        <Link to="/post">
          <button>글작성</button>
        </Link>
        <GetPost />
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import GetPost from '../components/posts/GetPost';
import Header from '../components/common/Header';
import { useAtom } from 'jotai';
import { userAtom } from '../components/user/Login';
import Banner from '../components/common/Banner';
import CategoryFilter from '../components/category/CategoryFilter';
import InfiniteScroll from '../components/InfiniteScroll';

const Home = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      <Header />
      {user && <Link to="/mypage">마이페이지</Link>}
      <Banner />
      <CategoryFilter />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} />
      <div>
        <Link to="/post">
          <button>글작성</button>
        </Link>
        <GetPost />
        <InfiniteScroll />
      </div>
    </div>
  );
};

export default Home;

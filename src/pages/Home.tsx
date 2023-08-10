import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetPost from '../components/posts/GetPost';
import Header from '../components/common/Header';
import Banner from '../components/common/Banner';
import CategoryFilter from '../components/category/CategoryFilter';

const Home = () => {
  const [scroll, setScroll] = useState(0);
  const onscroll = () => {
    setScroll(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', onscroll);
    return () => {
      window.removeEventListener('scroll', onscroll);
    };
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <CategoryFilter />
      <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundPositionY: scroll / 2 }}>
        <Link to="/post">
          <button>글작성</button>
        </Link>
        <GetPost />
      </div>
    </>
  );
};

export default Home;

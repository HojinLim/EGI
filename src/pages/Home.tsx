import React from 'react';

import GetPost from '../components/posts/GetPost';
import Banner from '../components/common/Banner';
import CategoryFilter from '../components/category/CategoryFilter';
import InfiniteScroll from '../components/InfiniteScroll';

const Home = () => {
  return (
    <div>
      <Banner />
      <CategoryFilter />
      <GetPost />
      <InfiniteScroll />
    </div>
  );
};

export default Home;

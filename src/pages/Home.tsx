import React from 'react';

import GetPost from '../components/posts/GetPost';
import Banner from '../components/common/Banner';
// import InfiniteScroll from '../components/InfiniteScroll';

const Home = () => {
  return (
    <div>
      <Banner />
      <GetPost />
      {/* <InfiniteScroll /> */}
    </div>
  );
};

export default Home;

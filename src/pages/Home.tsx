import React from 'react';

import GetPost from '../components/posts/GetPost';

const Home = () => {
  return (
    <div>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} />
      <div>
        <GetPost />
      </div>
    </div>
  );
};

export default Home;
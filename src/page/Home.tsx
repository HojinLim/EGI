// /page/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      {/* Add a navigation link to navigate to the Mypage */}
      <Link to="/">Home</Link>
      <Link to="/mypage">Mypage</Link>

      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
    </div>
  );
};

export default Home;

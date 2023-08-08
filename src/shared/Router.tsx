import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from '../page/Home';
import Mypage from '../page/Mypage'; 
const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
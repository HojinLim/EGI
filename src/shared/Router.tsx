import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Home from '../pages/Home';
import Mypage from '../pages/Mypage'; 

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/pagination" element={<Pagination />} />
     
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

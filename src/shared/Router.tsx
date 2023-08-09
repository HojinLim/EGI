import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Home from '../pages/Home';
import Mypage from '../pages/Mypage';
import Detail from '../pages/Detail';
import PostPage from '../pages/PostPage';

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
          {/* postMode를 넘겨줄 때 중괄호 { }를 사용하지 않습니다. */}
          <Route path="/pagination" element={<Pagination postMode="내가 쓴 글" />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/post/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
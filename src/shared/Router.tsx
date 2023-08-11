import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pagination from '../components/mypage/Pagination';
import Home from '../pages/Home';
import Mypage from '../pages/Mypage';
import Detail from '../pages/Detail';
import PostPage from '../pages/PostPage';
import EditPage from '../pages/EditPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/post/:id" element={<Detail />} />
          <Route path="/editpost/:id" element={<EditPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Mypage from '../components/mypage/MyProfile';
import DetailPage from '../pages/Detail';
import PostPage from '../pages/PostPage';
import EditPage from '../pages/EditPage';
import ResetPasswordPage from '../pages/resetpassword/ResetPasswordPage';
import Header from '../components/common/Header';
import GlobalStyle from '../GlobalStyle';

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/post/:id" element={<DetailPage />} />
          <Route path="/editpost/:id" element={<EditPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

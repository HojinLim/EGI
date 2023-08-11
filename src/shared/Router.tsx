import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import PostPage from '../pages/PostPage';
import EditPage from '../pages/EditPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
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

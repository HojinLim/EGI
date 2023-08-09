import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Home from '../pages/Home';
import Mypage from '../pages/Mypage';
import Detail from '../pages/Detail';
import PostPage from '../pages/PostPage';
import EditPage from '../pages/EditPage';


const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/pagination" element={<Pagination postMode="내가 쓴 글" posts={[]} />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/post/:id" element={<Detail />} />
          <Route path="/editpost/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

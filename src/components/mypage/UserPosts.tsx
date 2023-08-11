import React, { useState } from 'react';
import Pagination from './Pagination';

const UserPosts = () => {
  const [postMode, setPostMode] = useState<string>('');

  const handlePost = (mode: string) => {
    setPostMode(mode);
  };

  return (
    <div>
      <h2>User Posts</h2>

      <button onClick={() => handlePost('내가 쓴 글')}>내가 쓴 글</button>
      <button onClick={() => handlePost('찜 목록')}>찜 목록</button>
      <h2>{postMode}</h2>

      {/* 게시판 컨테이너 */}
      <div style={{ width: '1000px', height: '600px', border: '2px solid black' }}>
        <Pagination postMode={postMode} />
      </div>
    </div>
  );
};

export default UserPosts;

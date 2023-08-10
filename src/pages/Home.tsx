import React from 'react';
import { Link } from 'react-router-dom';
import GetPost from '../components/posts/GetPost';
import Header from '../components/common/Header';
import { useAtom } from 'jotai';
import { userAtom } from '../components/user/Login';

const Home = () => {
  const [user] = useAtom(userAtom); // userAtom의 값을 가져옴

  return (
    <div>
      <Header />
      {/*  회원정보 존재 시 -> 마이페이지 링크 활성화 */}

      {user && <Link to="/mypage">마이페이지</Link>}

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}/>
      <div>
        <Link to="/post">
          <button>글작성</button>
        </Link>
        <GetPost />
      </div>
    </div>
  );
};

export default Home;

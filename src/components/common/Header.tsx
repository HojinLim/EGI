import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Login from '../user/Login';
import { getUserInfo, sigOutService } from '../../services/supabase/auth';
import type { UserType } from '../../types/supabase';

const Header = () => {
  const [loginModal, setLoginModal] = useState(false);

  const showModal = () => {
    setLoginModal(true);
  };

  const {
    isLoading,
    isError,
    data: userData
  } = useQuery<Omit<UserType[], 'email' | 'password'>>(['users'], getUserInfo);

  const signOutHandler = async () => {
    try {
      await sigOutService();

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const tokenKey = localStorage.getItem('sb-bbakvkybkyfoiijevbec-auth-token');
  const parsedToken = tokenKey ? JSON.parse(tokenKey) : null;
  let userId: string | undefined;

  if (parsedToken && parsedToken.user) {
    userId = parsedToken.user.id;
  }
  console.log('userId', userId);
  if (isLoading) {
    return <div>데이터 로딩 중입니다.</div>;
  }

  if (isError) {
    return <div>데이터를 불러오는 동안 오류가 발생했습니다</div>;
  }

  return (
    <>
      <div>
        {userId ? <button onClick={signOutHandler}>Logout</button> : <button onClick={showModal}>Login</button>}
        {loginModal && <Login setLoginModal={setLoginModal} />}
      </div>
      <div>
        {userData
          .filter((item) => item.uid === userId)
          .map((item) => {
            return (
              <div key={item.uid}>
                {item.profileImg}
                {item.nickname}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Header;

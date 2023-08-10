import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import Login, { userAtom } from '../user/Login';
import Login, { userEmailAtom } from '../user/Login';
import { getUserInfo, sigOutService } from '../../services/supabase/auth';
import type { UserType } from '../../types/supabase';
import { useAtom } from 'jotai';



const Header = () => {
  // const [user] = useAtom(userAtom); // userAtom의 값을 가져옴
  const [loginModal, setLoginModal] = useState(false);
  const [userEmail] = useAtom(userEmailAtom);
  const showModal = () => {
    setLoginModal(true);
  };

  const {
    // isLoading,
    // isError,
    data: userData
  } = useQuery<Omit<UserType, 'password'> | null>({
    queryKey: ['users', userEmail],
    queryFn: () => getUserInfo(userEmail)
  });
  
  console.log('userData!', userData);
  
 


  console.log('유저 이메일>' + userEmail);
  const signOutHandler = async () => {
    try {
      await sigOutService();

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // const tokenKey = localStorage.getItem('sb-bbakvkybkyfoiijevbec-auth-token');
  // const parsedToken = tokenKey ? JSON.parse(tokenKey) : null;
  // let userId: string | undefined;

  // if (parsedToken && parsedToken.user) { 
  //   userId = parsedToken.user.id;
  // }
  // console.log('userId', userId);
  // if (isLoading) {
  //   return <div>데이터 로딩 중입니다.</div>;
  // }

  // if (isError) {
  //   return <div>데이터를 불러오는 동안 오류가 발생했습니다</div>;
  // }

  return (
    <>
      <div>
        {userData ? <button onClick={signOutHandler}>Logout</button> : <button onClick={showModal}>Login</button>}
        {loginModal && <Login setLoginModal={setLoginModal} />}
      </div>
      <div>
        {userData ? (
          <div key={userData.uid}>
            <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${userData.profileImg}`} alt="User Profile" />
            {userData.nickname}
          </div>
        ) : null}
      </div>

      
    </>
  );
};

export default Header;

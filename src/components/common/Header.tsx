import React, { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Login, { userAtom, userEmailAtom } from '../user/Login';
import { getUserInfo, sigOutService } from '../../services/supabase/auth';
import icon from '../../image/icon.png';
import * as S from './Styled.Header';

import type { UserType } from '../../types/supabase';

export const jotaiUserDataAtom = atom<Omit<UserType, 'password'> | null>(null);

const Header = () => {
  const queryClient = useQueryClient();
  const [loginModal, setLoginModal] = useState(false);

  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [, setUser] = useAtom(userAtom);
  const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [jotaiUserData, setJotaiUserData] = useAtom(jotaiUserDataAtom);

  const {
    isLoading,
    isError,
    data: userData
  } = useQuery<Omit<UserType, 'password'> | null>(['users', userEmail], () => getUserInfo(userEmail), {
    staleTime: 300000,
    enabled: userEmail !== null // userEmail이 있을 때에만 useQuery 실행
  });

  const logoutMutation = useMutation(() => sigOutService(), {
    onSuccess: () => {
      setJotaiUserData(null); // 로그아웃 시 jotaiUserData를 null로 업데이트
      localStorage.removeItem('jotaiUserData');
      queryClient.invalidateQueries(['users', userEmail]);
    }
  });

  const signOutHandler = async () => {
    try {
      setUser(null); // userData 초기화
      setUserEmail('');
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData) {
      const userDataString = JSON.stringify(userData);
      localStorage.setItem('jotaiUserData', userDataString);
      setJotaiUserData(userData);
    }
  }, [userData]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('jotaiUserData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setJotaiUserData(parsedUserData);
    }
  }, []);

  const showModal = () => {
    setLoginModal(true);
  };

  const toggleLogoutButton = () => {
    setShowLogoutButton((prevState) => !prevState);
  };
  if (isLoading) {
    return <div>데이터 로딩 중입니다.</div>;
  }

  if (isError) {
    return <div>데이터를 불러오는 동안 오류가 발생했습니다</div>;
  }

  return (
    <S.HeaderContainer>
      <S.Logo src={icon} />
      <div>
        {jotaiUserData ? (
          <S.ProfileWrapper>
            <div>
              {jotaiUserData ? (
                <S.ProfileBox key={jotaiUserData.uid}>
                  <S.ProfileImg
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${jotaiUserData.profileimg}`}
                    alt="Profile"
                  />
                  <S.NickName>{jotaiUserData.nickname}</S.NickName>
                </S.ProfileBox>
              ) : null}
            </div>
            <S.ButtonBox>
              <S.ToggleButtonWrapper>
                <S.ToggleButton onClick={toggleLogoutButton}>▼</S.ToggleButton>
                {showLogoutButton && <S.LogoutButton onClick={signOutHandler}>Logout</S.LogoutButton>}
              </S.ToggleButtonWrapper>
            </S.ButtonBox>
          </S.ProfileWrapper>
        ) : (
          <S.LoginButton onClick={showModal}>Login</S.LoginButton>
        )}
        {loginModal && <Login setLoginModal={setLoginModal} />}
      </div>
    </S.HeaderContainer>
  );
};

export default Header;

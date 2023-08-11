import React, { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Login, { userAtom, userEmailAtom } from '../user/login/Login';
import { getUserInfo, sigOutService } from '../../services/supabase/auth';
import icon from '../../image/icon.png';
import baseProfile from '../../image/baseprofile.jpeg';
import * as S from './Styled.Header';

import type { UserType } from '../../types/supabase';

import { supabase } from '../../services/supabase/supabase';
import { sosialUserAtom } from '../user/social/SosialLogin';

const jotaiUserDataAtom = atom<Omit<UserType, 'password'> | null>(null);

const Header = () => {
  const queryClient = useQueryClient();

  const [loginModal, setLoginModal] = useState(false);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const [user, setUser] = useAtom(userAtom);
  const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [jotaiUserData, setJotaiUserData] = useAtom(jotaiUserDataAtom);
  const [soSialUser, setSoSialUser] = useAtom(sosialUserAtom);
  console.log('soSialUser', soSialUser);
  console.log('user', user);

  // 유저 정보 조회하는 쿼리
  const {
    isLoading,
    isError,
    data: userData
  } = useQuery<Omit<UserType, 'password'> | null>(['users', userEmail], () => getUserInfo(userEmail), {
    staleTime: 300000,
    enabled: userEmail !== null
  });

  // 로그아웃 뮤테이션
  const logoutMutation = useMutation(() => sigOutService(), {
    onSuccess: () => {
      setJotaiUserData(null);
      setUserEmail('');
      localStorage.removeItem('jotaiUserData');
      queryClient.invalidateQueries(['users', userEmail]);
    }
  });

  // 로그아웃 핸들러
  const signOutHandler = async () => {
    try {
      setSoSialUser(null);
      setUser(null); // userData 초기화
      setUserEmail('');
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  // 토큰 생성
  useEffect(() => {
    if (userData) {
      const userDataString = JSON.stringify(userData);
      localStorage.setItem('jotaiUserData', userDataString);
      setJotaiUserData(userData);
    }
  }, [userData]);

  // 생성한 토큰 가져와서 새로고침 방지
  useEffect(() => {
    const storedUserData = localStorage.getItem('jotaiUserData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setJotaiUserData(parsedUserData);
    }
  }, []);

  // 현재 유저의 정보 가져오기
  const checkUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    setSoSialUser(user);
  };

  // window.addEventListener('hashchange' =>브라우저의 URL 해시(예: # 뒤의 일부)가 변경될 때 발생
  // 의존성 배열을 빈 배열([])을 전달했기 때문에, 컴포넌트가 처음 렌더링될 때 한 번만 실행되며, 이후에는 의존성 변경 없이는 다시 실행되지 않음
  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', function () {
      checkUser();
    });
  }, []);

  // 로그인 모달 오픈
  const showModal = () => {
    setLoginModal(true);
  };

  // 드롭박스 토글 버튼
  const toggleLogoutButton = () => {
    setShowLogoutButton((prevState) => !prevState);
  };

  const userName = soSialUser?.user_metadata.name;
  const userId = soSialUser?.id;

  console.log('userName', userName);
  console.log('userId', userId);

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
        {jotaiUserData || soSialUser ? (
          <S.ProfileWrapper>
            {userName && (
              <S.ProfileBox>
                <S.ProfileImg src={baseProfile} />
                <S.NickName>{userName}</S.NickName>
              </S.ProfileBox>
            )}
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
            <S.ButtonWrapper>
              <S.ButtonBox>
                <S.ToggleButton onClick={toggleLogoutButton}>▼</S.ToggleButton>
                {showLogoutButton && <S.LogOutButton onClick={signOutHandler}>로그아웃</S.LogOutButton>}
              </S.ButtonBox>
            </S.ButtonWrapper>
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

import React, { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Login, { userAtom, userEmailAtom } from '../user/login/Login';
import { getUserInfo, sigOutService } from '../../services/supabase/auth';
import icon from '../../image/icon.png';
import * as S from './Styled.Header';

import type { UserType, UserTypes } from '../../types/supabase';

import { supabase } from '../../services/supabase/supabase';
import { sosialUserAtom } from '../user/social/SosialLogin';

export const jotaiUserDataAtom = atom<Omit<UserTypes, 'password'> | null>(null);

const Header = () => {
  const queryClient = useQueryClient();
  const [loginModal, setLoginModal] = useState(false);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const [user, setUser] = useAtom(userAtom);
  const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [jotaiUserData, setJotaiUserData] = useAtom(jotaiUserDataAtom);
  const [socialUser, setSocialUser] = useAtom(sosialUserAtom);
  console.log('user', user);
  console.log('socialUser', socialUser);

  console.log('jotaiUserData', jotaiUserData);
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
      setSocialUser(null);
      setUser(null); // userData 초기화
      setUserEmail('');
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  // 이메일 로그인 토큰 생성 => jotaiUserData
  useEffect(() => {
    if (userData) {
      const userDataString = JSON.stringify(userData);
      localStorage.setItem('jotaiUserData', userDataString);
      setJotaiUserData(userData);
    }
  }, [userData]);

  // 소셜 로그인 토큰 생성 => jotaiUserData
  useEffect(() => {
    if (!socialUser?.identities) {
      return;
    } else if (socialUser?.identities[0].provider !== 'email') {
      const tokenKey = localStorage.getItem('sb-bbakvkybkyfoiijevbec-auth-token');
      const parsedToken = tokenKey ? JSON.parse(tokenKey) : null;

      const userId = parsedToken?.user.id;
      const userName = parsedToken?.user.user_metadata.name;
      const userEmail = parsedToken?.user.email;

      const userInsertData = {
        uid: userId,
        nickname: userName,
        profileimg: 'neverdelete/461839d7-4ae5-4981-a29c-7793179d98ac.jpeg',
        email: userEmail,
        password: ''
      };
      const userDataString = JSON.stringify(userInsertData);
      localStorage.setItem('jotaiUserData', userDataString);
      setJotaiUserData(userInsertData);
    }
  }, [socialUser]);

  // 생성한 토큰 가져와서 새로고침 방지
  useEffect(() => {
    const storedUserData = localStorage.getItem('jotaiUserData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setJotaiUserData(parsedUserData);

      queryClient.invalidateQueries(['users', userEmail]);
    }
  }, []);

  // 현재 유저의 정보 가져오기
  const checkUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    setSocialUser(user);
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
            <S.ButtonWrapper>
              <S.ButtonBox>
                <S.ToggleButton onClick={toggleLogoutButton}>▼</S.ToggleButton>
                {showLogoutButton && (
                  <>
                    <S.LogOutButton onClick={signOutHandler}>로그아웃</S.LogOutButton>
                    <S.LinkButton to="/mypage">마이페이지</S.LinkButton>
                    <S.PostLinkButton to="/post">글작성</S.PostLinkButton>
                  </>
                )}
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

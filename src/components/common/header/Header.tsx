import React, { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Login, { userAtom, userEmailAtom } from '../../user/login/Login';
import { sosialUserAtom } from '../../user/social/SosialLogin';
import { getUserInfo, sigOutService } from '../../../services/supabase/auth';

import { supabase } from '../../../services/supabase/supabase';
import { useNavigate } from 'react-router';

import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';

import icon from '../../../image/icon.png';
import * as S from './Styled.Header';
import * as SL from '../Styled.Loading';
import Search from '../search/Search';
import { useLocation } from 'react-router-dom';

import type { UserType, UserTypes } from '../../../types/supabase';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const jotaiUserDataAtom = atom<Omit<UserTypes, 'password'> | null>(null);
export const usersAtom = atom<Array<{ nickname: string; email: string }>>([]);

const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loginModal, setLoginModal] = useState(false);
  const location = useLocation();

  const [user, setUser] = useAtom(userAtom);
  const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [jotaiUserData, setJotaiUserData] = useAtom(jotaiUserDataAtom);
  const [socialUser, setSocialUser] = useAtom(sosialUserAtom);
  console.log('user', user);
  console.log('socialUser', socialUser);
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
      navigate('/');
      setLoginModal(true);
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
    }
  }, []);

  // 현재 유저의 정보 가져오기!!
  const checkUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.identities) {
      return;
    } else if (user?.identities[0].provider == 'github' || user?.identities[0].provider == 'google') {
      setSocialUser(user);
    }
  };

  // window.addEventListener('hashchange' =>브라우저의 URL 해시(예: # 뒤의 일부)가 변경될 때 발생!
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

  // 안트 디자인 드롭박스
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/post">
          <div>상품 등록하기</div>
        </Link>
      )
    },
    {
      key: '2',
      label: (
        <Link to="/mypage">
          <div>마이페이지</div>
        </Link>
      )
    },
    {
      key: '3',
      label: <div onClick={signOutHandler}>로그아웃</div>
    }
  ];

  if (isLoading) {
    return <SL.LoadingOverlay />;
  }

  if (isError) {
    return <div>데이터를 불러오는 동안 오류가 발생했습니다</div>;
  }

  return (
    <>
      <S.HeaderContainer>
        <S.Logo src={icon} onClick={() => navigate('/')} />

        {location.pathname === '/' && <Search />}
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
                  <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                    <DownOutlined />
                  </Dropdown>
                </S.ButtonBox>
              </S.ButtonWrapper>
            </S.ProfileWrapper>
          ) : (
            <S.LoginButton onClick={showModal}>Login</S.LoginButton>
          )}

          {loginModal && <Login setLoginModal={setLoginModal} />}
        </div>
      </S.HeaderContainer>
      <S.Line></S.Line>
    </>
  );
};

export default Header;

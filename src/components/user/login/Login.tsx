import React, { useState } from 'react';
import { atom, useAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SignUp from '../signUp/SignUp';
import { loginService } from '../../../services/supabase/auth';
import * as S from './Styled.Login';

import type { UserType } from '../../../types/supabase';
import PasswordReset from './PasswordReset';
import SosialLogin from '../social/SosialLogin';

type LoginType = {
  setLoginModal: (isOpen: boolean) => void;
};
export const userAtom = atom<Omit<UserType, 'nickname'> | null>(null);
export const signUpModalAtom = atom<boolean>(false);
export const userEmailAtom = atom('');

const Login = ({ setLoginModal }: LoginType) => {
  // 초기 UserData
  const initialUserData = {
    uid: '',
    email: '',
    password: '',
    profileimg: null
  };
  const queryClient = useQueryClient();

  const [user, setUser] = useAtom(userAtom);
  const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [userData, setUserData] = useState<Omit<UserType, 'nickname'>>({
    uid: '',
    email: '',
    password: '',
    profileimg: null
  });

  // 로그인 뮤테이션
  const loginMutation = useMutation(loginService, {
    onSuccess: (response) => {
      setUser(userData);
      console.log(userData);
      setLoginModal(false);
      if (response) {
        setUserEmail(userData.email);
      }
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  // 로그인 핸들러
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    try {
      const response = await loginMutation.mutateAsync(userData);
      if (!response) {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        return;
      } else {
        setLoginModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [signUpModal, setSignUpModal] = useAtom(signUpModalAtom);

  // 회원가입 모달 열기
  const showSignUpModal = () => {
    setSignUpModal(true);
  };
  // 로그인 모달 닫기
  const closeLoginModal = () => {
    setLoginModal(false);
    setUserData(initialUserData);
  };

  // email onchange 핸들러
  const emailInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: e.target.value });
  };

  // password onchange 핸들러
  const passwordInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: e.target.value });
  };

  console.log(user);
  console.log(userEmail);

  return (
    <S.Container>
      <S.CloseBtn onClick={closeLoginModal}>x</S.CloseBtn>
      <S.Wrapper>
        <S.Title>로그인</S.Title>
        <S.Line1></S.Line1>
        <S.InputContainer>
          <S.FormBox onSubmit={loginHandler}>
            <S.EmailBox type="text" value={userData.email} onChange={emailInputChangeHandler} placeholder="Email" />
            <S.PasswordBox
              type="password"
              value={userData.password}
              onChange={passwordInputChangeHandler}
              placeholder="Password"
            />
            <S.LoginBtn>로그인</S.LoginBtn>
          </S.FormBox>
          <S.ModalBox>
            <S.SignUpBtn onClick={showSignUpModal}>회원가입</S.SignUpBtn>
            {signUpModal && <SignUp setSignUpmodal={setSignUpModal} setLoginModal={setLoginModal} />}
            <PasswordReset />
          </S.ModalBox>
          <SosialLogin />
        </S.InputContainer>
      </S.Wrapper>
    </S.Container>
  );
};

export default Login;

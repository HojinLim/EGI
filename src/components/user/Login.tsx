import React, { useState } from 'react';
import { atom, useAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SignUp from './SignUp';
import { loginService } from '../../services/supabase/auth';
import * as S from './Styled.Login';

import type { UserType } from '../../types/supabase';
// import { supabase } from '../../services/supabase';
// import ResetPasswordModal from './ResetPassword';

type LoginType = {
  setLoginModal: (isOpen: boolean) => void;
};

export const userAtom = atom<Omit<UserType, 'nickname'> | null>(null);
export const signUpModalAtom = atom<boolean>(false);
export const userEmailAtom = atom('');

const Login = ({ setLoginModal }: LoginType) => {
  const queryClient = useQueryClient();
  const [, setUserEmail] = useAtom(userEmailAtom);
  const [, setUser] = useAtom(userAtom);
  const [signUpModal, setSignUpModal] = useAtom(signUpModalAtom);
  const [userData, setUserData] = useState<Omit<UserType, 'nickname'>>({
    uid: '',
    email: '',
    password: '',
    profileimg: null
  });

  const initialUserData = {
    uid: '',
    email: '',
    password: '',
    profileimg: null
  };
  // 회원가입 모달 열기
  const showSignUpModal = () => {
    setSignUpModal(true);
  };
  // 로그인 모달 닫기
  const closeLoginModal = () => {
    setLoginModal(false);
    setUserData(initialUserData);
  };

  const loginMutation = useMutation(loginService, {
    onSuccess: () => {
      setUser(userData);
      console.log(userData);
      setLoginModal(false);
      setUserEmail(userData.email);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

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
        setLoginModal(true);
      } else {
        setLoginModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emailInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const passwordInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: e.target.value });
  };

  return (
    <S.Container>
      <S.CloseBtn onClick={closeLoginModal}>x</S.CloseBtn>
      <S.Wrapper>
        <S.InputContainer>
          <S.FormBox onSubmit={loginHandler}>
            <S.EmailBox type="text" value={userData.email} onChange={emailInputChangeHandler} placeholder="Email" />
            <S.PasswordBox
              type="password"
              value={userData.password}
              onChange={passwordInputChangeHandler}
              placeholder="Password"
            />
            <S.LoginBtn>Login</S.LoginBtn>
          </S.FormBox>
        </S.InputContainer>
        {/* <button onClick={resetPasswordHandler}> 비밀번호 찾기</button>
        {resetPasswordModal && (
          <ResetPasswordModal closeResetPasswordModal={() => setResetPasswordModal(false)} email={email} />
        )} */}
        <S.SignUpBtn onClick={showSignUpModal}>회원가입</S.SignUpBtn>
        {signUpModal && <SignUp setSignUpmodal={setSignUpModal} setLoginModal={setLoginModal} />}
      </S.Wrapper>
    </S.Container>
  );
};

export default Login;

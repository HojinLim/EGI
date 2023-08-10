import React, { useState } from 'react';
import styled from 'styled-components';
import SignUp from './SignUp';
import { atom, useAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginService } from '../../services/supabase/auth';
import type { UserType } from '../../types/supabase';
// import { supabase } from '../../services/supabase';
// import ResetPasswordModal from './ResetPassword';

type LoginType = {
  setLoginModal: (isOpen: boolean) => void;
};

export const userAtom = atom<Omit<UserType, 'nickname' | 'profileImg'> | null>(null);
export const signUpModalAtom = atom<boolean>(false);
export const userEmailAtom = atom('');

const Login = ({ setLoginModal }: LoginType) => {
  const queryClient = useQueryClient();
  const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [, setUser] = useAtom(userAtom);
  const [signUpModal, setSignUpModal] = useAtom(signUpModalAtom);
  const [userData, setUserData] = useState<Omit<UserType, 'nickname' | 'profileImg'>>({
    uid: '',
    email: '',
    password: ''
  });
  // 회원가입 모달 열기
  const showSignUpModal = () => {
    setSignUpModal(true);
  };
  // 로그인 모달 닫기
  const closeLoginModal = () => {
    setLoginModal(false);
  };

  const loginMutation = useMutation(loginService, {
   
    onSuccess: () => {
      setUser(userData);
      console.log(userData)
      setLoginModal(false);
      setUserEmail(userData.email);
      console.log('유저 데이터 이메일>' + userData.email);
      queryClient.invalidateQueries({ queryKey: ['users'] });

      console.log('유저 이메일>' + userEmail);
    }
  });

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loginMutation.mutate(userData);
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
    <Container>
      <CloseBtn onClick={closeLoginModal}>x</CloseBtn>
      <Wrapper>
        <InputContainer>
          <form onSubmit={loginHandler}>
            <EmailBox
              type="text"
              value={userData.email}
              onChange={emailInputChangeHandler}
              placeholder="Email"
            ></EmailBox>
            <PasswordBox
              type="password"
              value={userData.password}
              onChange={passwordInputChangeHandler}
              placeholder="Password"
            ></PasswordBox>
            <LoginBtn>Login</LoginBtn>
          </form>
        </InputContainer>
        {/* <button onClick={resetPasswordHandler}> 비밀번호 찾기</button>
        {resetPasswordModal && (
          <ResetPasswordModal closeResetPasswordModal={() => setResetPasswordModal(false)} email={email} />
        )} */}
        <button onClick={showSignUpModal}>회원가입하기</button>
        {signUpModal && <SignUp setSignUpmodal={setSignUpModal} setLoginModal={setLoginModal} />}
      </Wrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 400px;

  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmailBox = styled.input`
  width: 170px;
  height: 30px;

  margin: 10px;
`;

const PasswordBox = styled.input`
  width: 170px;
  height: 30px;
  margin: 10px;
`;

const LoginBtn = styled.button`
  width: 130px;
  height: 30px;
`;

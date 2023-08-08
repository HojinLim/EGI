import React, { useState } from 'react';
import styled from 'styled-components';

import SignUp from './SignUp';
import { atom, useAtom } from 'jotai';
import { supabase } from '../../service/superbase';
import { useQueryClient, useMutation } from '@tanstack/react-query';

interface UserType {
  uid: number;
  email: string;
  password: string;
}

type LoginType = {
  setLoginModal: (isOpen: boolean) => void;
};

export const userAtom = atom<UserType | null>(null);
export const signUpModalAtom = atom<boolean>(false);

const Login = ({ setLoginModal }: LoginType) => {
  const queryClient = useQueryClient();
  const [, setUser] = useAtom(userAtom);
  const [signUpModal, setSignUpModal] = useAtom(signUpModalAtom);
  const [userData, setUserData] = useState<UserType>({
    uid: 0,
    email: '',
    password: ''
  });

  const showSignUpModal = () => {
    setSignUpModal(true);
  };

  const closeLoginModal = () => {
    setLoginModal(false);
  };

  const loginMutation = useMutation(
    async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password
      });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [userData] });
        setUser(userData);
      }
    }
  );

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loginMutation.mutate();
      setLoginModal(false);
    } catch (error) {
      console.error(error);
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

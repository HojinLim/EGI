import React from 'react';
import styled from 'styled-components';

type LoginType = {
  setModalOpen: (isOpen: boolean) => void;
};

const Login = ({ setModalOpen }: LoginType) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <CloseBtn onClick={closeModal}>x</CloseBtn>
      <Wapper>
        <InputContainer>
          <EmailBox></EmailBox>
          <PasswordBox></PasswordBox>
        </InputContainer>
        <LoginBtn>Login</LoginBtn>
      </Wapper>
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

const Wapper = styled.div`
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

  /* margin: 10px; */
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

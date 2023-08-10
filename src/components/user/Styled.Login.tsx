import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 450px;
  height: 550px;

  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 8px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EmailBox = styled.input`
  width: 170px;
  height: 30px;

  margin: 10px;
  border: 1px solid black;
  border-radius: 6px;
`;

export const PasswordBox = styled.input`
  width: 170px;
  height: 30px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 6px;
`;

export const LoginBtn = styled.button`
  width: 130px;
  height: 40px;

  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px 15px;
`;

export const SignUpBtn = styled.button`
  width: 100px;
  height: 35px;
  margin: 10px;

  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px 15px;
`;

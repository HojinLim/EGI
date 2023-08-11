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

export const Title = styled.p`
  padding: 15px;
  font-size: 20px;
`;

export const Line1 = styled.div`
  border-bottom: 1px solid black;
  width: 250px;

  margin-bottom: 30px;
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
  width: 220px;
  height: 30px;

  margin: 10px;
  border: 1px solid black;
  border-radius: 6px;
`;

export const PasswordBox = styled.input`
  width: 220px;
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
  cursor: pointer;

  margin-top: 20px;
`;

export const ModalBox = styled.div`
  background-color: translate;
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15px 0 0 2px;
`;

export const SignUpBtn = styled.button`
  border: none;

  background-color: transparent;
  font-size: 6px;
  cursor: pointer;

  margin-right: 5px;
`;

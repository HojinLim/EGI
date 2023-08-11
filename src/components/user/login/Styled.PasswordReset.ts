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

export const EmailInput = styled.input`
  margin: 30px 5px;
  border: 1px solid black;
  border-radius: 4px;
  width: 170px;
  height: 30px;
`;

export const SendEmailBtn = styled.button`
  border-radius: 7px;
  border-none;
  height: 35px;
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const PasswordResetBtn = styled.button`
  border: none;

  background-color: transparent;
  font-size: 6px;

  margin-bottom: 3px;
  cursor: pointer;
`;

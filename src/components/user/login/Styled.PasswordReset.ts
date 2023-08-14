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

  height: 35px;

  border: 2px solid #0a3a8d;

  background-color: transparent;

  color: #0a3a8d;

  &:hover {
    background-color: #0a3a8d1f;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 15px;
  top: 10px;

  border: 2px solid #ffffff;

  background-color: transparent;

  color: #0a3a8d;
  font-size: 25px;
`;

export const PasswordResetBtn = styled.button`
  border: none;

  background-color: transparent;
  font-size: 6px;

  margin-bottom: 3px;
  cursor: pointer;
`;

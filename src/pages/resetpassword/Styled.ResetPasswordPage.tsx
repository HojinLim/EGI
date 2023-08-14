import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 400px;
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

export const HomeBtn = styled.button`
  position: absolute;
  right: 15px;
  top: 5px;

  border: 2px solid #ffffff;

  background-color: transparent;

  color: #0a3a8d;
  font-size: 25px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputBox = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

export const PasswordInput = styled.input`
  margin: 15px 5px 0px 5px;
  border: 1px solid black;
  border-radius: 4px;
  width: 170px;
  height: 30px;
`;

export const PwdUpdateBtn = styled.button`
  border-radius: 5px;
  border: 2px solid #0a3a8d;
  width: 170px;
  height: 30px;
  /* height: 35px; */

  background-color: transparent;

  color: #0a3a8d;

  margin-top: 13px;

  &:hover {
    background-color: #0a3a8d1f;
  }
`;

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
  right: 10px;
  top: 10px;
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
  border-none;
  width: 170px;
  height: 30px;
  /* height: 35px; */

  margin-top: 13px
`;

import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 700px;
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

export const Title = styled.p`
  padding: 15px;
  font-size: 20px;
`;

export const Line1 = styled.div`
  border-bottom: 1px solid black;
`;

export const Wapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 15px;
  top: 5px;

  border: 2px solid #ffffff;

  background-color: transparent;

  color: #0a3a8d;
  font-size: 25px;
`;

export const InputWrapper = styled.div`
  margin: 20px;
  text-align: center;
`;

export const EmailBox = styled.div`
  display: flex;
  align-items: center;

  margin: 5px;
`;

export const Text = styled.text`
  color: red;
  font-size: 1px;
`;

export const EmailLabel = styled.div`
  flex: 0 0 100px;
`;

export const EmailInput = styled.input`
  border: 1px solid black;
  width: 250px;
  height: 30px;
  border-radius: 6px;

  margin-left: 25px;
`;

export const CheckEmailBtn = styled.button`
  width: 120px;
  height: 32px;

  border-radius: 6px;
  border: 2px solid #0a3a8d;
  margin-left: 15px;
  padding: 10px;

  background-color: transparent;

  color: #0a3a8d;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #0a3a8d1f;
  }
`;

export const PasswordBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

export const PasswordLabel = styled.div`
  flex: 0 0 60px;
  margin-right: 40px;
`;

export const PasswordInput = styled.input`
  border: 1px solid black;
  width: 210px;
  height: 30px;
  border-radius: 6px;
  margin-right: 118px;
`;

export const PasswordConfirmBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

export const PasswordConfirmLabel = styled.div`
  flex: 0 0 90px;
  margin-right: 10px;
`;

export const PasswordConfirmInput = styled.input`
  border: 1px solid black;
  width: 210px;
  height: 30px;
  border-radius: 6px;
  margin-right: 118px;
`;

export const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 7px;
`;

export const NicknameLabel = styled.div`
  flex: 0 0 80px;
  margin-right: 36px;
`;

export const NicknameInput = styled.input`
  border: 1px solid black;
  width: 245px;
  height: 30px;
  border-radius: 6px;
  margin-right: 118px;
`;

export const ProfileImgnameBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-right: 355px;
`;

export const ProfileImgLabel = styled.div`
  flex: 0 0 120px;
`;

export const Label = styled.label`
  font-size: 25px;
  margin-left: 1px;
`;

export const ProfileImgInput = styled.input`
  /* border: 1px solid black; */
  /* width: 260px; */
  /* border-radius: 6px; */
  display: none;
`;

export const SignUpBtn = styled.button`
  margin-top: 30px;
  border: 2px solid #0a3a8d;
  border-radius: 6px;

  width: 120px;
  height: 32px;

  background-color: transparent;

  color: #0a3a8d;
  cursor: pointer;
  &:hover {
    background-color: #0a3a8d1f;
  }
`;

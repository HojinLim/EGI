import { styled } from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

export const Logo = styled.img`
  max-width: 50px;
  max-height: 50px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const ProfileImg = styled.img`
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
  /* border: 1px solid #aaa9a9; */
`;

export const NickName = styled.div`
  margin-left: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ButtonBox = styled.div`
  position: relative;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 11px;
  cursor: pointer;
  margin-left: 10px;
`;

export const LogOutButton = styled.button`
  position: absolute;
  top: 140%;
  left: -40%;
  z-index: 1;

  background-color: transparent;

  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px 10px;

  width: 70px;
  font-size: 10px;
`;

export const LoginButton = styled.button`
  background-color: transparent;

  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px 15px;
`;

import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  margin-top: 15px;
`;

export const Logo = styled.img`
  max-width: 180px;
  max-height: 180px;

  cursor: pointer;
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
  border-radius: 70%;
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
  margin-left: 20px;
`;

export const LogOutButton = styled.button`
  position: absolute;
  top: 140%;
  left: -40%;
  top: 500%;
  left: 0;
  z-index: 1;

  background-color: transparent;

  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px 10px;

  width: 70px;
  font-size: 10px;
  padding: 10px 15px;
  margin-top: 5px;
`;

export const LoginButton = styled.button`
  background-color: transparent;

  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px 15px;

  width: 100px;
  height: 50px;
`;

export const LinkButton = styled(Link)`
  position: absolute;
  /* width: 100px; */
  top: 300%;
  left: 0;
  z-index: 1;

  background-color: transparent;

  width: 70px;
  font-size: 10px;
  padding: 10px 15px;

  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px 15px;
  text-decoration: none;
  color: #333333;
  margin-top: 5px;
`;

export const PostLinkButton = styled(Link)`
  position: absolute;
  width: 100px;
  top: 100%;
  left: 0;
  z-index: 1;

  background-color: transparent;

  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px 15px;
  text-decoration: none;
  color: #333333;
  margin-top: 5px;
`;
export const Line = styled.div`
  border-bottom: 1px solid black;

  margin-bottom: 30px;
`;

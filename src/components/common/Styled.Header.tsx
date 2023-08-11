import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

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
`;

export const NickName = styled.div`
  margin-left: 10px;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ToggleButtonWrapper = styled.div`
  position: relative;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
`;

export const LogoutButton = styled.button`
  position: absolute;
  width: 100px;
  top: 500%;
  left: 0;
  z-index: 1;

  background-color: transparent;

  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px 15px;
  margin-top: 5px;
`;

export const LoginButton = styled.button`
  background-color: transparent;

  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px 15px;
`;

export const LinkButton = styled(Link)`
  position: absolute;
  width: 100px;
  top: 300%;
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

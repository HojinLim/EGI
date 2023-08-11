import { styled } from 'styled-components';

export const MypageContainer = styled.div`
  display: flex;
  margin: 100px 0 50px 200px;
`;

export const ProfileBox = styled.div`
  display: flex;
`;

export const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid black;
`;

export const ProfileInfo = styled.div`
  margin: 40px 35px;
`;

export const NickNameBox = styled.div`
  display: flex;
  font-weight: bold;

  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const EditNickName = styled.p`
  /* font-size: 30px; */

  font-weight: bold;
`;

export const InputNickName = styled.input`
  width: 150px;
  height: 20px;
  font-weight: bold;

  margin-left: 5px;

  border-radius: 5px;
`;

export const NickName = styled.p`
  font-size: 30px;
  font-weight: bold;
`;
export const Email = styled.p`
  font-size: 13px;
  margin: 8px 8px 8px 0;
  color: #8f8f8f;
`;

export const EditBtn = styled.button`
  margin: 10px 10px 0 0;

  width: 100px;
  height: 35px;

  border: 2px solid black;
  background-color: transparent;
  border-radius: 10px;

  font-size: 16px;
  padding: 5px;

  cursor: pointer;
`;

export const EditProfile = styled.div`
  margin-bottom: 70px;
`;

export const EditProfileLabel = styled.label`
  display: inline-block;
  justify-content: center;
  align-items: center;

  display: flex;

  padding: 5px;
  width: 90px;
  height: 22px;
  font-size: 16px;

  background-color: #ffffff;
  border: 2px solid #000000;
  border-radius: 10px;
  cursor: pointer;

  margin: 0 0 50px 25px;
`;

export const EditProfileInput = styled.input`
  display: none;
`;

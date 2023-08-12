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
  border: 2px solid #0a398d;
`;

export const ProfileInfo = styled.div`
  margin: 40px 35px;
`;

export const NickNameBox = styled.div`
  display: flex;
  font-weight: bold;
  color: #0a398d;

  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const EditNickName = styled.p`
  /* font-size: 30px; */
  color: #0a398d;
  font-weight: bold;
`;

export const InputNickName = styled.input`
  width: 150px;
  height: 20px;
  font-weight: bold;
  color: #0a398d;

  margin-left: 5px;

  border-radius: 5px;
`;

export const NickName = styled.p`
  font-size: 30px;
  font-weight: bold;
  /* color: #0a398d; */
`;
export const Email = styled.p`
  font-size: 14px;
  margin: 8px 8px 8px 3px;
  color: #8f8f8f;
`;

export const EditBtn = styled.button`
  margin: 10px 10px 0 0;

  width: 100px;
  height: 35px;

  border: 2px solid #0a398d;
  background-color: transparent;
  border-radius: 10px;

  color: #0a398d;
  font-weight: bold;
  font-size: 16px;
  padding: 5px;

  cursor: pointer;
`;

export const EditProfile = styled.div`
  margin-bottom: 70px;
  color: #0a398d;
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
  font-weight: bold;
  color: #0a398d;

  background-color: #ffffff;
  border: 2px solid #0a398d;
  border-radius: 10px;
  cursor: pointer;

  margin: 0 0 50px 25px;
`;

export const EditProfileInput = styled.input`
  display: none;
`;

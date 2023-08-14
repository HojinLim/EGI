import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
export const Line = styled.div`
  margin-top: 10px;
  border-top: 1px solid #c2c2c274;
`;

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
`;

export const ProfileContainer = styled.div`
  display: flex;
`;

export const ProfileBox = styled.div`
  width: 50px;
  height: 50px;
`;
export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const TextBox = styled.div`
  margin-left: 15px;

  padding: 5px;
`;

export const Name = styled.div`
  font-weight: bold;
  color: #0a3a8d;
`;

export const Body = styled.div`
  margin-top: 10px;

  width: 1080px;
`;
export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const Button = styled.div`
  margin-top: 7px;

  border: none;
  background-color: transparent;

  font-size: 25px;
  padding: 10px 0px 10px 20px;
  color: #0a3a8d;
  cursor: pointer;
`;

export const EditText = styled.textarea`
  width: 1080px;
  height: 80px;
`;

export const ReplyBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 25px;
  &:hover {
    color: #0a3a8d;
  }
  cursor: pointer;
`;

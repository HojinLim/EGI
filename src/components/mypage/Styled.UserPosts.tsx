import { styled } from 'styled-components';

interface ButtonProps {
  selected: boolean;
}
export const MyWrittenPost = styled.button`
  padding: 5px;

  margin: 0 15px 15px 0;

  width: 80px;
  height: 40px;

  font-size: 14px;
  font-weight: bold;
  color: #0a398d;

  border: 2px solid #0a398d;
  border-radius: 5px;

  background-color: transparent;

  cursor: pointer;
`;

export const MyZzimPost = styled.button`
  padding: 5px;

  width: 80px;
  height: 40px;

  font-size: 14px;
  font-weight: bold;
  color: #0a398d;
  border: 2px solid #0a398d;
  border-radius: 5px;

  background-color: transparent;

  cursor: pointer;
`;

export const CardContainer = styled.div`
  width: 1200px;
  height: 725px;
  /* border: 2px solid #0a398d; */
  border-radius: 5px;
`;

export const CardBox = styled.ul`
  list-style: none;
`;

export const Card = styled.li`
  display: flex;

  height: 151px;
  padding: 8px;
  margin-bottom: 10px;

  border: 2px solid #0a398d;
  border-radius: 5px;
  transition: background-color 0.2s;

  cursor: pointer;
  /* &:hover {
    background-color: #f0f0f0;
  } */
`;
export const PostImg = styled.img`
  width: 170px;
  hegiht: 120px;
  /* border: 1px solid black; */
  border-radius: 5px;
`;

export const NonImg = styled.img`
  width: 170px;
  hegiht: 120px;
  border: 1px solid black;
  border-radius: 5px;
`;

export const PageButtonBox = styled.div`
  margin-top: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageButton = styled.button<ButtonProps>`
  margin: 4px;
  padding: 8px 14px;

  border: 2px solid #0a398d;
  border-radius: 5px;

  background-color: ${(props) => (props.selected ? '#0a398d' : '#ffffff')};
  color: ${(props) => (props.selected ? '#ffffff' : '#0a398d')};

  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

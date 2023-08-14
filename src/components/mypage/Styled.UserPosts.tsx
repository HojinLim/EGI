import { styled } from 'styled-components';

interface ButtonProps {
  selected: boolean;
}
interface ConditionProps {
  condition: string;
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

  &:hover {
    background-color: #0a3a8d1f;
  }
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

  &:hover {
    background-color: #0a3a8d1f;
  }
`;

export const CardContainer = styled.div`
  width: 1200px;
  /* height: 725px; */
  /* border: 2px solid #0a398d; */
  border-radius: 5px;
`;

export const CardBox = styled.ul`
  list-style: none;
`;

export const Card = styled.li`
  display: flex;

  height: 163px;
  padding: 10px;
  margin-bottom: 10px;

  border: 2px solid #0a398d;
  border-radius: 5px;
  transition: background-color 0.2s;

  cursor: pointer;
  /* &:hover {
    background-color: #f0f0f0;
  } */
`;

export const NonImg = styled.img`
  width: 170px;
  hegiht: 120px;
  border: 1px solid black;
  border-radius: 5px;
`;

export const PostImg = styled.img`
  width: 170px;
  hegiht: 120px;
  /* border: 1px solid black; */
  border-radius: 5px;
`;

export const CardInfo = styled.div`
  width: 1000px;
  margin: 5px 5px 5px 15px;
  display: flex;
  flex-direction: column;
`;
export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const CategoryBox = styled.div`
  display: flex;
`;
export const Category = styled.div`
  margin-right: 10px;
  /* border: 1px solid black; */
  text-align: center;
`;
export const Nickname = styled.div`
  font-size: 15px;
`;
export const CoditionBox = styled.div`
  display: flex;
`;
export const CoditionIscompleted = styled.div`
  width: 70px;

  padding: 6px;
  text-align: center;

  border: none;
  font-size: 15px;
  background-color: #0084ff4c;
  color: #0085ff;
  border-radius: 5px;

  margin-right: 15px;
`;
export const CoditionProduct = styled.div<ConditionProps>`
  width: 70px;

  padding: 5px;
  text-align: center;

  border: none;
  font-size: 15px;
  background-color: ${(props) => (props.condition == '미개봉' ? '#F0F7F4' : '#F7F0F0')};
  color: ${(props) => (props.condition == '미개봉' ? '#44B355' : '#FF0000')};
  border-radius: 5px;
`;
export const CardMiddle = styled.div`
  margin: 5px 0 5px 0;
`;
export const Title = styled.div`
  font-size: 30px;
`;
export const CardBottom = styled.div`
  margin-top: 65px;
  display: flex;
  justify-content: space-between;
`;

export const Price = styled.div`
  font-size: 30px;
  margin-bottom: 35px;
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

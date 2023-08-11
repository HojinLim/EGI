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

  border: 2px solid black;
  border-radius: 5px;

  background-color: transparent;

  cursor: pointer;
`;

export const MyZzimPost = styled.button`
  padding: 5px;

  width: 80px;
  height: 40px;

  border: 2px solid black;
  border-radius: 5px;

  background-color: transparent;

  cursor: pointer;
`;

export const Card = styled.ul`
  list-style: none;
  padding: 5px;
  /* height: 15px; */
`;

export const StyledCard = styled.li`
  height: 115px;

  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const StyledButton = styled.button<ButtonProps>`
  margin: 4px;
  padding: 8px 16px;
  border: none;
  background-color: ${(props) => (props.selected ? 'yellow' : '#f0f0f0')};
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

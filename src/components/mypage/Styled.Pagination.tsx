import { styled } from 'styled-components';

export const CardList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const StyledCard = styled.li`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

import styled from 'styled-components';

export const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export const PostItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  width: 150px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

export const Image = styled.img`
  /* max-width: 100%;
  max-height: 100%; */
  object-fit: contain;

  width: 100px;
  height: 100px;
`;

export const EndMessage = styled.div`
  text-align: center;
  padding: 10px;
  color: gray;
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열로 설정 */
  grid-gap: 10px;
  margin: 20px;
`;

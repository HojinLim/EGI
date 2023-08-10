import styled from 'styled-components';

export const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const Container = styled.div`
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  overflow: hidden;
`;

export const MainContainer = styled.div`
  display: flex;
`;

export const CarouselContainer = styled.div`
  width: 500px;
  margin-right: 20px;
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const EditDeleteButtons = styled.div`
  margin-top: 10px;
  button {
    margin-right: 10px;
  }
`;

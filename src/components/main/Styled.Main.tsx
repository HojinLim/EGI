import styled from 'styled-components';
import Button from '@mui/material/Button';
export const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  align-items: center;
`;
export const PostItem = styled.div`
  border: 1px solid #0a398d;
  padding: 10px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;
export const Image = styled.img`
  object-fit: contain;
  width: 100%;
  /* height: 80%; */
  aspect-ratio: 1;
`;
export const Container = styled.div`
  margin: 0 auto;
  overflow: hidden;
  margin-top: 50px;
`;
export const MainContainer = styled.div`
  display: flex;
`;
export const CarouselContainer = styled.div`
  width: 50%;
  height: 100%;
  padding-right: 20px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
export const ContentsContainer = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  border-left: 1px solid #ddd;
`;
export const EditDeleteButtons = styled.div`
  margin-top: 10px;
  button {
    margin-right: 10px;
  }
`;
export const PostTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;
export const Price = styled.h1`
  font-size: 20px;
  color: green;
  margin-bottom: 10px;
`;
export const PostInfo = styled.p`
  font-size: 14px;
  color: gray;
  margin-bottom: 10px;
`;
export const PostBody = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  p {
    margin: 10px 0;
  }
`;
export const StyledButton = styled(Button)`
  && {
    background-color: gray;
    color: white;
    font-size: 13px;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #0056b3;
    }
  }
`;
export const RoundedCheckboxWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;
export const CustomCheckbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-right: 8px;
  outline: none;
  cursor: pointer;
  /* &:checked {
    background-color: #007BFF;
    border-color: #007BFF;
  } */
`;
export const CheckboxLabel = styled.label`
  cursor: pointer;
`;
export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;
export const ModalContent = styled.div`
  background-color: skyblue;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
export const ModalCloseBtn = styled.button`
  margin-bottom: 20px;
  margin-left: 625px;
  /* display: flex;
  justify-content: flex-end; */
  /* margin-left: auto; */
  background-color: transparent;
  border: none;
`;
export const EndMessage = styled.div`
  text-align: center;
  padding: 10px;
  color: gray;
`;
export const CategoryButton = styled.button`
  margin: 2px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 100px;
  cursor: pointer;
`;
export const CategoryButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열로 설정 */
  grid-gap: 20px;
  width: 1200px;
  margin: 20px;
  margin-left: 150px;
  margin-top: 80px;
  margin-bottom: 80px;
`;
export const ImageContainer = styled.div`
  height: 350px;
`;
export const CardCategory = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;
export const CardTitle = styled.div`
  /* white-space: nowrap; */
  overflow: hidden;
  height: 17px;
  text-overflow: ellipsis;
`;
export const CardLocation = styled.div``;
export const CardPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
`;
export const CardCondition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

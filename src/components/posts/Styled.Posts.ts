import styled from 'styled-components';
import Button from '@mui/material/Button';

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
    background-color: #007bff;
    border-color: #007bff;
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
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const EndMassage = styled.div`
  text-align: center;
  padding: 10px;
  color: gray;
`;

export const CategoryButton = styled.button`
  margin: 0;
  padding: 6px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
`;

export const CategoryButtonContainer = styled.div`
  display: flex;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 2px;
`;
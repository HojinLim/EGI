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
  margin: 2px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 100px;
  cursor: pointer;
`;

export const CategoryButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 40px;
`;

export const MainTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  padding: 40px;

  color: #0a3a8d;
`;

export const TopLine = styled.div`
  width: 1000px;

  border-top: 1px solid black;
`;

export const Wrapper = styled.div``;

export const TitleBox = styled.div`
  padding: 50px 25px;
`;
export const Title = styled.label`
  font-size: 20px;
  margin-right: 108px;
`;

export const TitleInput = styled.input`
  width: 800px;
  height: 30px;
  border-radius: 5px;
`;

export const LocalBox = styled.div`
  padding: 50px 15px;
`;

export const Local = styled.label`
  font-size: 20px;
  margin-right: 79px;
`;

export const LocalInput = styled.input`
  width: 800px;
  height: 30px;
  border-radius: 5px;
`;

export const ConditonBox = styled.div`
  padding: 50px 15px;
`;

export const Conditon = styled.label`
  font-size: 20px;
  margin-right: 115px;
`;

export const ExChangeBox = styled.div`
  padding: 50px 15px;
`;

export const ExChange = styled.label`
  font-size: 20px;
  margin-right: 76px;
`;

export const DirectBox = styled.div`
  padding: 50px 15px;
`;

export const Direct = styled.label`
  font-size: 20px;
  margin-right: 60px;
`;

export const PriceBox = styled.div`
  padding: 50px 15px;
  display: flex;
`;

// export const Price = styled.label`
//   font-size: 20px;
//   margin-right: 122px;
// `;

export const PriceWrapper = styled.div``;

export const PriceInput = styled.input`
  margin-right: 7px;
  width: 200px;
  height: 30px;
  border-radius: 5px;

  text-align: right;
`;

export const ParcelBox = styled.div`
  margin-top: 15px;
`;

export const ParcelInput = styled.input``;

export const Parcel = styled.label`
  font-size: 20px;
`;

export const CategoryBox = styled.div`
  padding: 50px 15px;
`;

export const Category = styled.label`
  font-size: 20px;
  margin-right: 85px;
`;

export const IscompletedBox = styled.div`
  padding: 50px 15px;
`;

export const IscompletedCheck = styled.label`
  font-size: 20px;
  margin-right: 76px;
`;

export const IscompletedInput = styled.input``;

export const Iscompleted = styled.label`
  font-size: 20px;
  margin-right: 85px;
`;

export const EditorBox = styled.div`
  font-size: 30px;
  margin: 60px 0 300px 0;

  position: relative;
`;

export const FileLabel = styled.label`
  position: absolute;
  top: 3%;
  right: 48%;

  display: inline-block;
  justify-content: center;
  align-items: center;

  display: flex;

  font-size: 16px;
  font-weight: bold;

  cursor: pointer;

  margin: 0 0 50px 25px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const WriterBtn = styled.button`
  position: absolute;
  top: 115%;
  right: 0%;

  padding: 15px 25px;

  border: 2px solid #0a398d;

  border-radius: 5px;

  background-color: transparent;
  color: #0a398d;

  cursor: pointer;

  &:hover {
    background-color: #0a3a8d1f;
  }
`;

export const Line = styled.div`
  width: 1000px;

  border-top: 1px solid black;
`;

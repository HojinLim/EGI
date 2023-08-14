import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  overflow: hidden;
  margin-top: 100px;

  max-width: 1200px;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const CarouselBox = styled.div`
  width: 600px;
  height: 700px;

  padding-right: 20px;
  border-right: 1px solid #ddd;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  margin-right: 20px;

  positon: absolute;
`;

export const PostImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const PostBox = styled.div``;

export const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileImg = styled.img`
  max-width: 30px;
  max-height: 30px;
  border-radius: 70%;
`;

export const Nickname = styled.div`
  margin-left: 5px;
  font-size: 17px;
`;

export const FeatBtnBox = styled.div``;

export const FeatBtns = styled.div``;
export const FeatBtn = styled.button`
  margin-left: 15px;
  cursor: pointer;

  background-color: transparent;
  border-radius: 5px;
  border: none;

  font-size: 25px;
  color: #0a3a8d;
`;

export const TitleBox = styled.div`
  margin: 30px 0 8px 0;

  width: 600px;
`;

export const Title = styled.div`
  font-size: 26px;

  font-weight: bold;
`;

export const CategoryBox = styled.div`
  margin: 5px 0 5px 0;
`;

export const Category = styled.label`
  margin-left: 10px;
  color: #b0b0b0;
`;

export const Time = styled.label`
  margin-left: 5px;
  color: #b0b0b0;
`;
export const BodyBox = styled.div`
  max-width: 600px;
`;
export const Body = styled.div`
  margin-top: 40px;
  white-space: normal;
  height: 180px;

  overflow-y: scroll;
`;

export const Line = styled.div`
  border: 1px solid #b0b0b03c;
`;

export const DetailInfoBox = styled.div`
  margin-top: 20px;
`;

export const ShareBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 20px;
  font-size: 25px;
  cursor: pointer;
  color: #0a3a8d;
`;

export const DeclarationBtn = styled.div`
  font-size: 24px;

  border: none;
  background-color: transparent;

  margin-left: 20px;
  cursor: pointer;
`;

export const DetailInfo = styled.div`
  margin-left: 5px;
`;

export const ConditionBox = styled.div`
  color: #b0b0b0;
  display: flex;

  padding: 5px;
`;
export const Condition = styled.label`
  color: black;
  margin-left: 20px;
`;

export const ExchangeBox = styled.div`
  color: #b0b0b0;
  display: flex;
  padding: 5px;
`;
export const Exchange = styled.label`
  color: black;
  margin-left: 20px;
`;

export const ParcelBox = styled.div`
  color: #b0b0b0;
  display: flex;
  padding: 5px;
`;
export const Parcel = styled.label`
  color: black;
  margin-left: 34px;
`;
export const DirectBox = styled.div`
  color: #b0b0b0;
  display: flex;
  padding: 5px;
`;
export const Direct = styled.label`
  color: black;
  margin-left: 34px;
`;
export const LocationBox = styled.div`
  color: #b0b0b0;
  display: flex;
  padding: 5px;
`;

export const Location = styled.label`
  color: black;
  margin-left: 20px;
`;

export const Price = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 25px;
  font-size: 30px;
  font-weight: bold;
`;

export const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 9px;
`;

export const Btn = styled.button`
  padding: 15px 50px;

  width: 200px;
  margin: 28px;

  border: 2px solid #0a3a8d;
  border-radius: 10px;

  background-color: transparent;

  color: #0a3a8d;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #0a3a8d1f;
  }
`;

export const ModalContainer = styled.div``;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 350px;
  height: 500px;

  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 8px;
`;

export const ModalContent = styled.div`
  width: 400px;
  height: 300px;
  padding: 20px;
  border-radius: 5px;

  margin-bottom: 80px;
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Editor from './editor/Editor';

import * as S from './Styled.Post';
import { categories, conditionCategories, directCategories, exchangeCategories } from '../category/Category';
import { handleImageChange } from '../../hooks/useHandleImage';
import { supabase } from '../../services/supabase/supabase';
import { CategoryRadio } from '../category/CategorySelect';

import { jotaiUserDataAtom } from '../common/header/Header';
import { useAtom } from 'jotai';
import { PictureOutlined } from '@ant-design/icons';

const Post = () => {
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [category, setCategory] = useState('');
  const [conditionCategory, setConditionCategory] = useState('');
  const [exchangeCategory, setExchangeCategory] = useState('');
  const [parcelCategorySelected, setParcelCategorySelected] = useState(false);
  const [direct, setDirect] = useState('');
  const [uid, setUid] = useState('');
  const [jotaiUserData] = useAtom(jotaiUserDataAtom);
  useEffect(() => {
    // userDataAtom의 값을 로컬 스토리지에서 가져오기
    const userData = localStorage.getItem('jotaiUserData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUid(parsedUserData.uid);
    }
  }, []);

  const handleAddPost = async () => {
    if (
      !newTitle.trim() ||
      !newBody.trim() ||
      !newLocation.trim() ||
      !newPrice.toString().trim() ||
      !category ||
      !conditionCategory ||
      !exchangeCategory ||
      !direct
    ) {
      alert('모든 폼을 입력해주세요.');
      return;
    }

    const imageUrls: string[] = [];

    for (const selectedImage of selectedImages) {
      const { data, error } = await supabase.storage.from('1st').upload(`images/${selectedImage.name}`, selectedImage);

      if (error) {
        console.error('Error uploading image to Supabase storage:', error);
        alert('이미지 업로드 중 에러가 발생했습니다!');
        return;
      }

      imageUrls.push(data.path);
    }

    if (imageUrls.length === 0) {
      alert('이미지를 업로드해주세요');
      return;
    }

    const { error: insertError } = await supabase.from('posts').insert([
      {
        title: newTitle,
        nickname: jotaiUserData?.nickname,
        body: newBody,
        profileimg: jotaiUserData?.profileimg,
        image_urls: imageUrls,
        price: newPrice,
        location: newLocation,
        category: category,
        condition: conditionCategory,
        exchange: exchangeCategory,
        parcel: parcelCategorySelected ? '택배비 포함' : '택배비 미포함',
        uid,
        iscompleted: '판매중',
        direct
      }
    ]);

    if (insertError) {
      console.error('Error adding post:', insertError);
      alert('에러가 발생했습니다!');
      return;
    }

    setNewTitle('');
    setNewBody('');
    setNewPrice('');
    setNewLocation('');
    setSelectedImages([]);

    alert('글 작성이 완료되었습니다.');
    navigate(`/`);
  };

  const handleImageChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const updatedSelectedImages = handleImageChange(selectedFiles);
      setSelectedImages(updatedSelectedImages);
    }
  };

  const priceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    setNewPrice(inputValue);
  };

  const priceWithCommas = (price: string): string => {
    const numberOfPrice = Number(price);
    return numberOfPrice.toLocaleString();
  };

  return (
    <S.Container>
      <S.MainTitle>상품 등록</S.MainTitle>
      <S.TopLine></S.TopLine>
      <S.Wrapper>
        <S.TitleBox>
          <S.Title>제목</S.Title>
          <S.TitleInput type="text" placeholder="" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        </S.TitleBox>
        <S.Line></S.Line>
        <S.LocalBox>
          <S.Local>거래 지역</S.Local>
          <S.LocalInput
            type="text"
            placeholder=""
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </S.LocalBox>
        <S.Line></S.Line>
        <S.CategoryBox>
          <S.Category>카테고리</S.Category>
          {categories.map((categoryOption) => (
            <CategoryRadio
              key={categoryOption.value}
              value={categoryOption.value}
              label={categoryOption.label}
              checked={categoryOption.value === category}
              onChange={() => setCategory(categoryOption.value)}
            />
          ))}
        </S.CategoryBox>
        <S.Line></S.Line>
        <S.ConditonBox>
          <S.Conditon>상태</S.Conditon>
          {conditionCategories.map((conditionCategoryOption) => (
            <CategoryRadio
              key={conditionCategoryOption.value}
              value={conditionCategoryOption.value}
              label={conditionCategoryOption.label}
              checked={conditionCategoryOption.value === conditionCategory}
              onChange={() => setConditionCategory(conditionCategoryOption.value)}
            />
          ))}
        </S.ConditonBox>
        <S.Line></S.Line>
        <S.ExChangeBox>
          <S.ExChange> 교환 여부</S.ExChange>
          {exchangeCategories.map((exchangeCategoryOption) => (
            <CategoryRadio
              key={exchangeCategoryOption.value}
              value={exchangeCategoryOption.value}
              label={exchangeCategoryOption.label}
              checked={exchangeCategoryOption.value === exchangeCategory}
              onChange={() => setExchangeCategory(exchangeCategoryOption.value)}
            />
          ))}
        </S.ExChangeBox>
        <S.Line></S.Line>
        <S.DirectBox>
          <S.Direct> 직거래 여부</S.Direct>
          {directCategories.map((directOption) => (
            <CategoryRadio
              key={directOption.value}
              value={directOption.value}
              label={directOption.label}
              checked={directOption.value === direct}
              onChange={() => setDirect(directOption.value)}
            />
          ))}
        </S.DirectBox>
        <S.Line></S.Line>
        <S.PriceBox>
          <S.Price>가격</S.Price>
          <S.PriceWrapper>
            <S.PriceInput
              type="text"
              placeholder="Price"
              value={priceWithCommas(newPrice)}
              onChange={priceChangeHandler}
            />
            <label>원</label>
            <S.ParcelBox>
              <S.ParcelInput
                type="checkbox"
                value="택배비 포함"
                checked={parcelCategorySelected}
                onChange={() => setParcelCategorySelected(!parcelCategorySelected)}
              />
              <label>택배비 포함</label>
            </S.ParcelBox>
          </S.PriceWrapper>
        </S.PriceBox>
        <S.Line></S.Line>

        <S.Line></S.Line>
        <S.EditorBox>
          <Editor value={newBody} onChange={(content) => setNewBody(content)} />
          <S.FileLabel htmlFor="file-input">
            <PictureOutlined />
          </S.FileLabel>
          <S.FileInput id="file-input" type="file" accept="image/*" multiple onChange={handleImageChangeWrapper} />
          <S.WriterBtn onClick={handleAddPost}>등록하기</S.WriterBtn>
        </S.EditorBox>
      </S.Wrapper>
    </S.Container>
  );
};

export default Post;

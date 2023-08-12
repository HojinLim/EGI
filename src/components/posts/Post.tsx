import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Editor from '../editor/Editor';

import * as S from './Styled.Post';
import { categories, conditionCategories, directCategories, exchangeCategories } from '../category/Category';
import { handleImageChange } from './HandleImage';
import { supabase } from '../../services/supabase/supabase';
import { CategoryRadio } from '../category/CategorySelect';

import { jotaiUserDataAtom } from '../common/Header';
import { useAtom } from 'jotai';

const Post = () => {
  // const [user] = useAtom(userAtom); // userAtom의 값을 가져옴

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
      <S.Title>상품 등록</S.Title>
      <S.TopLine></S.TopLine>
      <div>
        <label>제목</label>
        <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <S.Line></S.Line>
        <label>거래 지역</label>
        <input
          type="text"
          placeholder="Location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <S.Line></S.Line>
        <div>
          <label>상태</label>
          {conditionCategories.map((conditionCategoryOption) => (
            <CategoryRadio
              key={conditionCategoryOption.value}
              value={conditionCategoryOption.value}
              label={conditionCategoryOption.label}
              checked={conditionCategoryOption.value === conditionCategory}
              onChange={() => setConditionCategory(conditionCategoryOption.value)}
            />
          ))}
        </div>
        <S.Line></S.Line>
        <div>
          <label> 교환 여부</label>
          {exchangeCategories.map((exchangeCategoryOption) => (
            <CategoryRadio
              key={exchangeCategoryOption.value}
              value={exchangeCategoryOption.value}
              label={exchangeCategoryOption.label}
              checked={exchangeCategoryOption.value === exchangeCategory}
              onChange={() => setExchangeCategory(exchangeCategoryOption.value)}
            />
          ))}
        </div>
        <S.Line></S.Line>
        <div>
          <label> 직거래 여부</label>
          {directCategories.map((directOption) => (
            <CategoryRadio
              key={directOption.value}
              value={directOption.value}
              label={directOption.label}
              checked={directOption.value === direct}
              onChange={() => setDirect(directOption.value)}
            />
          ))}
        </div>
        <S.Line></S.Line>
        <label>가격</label>
        <div>
          <div>
            <input type="text" placeholder="Price" value={priceWithCommas(newPrice)} onChange={priceChangeHandler} />
            <input
              type="checkbox"
              value="택배비 포함"
              checked={parcelCategorySelected}
              onChange={() => setParcelCategorySelected(!parcelCategorySelected)}
            />
            <label>원</label>
          </div>

          <div>택배비 포함</div>
        </div>

        <S.Line></S.Line>
        <div>
          <label>카테고리</label>
          {categories.map((categoryOption) => (
            <CategoryRadio
              key={categoryOption.value}
              value={categoryOption.value}
              label={categoryOption.label}
              checked={categoryOption.value === category}
              onChange={() => setCategory(categoryOption.value)}
            />
          ))}
        </div>
        <S.Line></S.Line>
        <Editor value={newBody} onChange={(content) => setNewBody(content)} />
        <input type="file" accept="image/*" multiple onChange={handleImageChangeWrapper} />
        <button onClick={handleAddPost}>글 작성하기</button>
      </div>
    </S.Container>
  );
};

export default Post;

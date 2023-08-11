import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Editor from '../editor/Editor';

import { categories, conditionCategories, exchangeCategories, parcelCategories } from '../category/Category';
import { handleImageChange } from './HandleImage';
import { supabase } from '../../services/supabase/supabase';
import { CategoryRadio } from '../category/CategorySelect';
import { Link } from 'react-router-dom';

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
  const [parcelCategory, setParcelCategory] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    // userDataAtom의 값을 로컬 스토리지에서 가져오기
    const userData = localStorage.getItem('jotaiUserData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUid(parsedUserData.uid);
    }
  }, []);

  const handleAddPost = async () => {
    if (!newTitle.trim() || !newBody.trim() || !newPrice.trim() || !newLocation.trim()) {
      alert('제목, 본문, 가격, 지역을 모두 입력해주세요.');
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
        body: newBody,
        image_urls: imageUrls,
        price: newPrice,
        location: newLocation,
        category: category,
        condition: conditionCategory,
        exchange: exchangeCategory,
        parcel: parcelCategory,
        uid
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

  return (
    <div>
      <div>
        <Link to={'/'}>HOME</Link>
        <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <br />
        <input type="number" placeholder="Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
        <br />
        <input
          type="text"
          placeholder="Location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <br />

        <div>
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
        <div>
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
        <div>
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
        <div>
          {parcelCategories.map((parcelCategoryOption) => (
            <CategoryRadio
              key={parcelCategoryOption.value}
              value={parcelCategoryOption.value}
              label={parcelCategoryOption.label}
              checked={parcelCategoryOption.value === parcelCategory}
              onChange={() => setParcelCategory(parcelCategoryOption.value)}
            />
          ))}
        </div>

        <br />
        <Editor value={newBody} onChange={(content) => setNewBody(content)} />
        <br />
        <br />
        <br />
        <br />
        <input type="file" accept="image/*" multiple onChange={handleImageChangeWrapper} />
        <button onClick={handleAddPost}>글 작성하기</button>
      </div>
    </div>
  );
};

export default Post;

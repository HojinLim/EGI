import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Editor from '../editor/Editor';

import { categories } from '../category/Category';
import { handleImageChange } from './HandleImage';
import { supabase } from '../../services/supabase/supabase';

const Post = () => {
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [category, setCategory] = useState('');

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
        category: category
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

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">카테고리 선택</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

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

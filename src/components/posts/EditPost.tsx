import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '../editor/Editor';

import { handleImageChange } from './HandleImage';
import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';
import { categories, conditionCategories, exchangeCategories, parcelCategories } from '../category/Category';
import CategorySelect from '../category/CategorySelect';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [conditionCategory, setConditionCategory] = useState('');
  const [exchangeCategory, setExchangeCategory] = useState('');
  const [parcelCategory, setParcelCategory] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const { data: posts, error } = await supabase.from('posts').select('*').eq('pid', id).single();
      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(posts);
        setEditTitle(posts.title);
        setEditBody(posts.body);
        setLocation(posts.location);
        setPrice(posts.price);
        setCategory(posts.category);
        setConditionCategory(posts.condition);
        setExchangeCategory(posts.exchange);
        setParcelCategory(posts.parcel);
      }
    };

    fetchPost();
  }, [id]);

  const handleEditPost = async () => {
    if (!editTitle.trim() || !editBody.trim()) {
      alert('제목과 본문을 모두 입력해주세요.');
      return;
    }

    let imageUrls: string[] = post ? post.image_urls : []; // 기존 이미지 유지

    if (selectedImages.length > 0) {
      const newImageUrls: string[] = [];

      for (const selectedImage of selectedImages) {
        const { data, error } = await supabase.storage
          .from('1st')
          .upload(`images/${selectedImage.name}`, selectedImage);

        if (error) {
          console.error('Error uploading image to Supabase storage:', error);
          alert('이미지 업로드 중 에러가 발생했습니다!');
          return;
        }

        newImageUrls.push(data.path);
      }

      imageUrls = newImageUrls;
    }

    if (post && editTitle && editBody) {
      const { error } = await supabase
        .from('posts')
        .update({ title: editTitle, body: editBody, image_urls: imageUrls, price, location, category })
        .eq('pid', post.pid);

      if (error) {
        console.error('Error editing post:', error);
        alert('에러가 발생했습니다!');
      } else {
        alert('글 수정이 완료되었습니다.');
        navigate(-1);
      }
    }
  };

  const handleImageChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const updatedSelectedImages = handleImageChange(selectedFiles);
      setSelectedImages(updatedSelectedImages);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input type="text" placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
      <br />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <br />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <br />

      <CategorySelect
        value={category}
        options={categories}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
      />
      <CategorySelect
        value={conditionCategory}
        options={conditionCategories}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setConditionCategory(e.target.value)}
      />
      <CategorySelect
        value={exchangeCategory}
        options={exchangeCategories}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setExchangeCategory(e.target.value)}
      />
      <CategorySelect
        value={parcelCategory}
        options={parcelCategories}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setParcelCategory(e.target.value)}
      />

      <br />

      <Editor value={editBody} onChange={(content) => setEditBody(content)} />
      <br />
      <br />
      <br />
      <br />
      <input type="file" accept="image/*" multiple onChange={handleImageChangeWrapper} />
      <button onClick={handleEditPost}>수정하기</button>
    </div>
  );
};

export default EditPost;

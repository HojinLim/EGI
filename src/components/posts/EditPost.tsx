import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '../editor/Editor';
import { v4 as uuidv4 } from 'uuid';

import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  useEffect(() => {
    async function fetchPost() {
      const { data: posts, error } = await supabase.from('posts').select('*').eq('pid', id).single();
      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(posts);
        setEditTitle(posts.title);
        setEditBody(posts.body);
      }
    }

    fetchPost();
  }, [id]);

  const handleEditPost = async () => {
    if (!editTitle.trim() || !editBody.trim()) {
      alert('제목과 본문을 모두 입력해주세요.');
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

    if (post && editTitle && editBody) {
      const { error } = await supabase
        .from('posts')
        .update({ title: editTitle, body: editBody, image_urls: imageUrls })
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const updatedSelectedImages: File[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const selectedFile = selectedFiles[i];
        const originalFileName = selectedFile.name;
        const fileExtension = originalFileName.split('.').pop();
        const randomFileName = uuidv4() + '.' + (fileExtension || 'jpg');

        updatedSelectedImages.push(new File([selectedFile], randomFileName));
      }

      setSelectedImages(updatedSelectedImages);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input type="text" placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
      <Editor value={editBody} onChange={(content) => setEditBody(content)} />
      <br />
      <br />
      <br />
      <br />
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <button onClick={handleEditPost}>수정하기</button>
    </div>
  );
};

export default EditPost;

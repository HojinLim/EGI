import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Editor from '../editor/Editor';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

interface Post {
  pid: number;
  title: string;
  body: string;
}

const Post = () => {
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState('');
  const [newbody, setNewBody] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleAddPost = async () => {
    if (!newTitle.trim() || !newbody.trim()) {
      alert('제목과 본문을 모두 입력해주세요.');
      return;
    }

    if (selectedImage) {
      const { data, error } = await supabase.storage.from('1st').upload(`images/${selectedImage.name}`, selectedImage);

      if (error) {
        console.error('Error uploading image to Supabase storage:', error);
        alert('이미지 업로드 중 에러가 발생했습니다!');
        return;
      }

      const imageUrl = data.path;

      const { error: insertError } = await supabase
        .from('posts')
        .insert([{ title: newTitle, body: newbody, image_url: imageUrl }]);
      if (insertError) {
        console.error('Error adding post:', insertError);
        alert('에러가 발생했습니다!');
        return;
      }
    }

    setNewTitle('');
    setNewBody('');
    setSelectedImage(null);
    alert('글 작성이 완료되었습니다.');
    navigate(`/`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const originalFileName = selectedFile.name;
      const fileExtension = originalFileName.split('.').pop();
      const randomFileName = uuidv4() + '.' + fileExtension;
      setSelectedImage(new File([selectedFile], randomFileName));
    }
  };

  return (
    <div>
      <div>
        <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <Editor value={newbody} onChange={(content) => setNewBody(content)} />

        <br />
        <br />
        <br />
        <br />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleAddPost}>글 작성하기</button>
      </div>
    </div>
  );
};

export default Post;

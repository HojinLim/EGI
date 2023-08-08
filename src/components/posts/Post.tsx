import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Editor from '../editor/Editor';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

interface Post {
  id: number;
  title: string;
  body: string;
}

const Post = () => {
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState('');
  const [newbody, setNewBody] = useState('');

  const handleAddPost = async () => {
    if (!newTitle.trim() || !newbody.trim()) {
      alert('제목과 본문을 모두 입력해주세요.');
      return;
    }

    if (newTitle && newbody) {
      const { error } = await supabase.from('posts').insert([{ title: newTitle, body: newbody }]);

      setNewTitle('');
      setNewBody('');
      if (error) {
        console.error('Error adding post:', error);
        alert('에러가 발생했습니다!');
      } else {
        alert('글 작성이 완료되었습니다.');
        navigate(`/`);
      }
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
        <button onClick={handleAddPost}>글 작성하기</button>
      </div>
    </div>
  );
};

export default Post;

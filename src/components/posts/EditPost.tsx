// EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Editor from '../editor/Editor';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

interface Post {
  pid: number;
  title: string;
  body: string;
}

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

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
  }, []);

  const handleEditPost = async () => {
    if (!editTitle.trim() || !editBody.trim()) {
      alert('제목과 본문을 모두 입력해주세요.');
      return;
    }

    if (post && editTitle && editBody) {
      const { error } = await supabase.from('posts').update({ title: editTitle, body: editBody }).eq('pid', post.pid);

      if (error) {
        console.error('Error editing post:', error);
        alert('에러가 발생했습니다!');
      } else {
        alert('글 수정이 완료되었습니다.');
        navigate(`/`);
      }
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
      <button onClick={handleEditPost}>수정하기</button>
    </div>
  );
};

export default EditPost;

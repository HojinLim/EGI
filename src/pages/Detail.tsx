import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Comments from '../components/comments/Comments';

import * as S from '../components/posts/Styled.Posts';
import { Post } from '../types/supabase';
import { supabase } from '../services/supabase/supabase';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data: posts, error } = await supabase.from('posts').select('*').eq('pid', id).single();
      if (error) {
        console.error('Error fetching post:', error);
      } else {
        const parsedImageUrls = JSON.parse(posts.image_urls);

        const detailedPost: Post = {
          ...posts,
          image_urls: parsedImageUrls
        };

        setPost(detailedPost);
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = () => {
    navigate(`/editpost/${post?.pid}`);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('posts').delete().eq('pid', post?.pid);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      alert('삭제 완료!');
      navigate(`/`);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>{post.title}</h2>
        <div>
          {post.image_urls.map((imageUrl, index) => (
            <S.Image
              key={index}
              src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${imageUrl}`}
              alt={`Image ${index}`}
              style={{ width: '250px', height: '250px' }}
            />
          ))}
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        <br />
        <button onClick={handleEdit}>수정하기</button>
        <button onClick={handleDelete}>삭제하기</button>
      </div>
      <Comments />
    </>
  );
};

export default Detail;

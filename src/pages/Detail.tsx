import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
    <S.Container>
      <S.MainContainer>
        <S.CarouselContainer>
          <Carousel>
            {post.image_urls.map((imageUrl, index) => (
              <div key={index}>
                <S.Image src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${imageUrl}`} alt={`Image ${index}`} />
              </div>
            ))}
          </Carousel>
        </S.CarouselContainer>
        <S.ContentsContainer>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
          <p>{post.price}</p>
          <p>{post.location}</p>
          <p>{post.category}</p>
          <S.EditDeleteButtons>
            <button onClick={handleEdit}>수정하기</button>
            <button onClick={handleDelete}>삭제하기</button>
          </S.EditDeleteButtons>
        </S.ContentsContainer>
      </S.MainContainer>
      <Comments />
    </S.Container>
  );
};

export default Detail;

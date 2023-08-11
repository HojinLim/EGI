import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { jotaiUserDataAtom } from '../components/common/Header';

import Comments from '../components/comments/Comments';
import * as S from '../components/posts/Styled.Posts';
import { Post } from '../types/supabase';
import { supabase } from '../services/supabase/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchJjimCount, toggleJjim } from '../services/supabase/jjim';
import { useAtom } from 'jotai';

// 작성자 딱지 > post의 uid props로 넘기기.

const Detail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [jotaiUserData] = useAtom(jotaiUserDataAtom);

  const { id } = useParams() as { id: string };
  const [post, setPost] = useState<Post | null>(null);

  const { data: jjimData } = useQuery(['jjim'], () => fetchJjimCount(id));

  const toggleJjimMutation = useMutation(toggleJjim, {
    onSuccess: () => {
      queryClient.invalidateQueries(['jjim']);
    },
    onError: (error) => {
      alert(`찜 업데이트 중 오류가 발생했습니다. : ${error}`);
    }
  });

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

  let timeAgo = '';
  if (post) {
    timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko });
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await supabase.auth.user();
  //     if (user) {
  //       setUserId(user.id);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const handleJjim = () => {
    if (!jotaiUserData) {
      alert('로그인 후 사용 가능합니다.');
      return;
    }

    const data = {
      uid: jotaiUserData.uid,
      pid: id
    };
    toggleJjimMutation.mutate(data);
  };
  return (
    <S.Container>
      <S.MainContainer>
        <S.CarouselContainer>
          <Carousel>
            {post.image_urls.map((imageUrl, index) => (
              <div key={index}>
                <div style={{ border: 'black solid 1px' }}>
                  <S.Image src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${imageUrl}`} alt={`Image ${index}`} />
                </div>
              </div>
            ))}
          </Carousel>
        </S.CarouselContainer>
        <S.ContentsContainer>
          <S.PostTitle>{post.title}</S.PostTitle>
          <S.Price>{post.price}원</S.Price>
          <S.PostInfo>
            {post.category} ⚪ {timeAgo}
          </S.PostInfo>
          <S.PostBody dangerouslySetInnerHTML={{ __html: post.body }} />
          <S.PostInfo>거래지역 {post.location}</S.PostInfo>
          <S.PostInfo>상품상태 {post.condition}</S.PostInfo>
          <S.PostInfo>배송비 {post.parcel}</S.PostInfo>
          <S.PostInfo>교환여부 {post.exchange}</S.PostInfo>
          <button onClick={handleJjim}>찜 {jjimData?.length}</button>
          {jotaiUserData?.uid === post.uid && (
            <S.EditDeleteButtons>
              <S.StyledButton onClick={handleEdit}>수정하기</S.StyledButton>
              <S.StyledButton onClick={handleDelete}>삭제하기</S.StyledButton>
            </S.EditDeleteButtons>
          )}
        </S.ContentsContainer>
      </S.MainContainer>
      <Comments />
    </S.Container>
  );
};

export default Detail;

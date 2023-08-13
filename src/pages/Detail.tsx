import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import { RequestPayParams } from 'iamport-typings';
import { jotaiUserDataAtom } from '../components/common/Header';
import { Post } from '../types/supabase';
import { supabase } from '../services/supabase/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchJjimCount, toggleJjim } from '../services/supabase/jjim';
import { useAtom } from 'jotai';
import CircularProgress from '@mui/material/CircularProgress';
import Payment from '../components/payment/payment';
import Comments from '../components/comments/comment/Comments';
import * as S from '../components/main/Styled.Main';
import Share from '../components/common/Share';
// import Chat from '../components/chat/Chat';

const Detail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [jotaiUserData] = useAtom(jotaiUserDataAtom);

  const { id } = useParams() as { id: string };
  const [post, setPost] = useState<Post | null>(null);

  const { data: jjimData } = useQuery(['jjim'], () => fetchJjimCount(id));
  // const [isChatOpen, setIsChatOpen] = useState(false);

  // const toggleChat = () => {
  //   setIsChatOpen(!isChatOpen);
  // };

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

  if (!post) {
    return (
      <div>
        Loading...
        <CircularProgress />
      </div>
    );
  }

  const handlePayment = (paymentInfo: RequestPayParams) => {
    // 파라미터 타입 명시
    const IMP = window.IMP;
    IMP?.request_pay(paymentInfo, function (response) {
      if (response?.success) {
        alert('결제가 완료되었습니다.');
      } else {
        alert('결제에 실패하였습니다.');
      }
    });
  };

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

  const openPaymentModal = () => {
    setPaymentModalVisible(true);
  };

  const closePaymentModal = () => {
    setPaymentModalVisible(false);
  };

  let timeAgo = '';
  if (post) {
    timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko });
  }

  if (!post) {
    return (
      <div>
        Loading...
        <CircularProgress />
      </div>
    );
  }

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
          <div>{post.nickname}</div>
          <S.PostTitle>{post.title}</S.PostTitle>
          <S.Price>{post.price?.toLocaleString('en-NZ')}원</S.Price>
          <S.PostInfo>
            {post.category} ⚪ {timeAgo}
          </S.PostInfo>
          <S.PostBody dangerouslySetInnerHTML={{ __html: post.body }} />
          <S.PostInfo>거래지역 {post.location}</S.PostInfo>
          <S.PostInfo>상품상태 {post.condition}</S.PostInfo>
          <S.PostInfo>배송비 {post.parcel}</S.PostInfo>
          <S.PostInfo>교환여부 {post.exchange}</S.PostInfo>
          <Share />
          <button onClick={handleJjim}>찜 {jjimData?.length}</button>

          {/* 여기가 페이먼트 가져오는 부분입니다! */}
          {/* 여기가 추가된 버튼입니다! */}

          <button onClick={openPaymentModal}>결제하기</button>

          {/* 모달 */}
          {paymentModalVisible && (
            <S.ModalWrapper>
              <S.ModalContent>
                <button onClick={closePaymentModal}>모달 닫기</button>
                <Payment handlePayment={handlePayment} post={post} />
              </S.ModalContent>
            </S.ModalWrapper>
          )}

          {jotaiUserData?.uid === post.uid && (
            <S.EditDeleteButtons>
              <S.StyledButton onClick={handleEdit}>수정하기</S.StyledButton>
              <S.StyledButton onClick={handleDelete}>삭제하기</S.StyledButton>.
              {/* <button onClick={toggleChat}>채팅하기</button>
              {isChatOpen && <Chat postId={post.pid.toString()} />} */}
            </S.EditDeleteButtons>
          )}
        </S.ContentsContainer>
      </S.MainContainer>
      <Comments />
    </S.Container>
  );
};

export default Detail;

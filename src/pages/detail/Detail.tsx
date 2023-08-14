import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import { RequestPayParams } from 'iamport-typings';
import { jotaiUserDataAtom } from '../../components/common/header/Header';
import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchJjimCount, toggleJjim } from '../../services/supabase/jjim';
import { useAtom } from 'jotai';
import CircularProgress from '@mui/material/CircularProgress';
import Payment from '../../components/payment/payment';
import Comments from '../../components/comments/comment/commentbody/Comments';
import * as S from './Styled.Detail';
import Share from '../../components/common/Share';
import { AlertFilled, DeleteFilled, EditFilled, LikeFilled } from '@ant-design/icons';

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
    if (!jotaiUserData) {
      alert('로그인 후 사용 가능합니다.');
      return;
    }
    setPaymentModalVisible(true);
  };

  const closePaymentModal = () => {
    setPaymentModalVisible(false);
  };

  let timeAgo = '';

  const declaration = () => {
    alert('신고는 112');
  };
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
      <S.Wrapper>
        <S.CarouselBox>
          <Carousel>
            {post.image_urls.map((imageUrl, index) => (
              <div key={index}>
                <S.PostImg src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${imageUrl}`} alt={`Image ${index}`} />
              </div>
            ))}
          </Carousel>
        </S.CarouselBox>
        <S.PostBox>
          <S.TopBox>
            <S.ProfileBox>
              <S.ProfileImg src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.profileimg}`} alt="Profile" />
              <S.Nickname>{post.nickname}</S.Nickname>
            </S.ProfileBox>
            <S.FeatBtnBox>
              {jotaiUserData?.uid === post.uid && (
                <S.FeatBtns>
                  <S.FeatBtn onClick={handleEdit}>
                    <EditFilled />
                  </S.FeatBtn>
                  <S.FeatBtn onClick={handleDelete}>
                    <DeleteFilled />
                  </S.FeatBtn>
                </S.FeatBtns>
              )}
            </S.FeatBtnBox>
          </S.TopBox>
          <S.TitleBox>
            <S.Title>{post.title}</S.Title>
          </S.TitleBox>
          <S.CategoryBox>
            <S.Category>{post.category}</S.Category>
            <S.Time> ∙ {timeAgo}</S.Time>
          </S.CategoryBox>
          <S.BodyBox>
            <S.Body dangerouslySetInnerHTML={{ __html: post.body }} />
          </S.BodyBox>

          <S.Line></S.Line>
          <S.ShareBox>
            <Share />
            <S.DeclarationBtn onClick={() => declaration()}>
              <AlertFilled />
            </S.DeclarationBtn>
          </S.ShareBox>
          <S.DetailInfoBox>
            <S.DetailInfo>
              <S.ConditionBox>
                ∙ 상품상태 <S.Condition>{post.condition}</S.Condition>
              </S.ConditionBox>
              <S.ExchangeBox>
                ∙ 교환여부 <S.Exchange>{post.exchange}</S.Exchange>
              </S.ExchangeBox>
              <S.ParcelBox>
                ∙ 택배비 <S.Parcel>{post.parcel}</S.Parcel>
              </S.ParcelBox>
              <S.DirectBox>
                ∙ 직거래 <S.Direct>{post.direct}</S.Direct>
              </S.DirectBox>
              <S.LocationBox>
                ∙ 거래지역 <S.Location>{post.location}</S.Location>
              </S.LocationBox>
            </S.DetailInfo>
            <S.Price>₩ {post.price?.toLocaleString('en-NZ')}원</S.Price>
          </S.DetailInfoBox>
          <S.BtnBox>
            <S.Btn onClick={handleJjim}>
              <LikeFilled /> {jjimData?.length}
            </S.Btn>
            {post.iscompleted == '판매 완료' ? (
              <S.Btn>판매 완료</S.Btn>
            ) : (
              <S.Btn onClick={openPaymentModal}>결제하기</S.Btn>
            )}

            <S.ModalContainer>
              {paymentModalVisible && (
                <S.ModalWrapper>
                  {' '}
                  <S.CloseBtn onClick={closePaymentModal}>x</S.CloseBtn>
                  <S.ModalContent>
                    <Payment handlePayment={handlePayment} post={post} />
                  </S.ModalContent>
                </S.ModalWrapper>
              )}
            </S.ModalContainer>
          </S.BtnBox>
        </S.PostBox>
      </S.Wrapper>
      <Comments />
    </S.Container>
  );
};

export default Detail;

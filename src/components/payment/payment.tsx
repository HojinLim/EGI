import React, { useEffect } from 'react';
import { RequestPayParams } from 'iamport-typings';
import { Post } from '../../types/supabase';
import { useAtom } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';
import { userEmailAtom } from '../user/login/Login';
import { jotaiUserDataAtom } from '../common/header/Header';
import { styled } from 'styled-components';
import kakao from '../../image/kakaopay.png';
import inicis from '../../image/Inicis.png';
import toss from '../../image/tosspay.png';
interface PaymentProps {
  handlePayment: (paymentInfo: RequestPayParams) => void;
  post: Post;
}

const Payment: React.FC<PaymentProps> = ({ handlePayment, post }) => {
  const [jotaiUserData, setJotaiUserData] = useAtom(jotaiUserDataAtom);
  const [userEmail] = useAtom(userEmailAtom);
  const queryClient = useQueryClient();

  // 생성한 토큰 가져와서 새로고침 방지
  useEffect(() => {
    const storedUserData = localStorage.getItem('jotaiUserData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setJotaiUserData(parsedUserData);

      queryClient.invalidateQueries(['users', userEmail]);
    }
  }, []);

  // 결제 모듈 초기화
  useEffect(() => {
    const IMP = window.IMP;
    const impKey = process.env.REACT_APP_IMP_KEY;

    if (impKey) {
      IMP?.init(impKey);
    } else {
      console.error('키가 없습니다.');
    }
  }, []);

  const handlePaymentClick = (pg: string, post: Post) => {
    if (!post) {
      console.error('Post is not available.');
      return;
    }

    const paymentInfo: RequestPayParams = {
      pg: pg,
      pay_method: 'card',
      merchant_uid: 'merchant_' + new Date().getTime(),
      name: post.title,
      amount: post.price || 0,
      buyer_name: post.nickname,
      buyer_tel: '010-1234-5678',
      buyer_email: jotaiUserData?.email || ''
    };

    handlePayment(paymentInfo);
  };

  return (
    <BtnBox>
      <Btn1 onClick={() => handlePaymentClick('kakaopay', post)}>
        <Img src={kakao} />
      </Btn1>
      <Btn onClick={() => handlePaymentClick('tosspay', post)}>
        <Img src={toss} />
      </Btn>
      <Btn onClick={() => handlePaymentClick('inicis', post)}>
        <Img src={inicis} />
      </Btn>
    </BtnBox>
  );
};

export default Payment;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;

  /* margin: 0 auto; */

  /* width: 10px; */

  margin: 0 120px 50px 120px;
`;

const Btn = styled.button`
  margin-top: 30px;
  width: 170px;
  height: 60px;

  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Btn1 = styled.button`
  margin-top: 30px;
  width: 170px;
  height: 100px;

  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

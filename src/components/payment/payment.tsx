import React, { useEffect } from 'react';
import { RequestPayParams } from 'iamport-typings';
import { Post } from '../../types/supabase';
import { useAtom } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';
import { userEmailAtom } from '../user/login/Login';
import { jotaiUserDataAtom } from '../common/Header';

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
    <div>
      <button onClick={() => handlePaymentClick('kakaopay', post)}>카카오페이 결제</button>
      <button onClick={() => handlePaymentClick('inicis', post)}>이니시스 결제</button>
      <button onClick={() => handlePaymentClick('tosspay', post)}>토스페이 결제</button>
    </div>
  );
};

export default Payment;

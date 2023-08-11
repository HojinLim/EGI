import React, { useState } from 'react';
import { supabase } from '../../../services/supabase/supabase';
import * as S from './Styled.PasswordReset';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  // 비밀번호 재설정 모달 열기
  const openPasswordResetModal = () => {
    setShowPasswordResetModal(true);
  };
  // 비밀번호 재설정 모달 닫기
  const closePasswordResetModal = () => {
    setShowPasswordResetModal(false);
  };

  // 비밀번호 재설정 이메일 전송 핸들러
  const resetPasswordHandler = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/resetPassword'
      });

      if (!error) {
        alert('비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해주세요.');
        closePasswordResetModal();
      } else {
        console.error(error);
        alert('비밀번호 재설정 이메일을 전송하는 도중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {showPasswordResetModal ? (
        <S.Container>
          <S.Wrapper>
            <h2>비밀번호 재설정</h2>
            <div>
              <S.EmailInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <S.SendEmailBtn onClick={resetPasswordHandler}>이메일 보내기</S.SendEmailBtn>
            </div>
            `<S.CloseBtn onClick={closePasswordResetModal}>x</S.CloseBtn>
          </S.Wrapper>
        </S.Container>
      ) : (
        <S.PasswordResetBtn onClick={openPasswordResetModal}>비밀번호 찾기</S.PasswordResetBtn>
      )}
    </div>
  );
};

export default PasswordReset;

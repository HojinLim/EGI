import React, { useState } from 'react';
import { supabase } from '../services/supabase/supabase';
import * as S from '../pages/Styled.ResetPasswordPage';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 비밀번호 재설정 업데이트 핸들러
  const updatePasswordHandler = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (!error) {
        alert('비밀번호가 성공적으로 업데이트되었습니다!');
        setNewPassword('');
        setConfirmPassword('');
        window.location.href = '/';
      } else {
        console.error(error);
        alert('비밀번호 업데이트 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const backToTheHome = () => {
    window.location.href = '/';
  };

  return (
    <S.Container>
      <S.HomeBtn onClick={backToTheHome}>🏠</S.HomeBtn>
      <S.Wrapper>
        <h2>비밀번호 재설정</h2>
        <S.Wrapper>
          <S.PasswordInput
            type="password"
            placeholder="새로운 비밀번호 입력"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <S.PasswordInput
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <S.PwdUpdateBtn onClick={updatePasswordHandler}>비밀번호 업데이트</S.PwdUpdateBtn>
        </S.Wrapper>
      </S.Wrapper>
    </S.Container>
  );
};

export default ResetPasswordPage;

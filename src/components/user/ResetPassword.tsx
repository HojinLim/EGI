// ResetPasswordModal.tsx
import React, { useState } from 'react'; // Import useState
import styled from 'styled-components';
import { resetPassword } from '../../services/supabase/auth';

type ResetPasswordModalProps = {
  closeResetPasswordModal: () => void;
  email: string;
};

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ closeResetPasswordModal, email }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const resetPasswordHandler = async () => {
    if (!email) {
      alert('이메일을 입력해주세요');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await resetPassword(email);
      alert('비밀번호 리셋에 성공하였습니다. 이메일을 확인해주세요!');
      closeResetPasswordModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>Reset Password</h2>
        <p>Enter your new password and confirm it.</p>
        <EmailInput type="text" value={email} readOnly placeholder="Your Email" />
        <PasswordInput
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <PasswordInput
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirm New Password"
        />
        <ButtonContainer>
          <CancelButton onClick={closeResetPasswordModal}>Cancel</CancelButton>
          <ResetButton onClick={resetPasswordHandler}>Reset Password</ResetButton>
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  /* Styles for modal container */
`;

const ModalContent = styled.div`
  /* Styles for modal content */
`;
const EmailInput = styled.input`
  /* Styles for password input */
`;

const PasswordInput = styled.input`
  /* Styles for password input */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  /* Styles for cancel button */
`;

const ResetButton = styled.button`
  /* Styles for reset password button */
`;

export default ResetPasswordModal;

import React, { useState } from 'react';
import useCommentMutation from '../../hooks/useCommentMutation';
import baseProfile from '../../image/baseprofile.jpeg';
import * as S from './Styled.Comments';
import { jotaiUserDataAtom } from '../common/Header';
import { useAtom } from 'jotai';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface CommentFormProps {
  pid: string;
}

const CommentForm = ({ pid }: CommentFormProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const { addCommentMutation } = useCommentMutation();
  const [commentText, setCommentText] = useState('');

  const [jotaiUserData] = useAtom(jotaiUserDataAtom);

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };
  const handleAddSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jotaiUserData) {
      alert('로그인 후 사용 가능합니다.');

      return;
    }

    if (commentText === '') {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        console.log('Alert hidden');
      }, 3000);
      return false
    }

    const newComment = {
      uid: jotaiUserData.uid,
      pid: Number(pid),
      nickname: jotaiUserData.nickname,
      body: commentText,
      created_at: new Date().toISOString(),
      profileimg: jotaiUserData.profileimg
    };

    addCommentMutation.mutate(newComment);
    setCommentText('');
  };

  return (
    <S.CommentForm onSubmit={handleAddSubmitBtn}>
      {showAlert && (
        <Stack sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 100 }}>
          <Alert severity="error">댓글을 작성해 주세요.</Alert>
        </Stack>
      )}
      <S.CommentItem>
        <S.CommentProfileImgBox>
          <S.CommentProfileImg
            src={
              jotaiUserData?.profileimg
                ? `${process.env.REACT_APP_SUPABASE_STORAGE_URL}${jotaiUserData?.profileimg}`
                : baseProfile
            }
            alt="Profile"
          />
        </S.CommentProfileImgBox>
        <S.CommentInput type="text" value={commentText} onChange={handleCommentInputChange} />
        <S.CommentPanel>
          <S.Button width="50px" height="30px">
            등록
          </S.Button>
        </S.CommentPanel>
      </S.CommentItem>
    </S.CommentForm>
  );
};

export default CommentForm;

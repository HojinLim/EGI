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

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleAddBtnClick();
    }
  };

  const handleAddBtnClick = () => {
    if (!jotaiUserData) {
      alert('로그인 후 사용 가능합니다.');

      return;
    }

    if (commentText.trim() === '') {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        console.log('Alert hidden');
      }, 3000);
      return false;
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
    <S.CommentItem width={'1300px'} margin={'15px 0px 0px 0px'}>
      {showAlert && (
        <Stack sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 100 }}>
          <Alert severity="error">댓글을 작성해 주세요.</Alert>
        </Stack>
      )}
      <S.CommentProfileImgBox>
        <S.CommentProfileImg
          src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${jotaiUserData?.profileimg}` || baseProfile}
          alt="Profile"
        />
        <div>{jotaiUserData?.nickname}</div>
      </S.CommentProfileImgBox>

      <S.CommentInput value={commentText} onChange={handleCommentInputChange} onKeyDown={handleKeyDown} />
      <S.CommentPanel>
        <S.Button width="50px" height="30px" onClick={handleAddBtnClick}>
          등록
        </S.Button>
      </S.CommentPanel>
    </S.CommentItem>
  );
};

export default CommentForm;

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import useCommentMutation from '../../hooks/useCommentMutation';
import * as S from './Styled.Comments';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface CommentFormProps {
  uid: string;
  pid: string;
  setIsCommenting: Dispatch<SetStateAction<boolean>>;
}

const CommentForm = ({ uid, pid, setIsCommenting }: CommentFormProps) => {
  const [showAlert, setShowAlert] = useState(false);

  const { addCommentMutation } = useCommentMutation();
  const [commentText, setCommentText] = useState('');

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleAddSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentText === '') {
      setShowAlert(true);
    } else {
      setShowAlert(false);

      const newComment = {
        uid: uid,
        pid: Number(pid),
        nickname: '테스트',
        body: commentText,
        created_at: new Date().toISOString()
      };

      addCommentMutation.mutate(newComment);
      setCommentText('');
      setIsCommenting(false);
    }
  };

  // 3초후 오류 팝업 사라짐
  useEffect(() => {
    if (showAlert) {
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAlert]);

  return (
    <S.CommentForm onSubmit={handleAddSubmitBtn}>
      {showAlert && (
        // MUI Alert기능
        <Stack sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 100 }}>
          <Alert severity="error">댓글을 작성해 주세요.</Alert>
        </Stack>
      )}
      <S.CommentItem>
        <S.CommentProfileImgBox>사진</S.CommentProfileImgBox>
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

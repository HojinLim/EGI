import React, { useState } from 'react';
import useCommentMutation from '../../hooks/useCommentMutation';
import { UserType } from '../../types/supabase';
import * as S from './Styled.Comments';

interface CommentFormProps {
  pid: string;
}

const CommentForm = ({ pid }: CommentFormProps) => {
  const { addCommentMutation } = useCommentMutation();
  const [commentText, setCommentText] = useState('');

  const localUserData = localStorage.getItem('jotaiUserData');
  let userData: Omit<UserType, 'password'> | null = null;
  let uid = '';
  if (localUserData) {
    userData = JSON.parse(localUserData);
    uid = userData!.uid;
  }

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };
  const handleAddSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData) {
      alert('로그인 후 사용 가능합니다.');
    }
    if (commentText === '') {
      alert('댓글을 작성해 주세요.');
      return false;
    }

    const newComment = {
      uid: uid,
      pid: Number(pid),
      nickname: '테스트',
      body: commentText,
      created_at: new Date().toISOString(),
      pofileimg: userData!.profileimg
    };

    addCommentMutation.mutate(newComment);
    setCommentText('');
  };
  return (
    <S.CommentForm onSubmit={handleAddSubmitBtn}>
      <S.CommentItem>
        <S.CommentProfileImgBox>
          <S.CommentProfileImg
            src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${userData?.profileimg}`}
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

import React, { Dispatch, SetStateAction, useState } from 'react';
import useCommentMutation from '../../hooks/useCommentMutation';
import * as S from './Styled.Comments';

import type { UserType } from '../../types/supabase';
interface ReplyCommentFormProps {
  cid: number;
  uid: string;
  pid: string;
  setIsAddReply: Dispatch<SetStateAction<boolean>>;
}

const ReplyCommentForm = ({ uid, pid, cid, setIsAddReply }: ReplyCommentFormProps) => {
  const { addReplyCommentMutation } = useCommentMutation();
  const [replyCommentText, setReplyCommentText] = useState('');
  let userData: Omit<UserType, 'password'> | null = null;
  const localUserData = localStorage.getItem('jotaiUserData');

  if (localUserData) {
    userData = JSON.parse(localUserData);
  }

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyCommentText(e.target.value);
  };

  const handleAddSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData) {
      alert('로그인 후 사용 가능합니다.');
      return false;
    }

    if (replyCommentText === '') {
      alert('댓글을 작성해 주세요.');
      return false;
    }

    const newComment = {
      cid,
      uid,
      pid: Number(pid),
      nickname: '테스트',
      body: replyCommentText,
      created_at: new Date().toISOString(),
      profileimg: userData?.profileimg
    };

    addReplyCommentMutation.mutate(newComment);
    setReplyCommentText('');
    setIsAddReply(false);
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
        <S.CommentInput type="text" value={replyCommentText} onChange={handleCommentInputChange} />
        <S.CommentPanel>
          <S.Button width="50px" height="30px">
            등록
          </S.Button>
        </S.CommentPanel>
      </S.CommentItem>
    </S.CommentForm>
  );
};

export default ReplyCommentForm;

import React, { useState } from 'react';
import useCommentMutation from '../../hooks/useCommentMutation';
import baseProfile from '../../image/baseprofile.jpeg';
import * as S from './Styled.Comments';
import { jotaiUserDataAtom } from '../common/Header';
import { useAtom } from 'jotai';

interface CommentFormProps {
  pid: string;
}

const CommentForm = ({ pid }: CommentFormProps) => {
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
      return false;
    }

    if (commentText === '') {
      alert('댓글을 작성해 주세요.');
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
    <S.CommentForm onSubmit={handleAddSubmitBtn}>
      <S.CommentItem>
        <S.CommentProfileImgBox>
          {jotaiUserData?.profileimg ? (
            <S.CommentProfileImg
              src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${jotaiUserData?.profileimg}`}
              alt="Profile"
            />
          ) : (
            <S.CommentProfileImg src={`${baseProfile}`} alt="Profile" />
          )}
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

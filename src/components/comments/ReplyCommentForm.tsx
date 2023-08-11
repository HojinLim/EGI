import React, { Dispatch, SetStateAction, useState } from 'react';
import useCommentMutation from '../../hooks/useCommentMutation';
import * as S from './Styled.Comments';
import { jotaiUserDataAtom } from '../common/Header';
import { useAtom } from 'jotai';

interface ReplyCommentFormProps {
  cid: number;
  pid: string;
  setIsAddReply: Dispatch<SetStateAction<boolean>>;
}

const ReplyCommentForm = ({ pid, cid, setIsAddReply }: ReplyCommentFormProps) => {
  const { addReplyCommentMutation } = useCommentMutation();
  const [replyCommentText, setReplyCommentText] = useState('');

  const [jotaiUserData] = useAtom(jotaiUserDataAtom);

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyCommentText(e.target.value);
  };

  const handleAddSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!jotaiUserData) {
      alert('로그인 후 사용 가능합니다.');
      return;
    }

    if (replyCommentText === '') {
      alert('댓글을 작성해 주세요.');
      return;
    }

    const newComment = {
      cid,
      uid: jotaiUserData.uid,
      pid: Number(pid),
      nickname: jotaiUserData.nickname,
      body: replyCommentText,
      created_at: new Date().toISOString(),
      profileimg: jotaiUserData.profileimg
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
            src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${jotaiUserData?.profileimg}`}
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

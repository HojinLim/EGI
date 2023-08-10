import React, { Dispatch, SetStateAction, useState } from 'react';
import useCommentMutation from '../../hooks/useCommentMutation';
import * as S from './Styled.Comments';

interface ReplyCommentFormProps {
  cid: number;
  uid: string;
  pid: string;
  setIsAddReply: Dispatch<SetStateAction<boolean>>;
}

const ReplyCommentForm = ({ uid, pid, cid, setIsAddReply }: ReplyCommentFormProps) => {
  const { addReplyCommentMutation } = useCommentMutation();
  const [replyCommentText, setReplyCommentText] = useState('');

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyCommentText(e.target.value);
  };

  const handleAddSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      created_at: new Date().toISOString()
    };

    addReplyCommentMutation.mutate(newComment);
    setReplyCommentText('');
    setIsAddReply(false);
  };

  return (
    <S.CommentForm onSubmit={handleAddSubmitBtn}>
      <S.CommentItem>
        <S.CommentProfileImgBox>사진</S.CommentProfileImgBox>
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

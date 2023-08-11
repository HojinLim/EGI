import React, { Dispatch, useState } from 'react';
import * as S from './Styled.Comments';
import CommentPanel from './CommentPanel';
import ReplyCommentForm from './ReplyCommentForm';
import baseProfile from '../../image/baseprofile.jpeg';
import useCommentMutation from '../../hooks/useCommentMutation';
import { SetStateAction, useAtom } from 'jotai';
import { jotaiUserDataAtom } from '../common/Header';

import type { CommentType } from '../../types/supabase';
interface CommentItemProps {
  pid: string;
  comment: CommentType;
  isUpdating: boolean;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
}

const CommentItem = ({ comment, pid, isUpdating, setIsUpdating }: CommentItemProps) => {
  const [updateComment, setUpdateComment] = useState('');
  const [isAddReply, setIsAddReply] = useState(false);

  const [updateCommentId, setUpdateCommentId] = useState<number | null>(0);

  const [jotaiUserData] = useAtom(jotaiUserDataAtom);

  const { updateCommentMutation, deleteCommentMutation } = useCommentMutation();

  const handleUpdateCommentBtnClick = (cid: number, comment: string) => {
    setIsUpdating(true);
    setUpdateComment(comment);
    setUpdateCommentId(cid);
  };

  const handleUpdateCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateComment(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdateBtnClick();
    }
  };

  const handleUpdateBtnClick = () => {
    if (updateComment === '') {
      alert('작성된 댓글이 없습니다.');
      return false;
    }

    const newComment = {
      cid: updateCommentId!,
      body: updateComment
    };

    updateCommentMutation.mutate(newComment);

    setUpdateComment('');
    setIsUpdating(false);
    setUpdateCommentId(null);
  };

  const handleUpdateCommentCancel = () => {
    setIsUpdating(false);
    setUpdateCommentId(null);
  };

  const handleDeleteCommentBtnClick = (cid: number) => {
    const isConfirmed = window.confirm('삭제하시겠습니까?');
    if (!isConfirmed) {
      return false;
    }
    deleteCommentMutation.mutate(cid);
  };

  return (
    <>
      <S.CommentItem>
        <S.CommentProfileImgBox>
          {comment?.profileimg ? (
            <S.CommentProfileImg
              src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${comment.profileimg}`}
              alt="Profile"
            />
          ) : (
            <S.CommentProfileImg src={`${baseProfile}`} alt="Profile" />
          )}
        </S.CommentProfileImgBox>
        <S.CommentTextBox>
          <S.CommentAuthor>{comment.nickname}</S.CommentAuthor>
          {isUpdating && updateCommentId == comment.cid ? (
            <S.CommentInput
              type="text"
              value={updateComment}
              onChange={handleUpdateCommentInputChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <>
              <S.CommentBody>{comment.body}</S.CommentBody>
              <S.Button onClick={() => setIsAddReply(!isAddReply)}>답글달기</S.Button>
            </>
          )}
        </S.CommentTextBox>
        {jotaiUserData?.uid === comment.uid ? (
          isUpdating && updateCommentId === comment.cid ? (
            <CommentPanel
              commenting={true}
              handleUpdateBtnClick={handleUpdateBtnClick}
              handleUpdateCommentCancel={handleUpdateCommentCancel}
            />
          ) : (
            <CommentPanel
              commenting={false}
              handleUpdateCommentBtnClick={() => handleUpdateCommentBtnClick(comment.cid, comment.body)}
              handleDeleteCommentBtnClick={() => handleDeleteCommentBtnClick(comment.cid)}
            />
          )
        ) : (
          <div style={{ width: '105px' }} />
        )}
      </S.CommentItem>
      {isAddReply && <ReplyCommentForm pid={pid} cid={comment.cid} setIsAddReply={setIsAddReply} />}
    </>
  );
};

export default CommentItem;

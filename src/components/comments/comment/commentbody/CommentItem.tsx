import React, { Dispatch, useMemo, useState } from 'react';
import * as S from './Styled.Comments';
import CommentPanel from './CommentPanel';
import ReplyCommentForm from '../../reply/replyform/ReplyCommentForm';
// import baseProfile from '../../image/baseprofile.jpeg';
import useCommentMutation from '../../../../hooks/useCommentMutation';
import { SetStateAction, useAtom } from 'jotai';
import { jotaiUserDataAtom } from '../../../common/header/Header';

import type { CommentType } from '../../../../types/supabase';
// import { EnterOutlined } from '@ant-design/icons';
interface CommentItemProps {
  pid: string;
  comment: CommentType;
  isUpdating: boolean;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
}

const CommentItem = ({ comment, pid, isUpdating, setIsUpdating }: CommentItemProps) => {
  const [updateComment, setUpdateComment] = useState('');
  const [isAddReply, setIsAddReply] = useState(false);

  const [updateCommentId, setUpdateCommentId] = useState<number | null>(null);

  const [jotaiUserData] = useAtom(jotaiUserDataAtom);

  const { updateCommentMutation, deleteCommentMutation } = useCommentMutation();

  const handleUpdateCommentBtnClick = (cid: number, comment: string) => {
    setIsUpdating(true);
    setUpdateComment(comment);
    setUpdateCommentId(cid);
  };

  const handleUpdateCommentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateComment(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleUpdateBtnClick();
    }
  };

  const handleUpdateBtnClick = () => {
    if (updateComment === '') {
      alert('작성된 댓글이 없습니다.');
      return;
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
      return;
    }

    deleteCommentMutation.mutate(cid);
  };

  const handleReplyBtnClick = () => {
    if (!jotaiUserData) {
      alert('로그인 후 사용 가능합니다.');
      return;
    }
    setIsAddReply(!isAddReply);
  };

  const renderCommentBody = useMemo(() => {
    if (isUpdating && updateCommentId === comment.cid) {
      return <S.EditText value={updateComment} onChange={handleUpdateCommentInputChange} onKeyDown={handleKeyDown} />;
    } else {
      return (
        <>
          <S.Body>{comment.body}</S.Body>
          <S.ReplyBtn onClick={handleReplyBtnClick}>↪</S.ReplyBtn>
        </>
      );
    }
  }, [
    isUpdating,
    updateCommentId,
    comment,
    updateComment,
    handleUpdateCommentInputChange,
    handleKeyDown,
    setIsAddReply
  ]);

  console.log('comment', comment);

  return (
    <S.Container>
      {/* <S.Line></S.Line> */}
      <S.Wrapper>
        <S.ProfileContainer>
          <S.ProfileBox>
            <S.ProfileImg src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${comment?.profileimg}`} alt="Profile" />
          </S.ProfileBox>
          <S.TextBox>
            <S.Name>{comment.nickname}</S.Name>
            <S.Body>{renderCommentBody}</S.Body>
          </S.TextBox>
        </S.ProfileContainer>

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
          <div />
        )}
      </S.Wrapper>
      {isAddReply && <ReplyCommentForm pid={pid} cid={comment.cid} setIsAddReply={setIsAddReply} />}
    </S.Container>
  );
};

export default CommentItem;

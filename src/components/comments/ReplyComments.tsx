import React, { useState } from 'react';
import * as S from './Styled.Comments';
import CommentPanel from './CommentPanel';
import { useQuery } from '@tanstack/react-query';

import { ReplyCommentType } from '../../types/supabase';
import { fetchReplyComments } from '../../services/supabase/replyComments';
import useCommentMutation from '../../hooks/useCommentMutation';

interface ReplyCommentsProps {
  cid: number;
  uid: string;
  pid: string;
}

const ReplyComments = ({ cid, uid, pid }: ReplyCommentsProps) => {
  const { deleteReplyCommentMutation, updateReplyCommentMutation } = useCommentMutation();

  const [isViewingReply, setIsViewingReply] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateReply, setUpdateReply] = useState('');
  const [updateReplyId, setUpdateReplyId] = useState<number | null>(null);

  const defaultQueryOptions = {
    queryKey: ['replyComments'],
    queryFn: () => fetchReplyComments(pid),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  };

  const handleUpdateReplyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateReply(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdateBtnClick();
    }
  };

  const handleUpdateCommentBtnClick = (rid: number, comment: string) => {
    setIsUpdating(true);
    setUpdateReplyId(rid);
    setUpdateReply(comment);
  };

  const handleUpdateCommentCancel = () => {
    setIsUpdating(false);
    setUpdateReplyId(null);
  };

  const handleUpdateBtnClick = () => {
    if (updateReply === '') {
      alert('작성된 댓글이 없습니다.');
      return false;
    }

    const newComment = {
      rid: updateReplyId!,
      body: updateReply
    };

    updateReplyCommentMutation.mutate(newComment);

    setUpdateReply('');
    setIsUpdating(false);
    setUpdateReplyId(null);
  };

  const handleDeleteCommentBtnClick = (rid: number) => {
    const isConfirmed = window.confirm('삭제하시겠습니까?');

    if (!isConfirmed) {
      return false;
    }

    deleteReplyCommentMutation.mutate(rid);
  };

  const { data: replyComments, error, isLoading } = useQuery<ReplyCommentType[]>(defaultQueryOptions);

  if (error) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  const filteredComments = replyComments?.filter((comment) => comment.cid === cid);

  return isViewingReply ? (
    <>
      <S.Button onClick={() => setIsViewingReply(!isViewingReply)} margin={'10px'}>
        닫기
      </S.Button>
      {filteredComments?.map((comment) => (
        <S.CommentItem key={comment.rid} margin={'20px'}>
          <S.CommentProfileImgBox>사진</S.CommentProfileImgBox>
          <S.CommentTextBox>
            <S.CommentAuthor>{comment.nickname}</S.CommentAuthor>
            {isUpdating && updateReplyId == comment.rid ? (
              <S.CommentInput
                type="text"
                value={updateReply}
                onChange={handleUpdateReplyInputChange}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <S.CommentBody>{comment.body}</S.CommentBody>
            )}
          </S.CommentTextBox>
          <S.CommentPanel>
            {uid === comment.uid ? ( // 해당 댓글의 작성자일 경우에만 수정 및 삭제 버튼을 표시
              isUpdating && updateReplyId == comment.rid ? (
                <CommentPanel
                  commenting={true}
                  handleUpdateBtnClick={handleUpdateBtnClick}
                  handleUpdateCommentCancel={handleUpdateCommentCancel}
                />
              ) : (
                <CommentPanel
                  commenting={false}
                  handleUpdateCommentBtnClick={() => handleUpdateCommentBtnClick(comment.rid, comment.body)}
                  handleDeleteCommentBtnClick={() => handleDeleteCommentBtnClick(comment.rid)}
                />
              )
            ) : (
              <div style={{ width: '105px' }} />
            )}
          </S.CommentPanel>
        </S.CommentItem>
      ))}
    </>
  ) : (
    <>
      <S.Button onClick={() => setIsViewingReply(!isViewingReply)} margin={'10px'}>
        열기
      </S.Button>
    </>
  );
};

export default ReplyComments;

import React, { useState } from 'react';
import * as S from './Styled.Comments';
import { fetchComments } from '../../services/supabase/comments';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import ReplyComments from './ReplyComments';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

import type { CommentType } from '../../types/supabase';
const Comments = () => {
  // login 완료되면 수정하기
  const uid = '234';
  const { id: pid } = useParams() as { id: string };

  // 댓글 작성 버튼 컨트롤
  const [isCommenting, setIsCommenting] = useState(false);

  // 댓글 수정
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCommentFormBtnClick = () => {
    setIsCommenting(!isCommenting);
  };

  const defaultQueryOptions = {
    queryKey: ['comments', pid],
    queryFn: () => fetchComments(pid),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  };

  const { data: comments, error, isLoading } = useQuery<CommentType[]>(defaultQueryOptions);

  if (error) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  return (
    <S.CommentsContainer>
      <S.CommentsPanel>
        <div>
          <div>댓글 {comments?.length}개</div>
        </div>
        <div>
          <button onClick={handleCommentFormBtnClick}>작성하기</button>
        </div>
      </S.CommentsPanel>
      <S.CommentsHr />
      <S.CommentList>
        {comments?.map((comment) => (
          <React.Fragment key={comment.cid}>
            <CommentItem comment={comment} uid={uid} pid={pid} isUpdating={isUpdating} setIsUpdating={setIsUpdating} />
            <ReplyComments cid={comment.cid} uid={uid} pid={pid} />
          </React.Fragment>
        ))}
      </S.CommentList>
      {isCommenting && <CommentForm uid={uid} pid={pid} setIsCommenting={setIsCommenting} />}
    </S.CommentsContainer>
  );
};

export default Comments;

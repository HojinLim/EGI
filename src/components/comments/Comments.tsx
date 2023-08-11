import React, { useState } from 'react';
import * as S from './Styled.Comments';
import { fetchComments } from '../../services/supabase/comments';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import ReplyComments from './ReplyComments';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

// 댓글, 대댓글 차이 두기 > 색상, 위치.

// 페이지네이션 고민
// 대댓글 > 그냥 보이게
// 작성자 딱지 > 좋은듯?

// 댓글 작성하기 버튼 삭제 > 폼 항상 보이기 > 완료

import type { CommentType, UserType } from '../../types/supabase';
const Comments = () => {
  // login 완료되면 수정하기

  const localUserData = localStorage.getItem('jotaiUserData');
  let userData: Omit<UserType, 'password'> | null = null;
  let uid = '';
  if (localUserData) {
    userData = JSON.parse(localUserData);
    uid = userData!.uid;
  }

  const { id: pid } = useParams() as { id: string };

  // 댓글 수정
  const [isUpdating, setIsUpdating] = useState(false);

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
      <CommentForm pid={pid} />
    </S.CommentsContainer>
  );
};

export default Comments;

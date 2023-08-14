import React, { useState } from 'react';
import * as S from './Styled.Comments';
import { fetchComments } from '../../../../services/supabase/comments';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import ReplyComments from '../../reply/replycomments/ReplyComments';
import CommentForm from '../commentform/CommentForm';
import CommentItem from './CommentItem';

import * as SL from '../../../common/Styled.Loading';

// 댓글, 대댓글 차이 두기 > 색상, 위치.
// 작성자 딱지 > 좋은듯? > 포스트의 uid 값 가져와서 comment uid와 비교

// 대댓글 > 그냥 보이게 > 완료
// 댓글 작성하기 버튼 삭제 > 폼 항상 보이기 > 완료

import type { CommentType } from '../../../../types/supabase';
const Comments = () => {
  // login 완료되면 수정하기

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
    return <SL.LoadingOverlay />;
  }

  return (
    <S.Container>
      <div>
        <div>
          <div>댓글 {comments?.length}개</div>
        </div>{' '}
        <S.Line></S.Line>
      </div>
      <div>
        <div>
          {comments?.map((comment) => (
            <React.Fragment key={comment.cid}>
              <CommentItem comment={comment} pid={pid} isUpdating={isUpdating} setIsUpdating={setIsUpdating} />
              <ReplyComments cid={comment.cid} pid={pid} />
              <S.Line></S.Line>
            </React.Fragment>
          ))}
        </div>
      </div>
      <CommentForm pid={pid} />
    </S.Container>
  );
};

export default Comments;

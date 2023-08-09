import React, { useState } from 'react';
import * as S from './Styled.Comments';
import { fetchComments, insertComment } from '../../services/supabase/comments';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Comment } from '../../types/supabase';

const Comments = () => {
  const queryClient = useQueryClient();
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');

  const { id: pid } = useParams<{ id?: string }>();
  if (!pid) {
    return <div>pid가 유효하지 않습니다.</div>;
  }

  const handleCommentFormBtnClick = () => {
    setIsCommenting(!isCommenting);
  };

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentText.trim() === '') {
      return;
    }

    // const newComment = {
    //   uid: 1,
    //   pid: parseInt(pid),
    //   nickname: '테스트',
    //   profileimg: '아무튼url',
    //   body: commentText,
    //   created_at: new Date().toISOString()
    // };
    const newComment = {
      uid: 3,
      pid: parseInt(pid),
      nickname: '테스트',
      body: commentText,
      created_at: new Date().toISOString()
    };

    addCommentMutation.mutate(newComment);
    setCommentText('');
  };

  const addCommentMutation = useMutation(insertComment, {
    onSuccess: () => {
      // 댓글이 성공적으로 삽입되면 해당 쿼리를 다시 가져오도록 갱신
      queryClient.invalidateQueries(['comments', pid]);
      setCommentText(''); // 입력 필드 초기화
    },
    onError: (error) => {
      alert(`댓글 삽입 중 오류가 발생했습니다.: ${error}`);
    }
  });

  const defaultQueryOptions = {
    queryKey: ['comments', pid], // Use pid as part of the query key
    queryFn: () => fetchComments(pid),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  };

  const { data: comments, error, isFetching } = useQuery<Comment[]>(defaultQueryOptions);

  if (error) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
  }

  if (isFetching) {
    return <div>로딩중입니다.</div>;
  }

  return (
    <S.CommentsContainer>
      <S.CommentsPanel>
        <div>
          <div> 댓글 {comments?.length} </div>
        </div>
        <div>
          <button onClick={handleCommentFormBtnClick}>작성하기</button>
        </div>
      </S.CommentsPanel>
      <S.CommentsHr />
      <S.CommentList>
        {comments?.map((comment) => (
          <S.CommentItem key={comment.cid}>
            <S.CommentProfileImgBox>사진</S.CommentProfileImgBox>
            <S.CommentTextBox>
              <S.CommentAuthor>{comment.nickname}</S.CommentAuthor>
              <S.CommentBody>{comment.body}</S.CommentBody>
            </S.CommentTextBox>
          </S.CommentItem>
        ))}
      </S.CommentList>
      <S.CommentForm isCommenting={isCommenting} onSubmit={handleSubmitBtn}>
        <S.CommentItem>
          <S.CommentProfileImgBox>사진</S.CommentProfileImgBox>
          <S.CommentBody>
            <input type="text" value={commentText} onChange={handleCommentInputChange} />
          </S.CommentBody>
        </S.CommentItem>
      </S.CommentForm>
    </S.CommentsContainer>
  );
};

export default Comments;

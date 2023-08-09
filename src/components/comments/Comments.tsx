import React, { useState } from 'react';
import * as S from './Styled.Comments';
import { fetchComments } from '../../services/supabase/comments';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Comment } from '../../types/supabase';
import useCommentMutation from '../../hooks/useCommentMutation'; // 이에 맞게 경로 설정

const Comments = () => {
  // login 완료되면 수정하기
  const uid = '3';

  // const queryClient = useQueryClient();
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');

  // 댓글 수정 state들
  const [updateCommentId, setUpdateCommentId] = useState<number | null>(0);
  const [updateComment, setUpdateComment] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const { id: pid } = useParams() as { id: string };

  const { addCommentMutation, updateCommentMutation, deleteCommentMutation } = useCommentMutation();

  const handleCommentFormBtnClick = () => {
    setIsCommenting(!isCommenting);
  };

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleAddSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentText === '') {
      alert('댓글을 작성해 주세요.');
      return false;
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
      uid: uid,
      pid: Number(pid),
      nickname: '테스트',
      body: commentText,
      created_at: new Date().toISOString()
    };

    addCommentMutation.mutate(newComment);
    setCommentText('');
  };

  const handleUpdateCommentBtnClick = (cid: number, comment: string) => {
    setIsUpdating(true);
    setUpdateComment(comment);
    setUpdateCommentId(cid);
  };

  const handleUpdateCommentCancel = () => {
    setIsUpdating(false);
    setUpdateCommentId(null);
  };

  const handleUpdateCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateComment(e.target.value);
  };

  const handleUpdateClickBtn = () => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdateClickBtn();
    }
  };

  const handleDeleteCommentBtnClick = (cid: number) => {
    const isConfirmed = window.confirm('삭제하시겠습니까?');
    if (!isConfirmed) {
      return false;
    }
    deleteCommentMutation.mutate(cid);
  };

  const defaultQueryOptions = {
    queryKey: ['comments', pid],
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
          <div> 댓글 {comments?.length}개</div>
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
              {isUpdating && updateCommentId == comment.cid ? (
                <S.CommentInput
                  type="text"
                  value={updateComment}
                  onChange={handleUpdateCommentInputChange}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <S.CommentBody>{comment.body}</S.CommentBody>
              )}
            </S.CommentTextBox>
            {uid === comment.uid && (
              <S.CommentPanel>
                {isUpdating && updateCommentId == comment.cid ? (
                  <>
                    <S.Button width="50px" height="30px" onClick={handleUpdateClickBtn}>
                      완료
                    </S.Button>
                    <S.Button width="50px" height="30px" onClick={handleUpdateCommentCancel}>
                      취소
                    </S.Button>
                  </>
                ) : (
                  <>
                    <S.Button
                      width="50px"
                      height="30px"
                      onClick={() => handleUpdateCommentBtnClick(comment.cid, comment.body)}
                    >
                      수정
                    </S.Button>
                    <S.Button width="50px" height="30px" onClick={() => handleDeleteCommentBtnClick(comment.cid)}>
                      삭제
                    </S.Button>
                  </>
                )}
              </S.CommentPanel>
            )}
          </S.CommentItem>
        ))}
      </S.CommentList>
      <S.CommentForm isCommenting={isCommenting} onSubmit={handleAddSubmitBtn}>
        <S.CommentItem>
          <S.CommentProfileImgBox>사진</S.CommentProfileImgBox>
          <S.CommentInput type="text" value={commentText} onChange={handleCommentInputChange} />
          <S.CommentPanel>
            <S.Button width="50px" height="30px">
              등록
            </S.Button>
          </S.CommentPanel>
        </S.CommentItem>
      </S.CommentForm>
    </S.CommentsContainer>
  );
};

export default Comments;

import React, { useEffect, useState } from 'react';
import { fetchComments } from '../../services/supabase/comments';
import * as S from './Styled.Comments';

interface Comment {
  cid: number;
  uid: number;
  nickname: string;
  body: string;
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const commentsData = await fetchComments();
      if (commentsData.length !== 0) {
        setComments(commentsData);
      }
    };

    fetchData();
  }, []);

  return (
    <S.CommentsContainer>
      <S.CommentsPanel>
        <div>
          <div> 댓글 1 </div>
        </div>
        <div>
          <button>작성하기</button>
        </div>
      </S.CommentsPanel>
      <S.CommentsHr />
      <S.CommentList>
        {comments.map((comment, index) => (
          <S.CommentItem key={index}>
            <S.CommentProfileImgBox>사진</S.CommentProfileImgBox>
            <S.CommentTextBox>
              <S.CommentAuthor>{comment.nickname}</S.CommentAuthor>
              <S.CommentBody>{comment.body}</S.CommentBody>
            </S.CommentTextBox>
          </S.CommentItem>
        ))}
      </S.CommentList>
    </S.CommentsContainer>
  );
};

export default Comments;

import React, { useMemo, useState } from 'react';
import * as S from './Styled.Reply';
import CommentPanel from '../../comment/commentbody/CommentPanel';
import { useQuery } from '@tanstack/react-query';
import { fetchReplyComments } from '../../../../services/supabase/replyComments';
import useCommentMutation from '../../../../hooks/useCommentMutation';
import { jotaiUserDataAtom } from '../../../common/header/Header';
import { useAtom } from 'jotai';
// import baseProfile from '../../image/baseprofile.jpeg';
import * as SL from '../../../common/Styled.Loading';

import type { ReplyCommentType } from '../../../../types/supabase';
interface ReplyCommentsProps {
  cid: number;
  pid: string;
}

const ReplyComments = ({ cid, pid }: ReplyCommentsProps) => {
  const { deleteReplyCommentMutation, updateReplyCommentMutation } = useCommentMutation();

  // 대댓글 수정 관련
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateReply, setUpdateReply] = useState('');
  const [updateReplyId, setUpdateReplyId] = useState<number | null>(null);

  const [jotaiUserData] = useAtom(jotaiUserDataAtom);

  const defaultQueryOptions = useMemo(
    () => ({
      queryKey: ['replyComments', pid],
      queryFn: () => fetchReplyComments(pid),
      refetchOnWindowFocus: false
    }),
    [pid]
  );

  const { data: replyComments, error, isLoading } = useQuery<ReplyCommentType[]>(defaultQueryOptions);

  const handleUpdateReplyInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateReply(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

  if (error) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return (
      <div>
        로딩중입니다.
        <SL.LoadingOverlay />
      </div>
    );
  }

  const filteredComments = replyComments?.filter((comment) => comment.cid === cid);

  return (
    <>
      {' '}
      <S.Container>
        {filteredComments?.map((comment) => (
          <S.Wrapper key={comment.rid}>
            <S.ProfileContainer>
              ↪
              <S.ProfileBox>
                <S.ProfileImg
                  src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${comment?.profileimg}`}
                  alt="Profile"
                />
              </S.ProfileBox>
              {isUpdating && updateReplyId == comment.rid ? (
                <S.TextBox>
                  {' '}
                  <S.Name>{comment.nickname}</S.Name>
                  <S.ReplyEditText
                    value={updateReply}
                    onChange={handleUpdateReplyInputChange}
                    onKeyDown={handleKeyDown}
                  />
                </S.TextBox>
              ) : (
                <S.TextBox>
                  <S.Name>{comment.nickname}</S.Name>
                  <S.Body>{comment.body}</S.Body>
                </S.TextBox>
              )}
            </S.ProfileContainer>
            {jotaiUserData?.uid === comment.uid ? ( // 해당 댓글의 작성자일 경우에만 수정 및 삭제 버튼을 표시
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
              <div />
            )}
          </S.Wrapper>
        ))}
      </S.Container>
      <S.Line></S.Line>
    </>
  );
};

export default ReplyComments;

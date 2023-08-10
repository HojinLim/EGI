import React from 'react';
import * as S from './Styled.Comments';

interface CommentPanelProps {
  commenting: boolean;
  handleUpdateClickBtn?: () => void;
  handleUpdateCommentCancel?: () => void;
  handleUpdateCommentBtnClick?: () => void;
  handleDeleteCommentBtnClick?: () => void;
}

const CommentPanel = ({
  commenting,
  handleUpdateClickBtn,
  handleUpdateCommentCancel,
  handleUpdateCommentBtnClick, // 추가
  handleDeleteCommentBtnClick
}: CommentPanelProps) => {
  return (
    <>
      {commenting ? (
        <S.CommentPanel>
          <S.Button width="50px" height="30px" onClick={handleUpdateClickBtn}>
            완료
          </S.Button>
          <S.Button width="50px" height="30px" onClick={handleUpdateCommentCancel}>
            취소
          </S.Button>
        </S.CommentPanel>
      ) : (
        <S.CommentPanel>
          <S.Button width="50px" height="30px" onClick={handleUpdateCommentBtnClick}>
            수정
          </S.Button>
          <S.Button width="50px" height="30px" onClick={handleDeleteCommentBtnClick}>
            삭제
          </S.Button>
        </S.CommentPanel>
      )}
    </>
  );
};

export default CommentPanel;

import { CheckOutlined, CloseOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import React from 'react';
import * as S from './Styled.Comments';

interface CommentPanelProps {
  commenting?: boolean;
  handleUpdateBtnClick?: () => void;
  handleUpdateCommentCancel?: () => void;
  handleUpdateCommentBtnClick?: () => void;
  handleDeleteCommentBtnClick?: () => void;
}

const CommentPanel = ({
  commenting,
  handleUpdateBtnClick,
  handleUpdateCommentCancel,
  handleUpdateCommentBtnClick, // 추가
  handleDeleteCommentBtnClick
}: CommentPanelProps) => {
  return (
    <>
      {commenting ? (
        <S.ButtonBox>
          <S.Button onClick={handleUpdateBtnClick}>
            <CheckOutlined />
          </S.Button>
          <S.Button onClick={handleUpdateCommentCancel}>
            <CloseOutlined />
          </S.Button>
        </S.ButtonBox>
      ) : (
        <S.ButtonBox>
          <S.Button onClick={handleUpdateCommentBtnClick}>
            <EditFilled />
          </S.Button>
          <S.Button onClick={handleDeleteCommentBtnClick}>
            <DeleteFilled />
          </S.Button>
        </S.ButtonBox>
      )}
    </>
  );
};

export default CommentPanel;

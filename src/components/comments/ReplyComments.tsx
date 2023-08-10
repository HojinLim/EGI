import { SetStateAction } from 'jotai';
import React, { Dispatch } from 'react';

interface ReplyCommentsProps {
  isViewingReply: boolean;
  setIsViewingReply: Dispatch<SetStateAction<boolean>>;
}

const ReplyComments = ({ isViewingReply, setIsViewingReply }: ReplyCommentsProps) => {
  return isViewingReply ? (
    <>
      <div onClick={() => setIsViewingReply(!isViewingReply)}>닫기</div>
      <span>댓글입니다</span>
    </>
  ) : (
    <>
      <div onClick={() => setIsViewingReply(!isViewingReply)}>열기</div>
    </>
  );
};

export default ReplyComments;

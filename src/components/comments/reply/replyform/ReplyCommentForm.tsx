import React, { Dispatch, SetStateAction, useState } from 'react';
import useCommentMutation from '../../../../hooks/useCommentMutation';
import * as S from './Styled.ReplyForm';
import { jotaiUserDataAtom } from '../../../common/header/Header';
import { useAtom } from 'jotai';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { MailFilled } from '@ant-design/icons';
interface ReplyCommentFormProps {
  cid: number;
  pid: string;
  setIsAddReply: Dispatch<SetStateAction<boolean>>;
}

const ReplyCommentForm = ({ pid, cid, setIsAddReply }: ReplyCommentFormProps) => {
  const { addReplyCommentMutation } = useCommentMutation();
  const [replyCommentText, setReplyCommentText] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [jotaiUserData] = useAtom(jotaiUserDataAtom);

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyCommentText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleAddBtnClick();
    }
  };

  const handleAddBtnClick = () => {
    if (!jotaiUserData) {
      alert('로그인 후 사용 가능합니다.');
      return;
    }

    if (replyCommentText.trim() === '') {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        console.log('Alert hidden');
      }, 3000);
      return false;
    }
    const newComment = {
      cid,
      uid: jotaiUserData.uid,
      pid: Number(pid),
      nickname: jotaiUserData.nickname,
      body: replyCommentText,
      created_at: new Date().toISOString(),
      profileimg: jotaiUserData.profileimg
    };

    addReplyCommentMutation.mutate(newComment);
    setReplyCommentText('');
    setIsAddReply(false);
  };

  return (
    <>
      {' '}
      <S.Container>
        {showAlert && (
          <Stack sx={{ width: '100%', position: 'fixed', top: 1000, zIndex: 100 }}>
            <Alert severity="error">댓글을 작성해 주세요.</Alert>
          </Stack>
        )}

        <S.Wrapper>
          <S.ProfileBox>
            <S.ProfileImg
              src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${jotaiUserData?.profileimg}`}
              alt="Profile"
            />
          </S.ProfileBox>
          <S.TextBox>
            <S.Name>{jotaiUserData?.nickname}</S.Name>
            <S.Text value={replyCommentText} onChange={handleCommentInputChange} onKeyDown={handleKeyDown} />
            <S.ButtonBox>
              <S.Button onClick={handleAddBtnClick}>
                <MailFilled />
              </S.Button>
            </S.ButtonBox>
          </S.TextBox>
        </S.Wrapper>
      </S.Container>
    </>
  );
};

export default ReplyCommentForm;

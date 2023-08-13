import React, { useState } from 'react';
import useCommentMutation from '../../../../hooks/useCommentMutation';
// import baseProfile from '../../image/baseprofile.jpeg';
import * as S from './Styled.Form';
import { jotaiUserDataAtom } from '../../../common/header/Header';
import { useAtom } from 'jotai';
import baseprofile from '../../../../image/baseprofile.jpeg';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { MailFilled } from '@ant-design/icons';

interface CommentFormProps {
  pid: string;
}

const CommentForm = ({ pid }: CommentFormProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const { addCommentMutation } = useCommentMutation();
  const [commentText, setCommentText] = useState('');

  const [jotaiUserData] = useAtom(jotaiUserDataAtom);

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === 'Enter') {
  //     handleAddBtnClick();
  //   }
  // };

  const handleAddBtnClick = () => {
    if (!jotaiUserData) {
      alert('로그인 후 사용 가능합니다.');

      return;
    }

    if (commentText.trim() === '') {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        console.log('Alert hidden');
      }, 3000);
      return false;
    }

    const newComment = {
      uid: jotaiUserData.uid,
      pid: Number(pid),
      nickname: jotaiUserData.nickname,
      body: commentText,
      created_at: new Date().toISOString(),
      profileimg: jotaiUserData.profileimg
    };

    addCommentMutation.mutate(newComment);
    setCommentText('');
  };

  return (
    <>
      {' '}
      {/* <S.Line></S.Line> */}
      <S.Container>
        {showAlert && (
          <Stack sx={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 100 }}>
            <Alert severity="error">댓글을 작성해 주세요.</Alert>
          </Stack>
        )}
        <S.Wrapper>
          <S.ProfileBox>
            {jotaiUserData ? (
              <S.ProfileImg
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${jotaiUserData?.profileimg}`}
                alt="Profile"
              />
            ) : (
              <S.ProfileImg src={baseprofile} alt="Profile" />
            )}
          </S.ProfileBox>
          <S.TextBox>
            <S.Name>{jotaiUserData?.nickname}</S.Name>
            <S.Text value={commentText} onChange={handleCommentInputChange} />
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

export default CommentForm;

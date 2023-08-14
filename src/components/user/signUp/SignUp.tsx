import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { atom, useAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkEmailDuplication, signUpService } from '../../../services/supabase/auth';
import * as S from './Styled.SignUp';

import type { UserType } from '../../../types/supabase';
import { PictureOutlined } from '@ant-design/icons';
import { supabase } from '../../../services/supabase/supabase';

type SignUpType = {
  setLoginModal: (isOpen: boolean) => void;
  setSignUpmodal: (isOpen: boolean) => void;
};

export const userDataAtom = atom<UserType>({
  uid: '',
  email: '',
  password: '',
  nickname: '',
  profileimg: null
});

const SignUp = ({ setLoginModal, setSignUpmodal }: SignUpType) => {
  const queryClient = useQueryClient();
  // 초기 UserData
  const initialUserData = {
    uid: '',
    email: '',
    password: '',
    nickname: '',
    profileimg: null
  };
  const [userData, setUserData] = useAtom(userDataAtom);
  const [selectedProfileImg, setSelectedProfileImg] = useState<File | null>(null);
  const [isEmailCheked, setIsEmailCheked] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [users, setUsers] = useState<Array<{ email: string; nickname: string }>>([]);
  // 회원가입 뮤테이션
  const signUpMutation = useMutation(signUpService, {
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        const postsWithCompleteURLs = data.map((users) => ({
          ...users
        }));
        setUsers(postsWithCompleteURLs);
      }
    };
    fetchUsers();
    try {
      if (!selectedProfileImg) {
        alert('사진을 선택 해주세요!');
        return;
      }
      if (userData.password !== confirmedPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        setPasswordsMatch(false);
        return;
      }
      if (userData.nickname.length > 6) {
        alert('닉네임은 최대 6글자 입니다.');
        return;
      }
      if (users.some((user) => user.nickname === userData.nickname)) {
        alert('이미 존재하는 닉네임입니다.');
        return;
      }
      if (users.some((user) => user.email === userData.email)) {
        alert('이미 존재하는 이메일입니다.');
        return;
      }
      if (selectedProfileImg === null) {
        alert('사진을 선택 해주세요!');
      }
      const userDataWithImage = {
        ...userData,
        profileimg: selectedProfileImg
      };
      signUpMutation.mutate(userDataWithImage);
      alert('회원가입이 완료되었습니다!');
      setSignUpmodal(false);
      setLoginModal(true);
      setUserData(initialUserData);
    } catch (error) {
      console.error(error);
    }
  };

  // 회원가입 모달 닫기
  const closeSignUpModal = () => {
    setSignUpmodal(false);
    setUserData(initialUserData);
  };

  // 이메일 유효성 체크 핸들러
  const checkEmailHandler = async () => {
    if (userData.email.trim() === '') {
      alert('이메일을 입력해주세요.');
      return;
    }
    try {
      const isEmailDuplicated = await checkEmailDuplication(userData.email);
      console.log('userData.email', userData.email);
      if (isEmailDuplicated) {
        setIsEmailCheked(true);
        alert('중복된 이메일입니다.');
      } else {
        setIsEmailCheked(false);
        alert('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 이미지 변환 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const originalFileName = selectedFile.name;
      const fileExtension = originalFileName.split('.').pop();
      const randomFileName = uuidv4() + '.' + fileExtension;
      setSelectedProfileImg(new File([selectedFile], randomFileName));
    }
  };

  return (
    <S.Container>
      <S.CloseBtn onClick={closeSignUpModal}>x</S.CloseBtn>
      <div>
        <S.Title>회원가입</S.Title>
        <S.Line1></S.Line1>
        <S.Wapper onSubmit={signUpHandler}>
          <S.InputWrapper>
            <S.EmailBox>
              <S.EmailLabel>이메일 </S.EmailLabel>
              <S.EmailInput
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder="Email"
              />
              <S.CheckEmailBtn onClick={checkEmailHandler}>중복 확인</S.CheckEmailBtn>
            </S.EmailBox>
            {isEmailCheked && <S.Text>이미 사용 중인 이메일입니다.</S.Text>}
          </S.InputWrapper>
          <S.InputWrapper>
            <S.PasswordBox>
              <S.PasswordLabel> 비밀번호</S.PasswordLabel>
              <S.PasswordInput
                type="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                placeholder="password"
              />
            </S.PasswordBox>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.PasswordConfirmBox>
              <S.PasswordConfirmLabel> 비밀번호 확인</S.PasswordConfirmLabel>
              <S.PasswordConfirmInput
                type="password"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </S.PasswordConfirmBox>
            {!passwordsMatch && <S.Text>비밀번호가 일치하지 않습니다.</S.Text>}
          </S.InputWrapper>
          <S.InputWrapper>
            <S.NicknameBox>
              <S.NicknameLabel> 닉네임 </S.NicknameLabel>
              <S.NicknameInput
                type="text"
                value={userData.nickname}
                onChange={(e) => setUserData({ ...userData, nickname: e.target.value })}
                placeholder="nickname"
              />
            </S.NicknameBox>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.ProfileImgnameBox>
              <S.ProfileImgLabel> 프로필 사진 </S.ProfileImgLabel>
              <S.Label htmlFor="file-input">
                <PictureOutlined />
              </S.Label>
              <S.ProfileImgInput
                id="file-input"
                type="file"
                value={userData.profileimg?.name}
                accept="image/*"
                onChange={handleImageChange}
              />
            </S.ProfileImgnameBox>
          </S.InputWrapper>
          <S.SignUpBtn>가입 하기</S.SignUpBtn>
        </S.Wapper>
      </div>
    </S.Container>
  );
};

export default SignUp;

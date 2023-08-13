import React, { useState, useEffect } from 'react';
import { jotaiUserDataAtom } from '../common/header/Header';
import { useAtom } from 'jotai';
import { supabase } from '../../services/supabase/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { handleImageChange } from '../../hooks/useHandleImage';
import UserPosts, { myIscompletedhAtom, myPostLegthAtom } from './UserPosts';
import * as S from './Styled.MyProfile';
import * as L from '../common/Styled.Loading';
import { userAtom, userEmailAtom } from '../user/login/Login';
import { sosialUserAtom } from '../user/social/SosialLogin';

const MyProfile = () => {
  const [user] = useAtom(userAtom);
  const [editnickname, setEditNickName] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const queryClient = useQueryClient();
  const [userEmail] = useAtom(userEmailAtom);
  const [jotaiUserData, setJotaiUserData] = useAtom(jotaiUserDataAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [socialUser] = useAtom(sosialUserAtom);
  const [myPostLegth] = useAtom(myPostLegthAtom);
  const [myIscompleted] = useAtom(myIscompletedhAtom);

  // 생성한 토큰 가져와서 새로고침 방지
  useEffect(() => {
    const storedUserData = localStorage.getItem('jotaiUserData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setJotaiUserData(parsedUserData);

      queryClient.invalidateQueries(['users', userEmail]);
    }
  }, []);
  console.log('myIscompleted', myIscompleted);
  // 프로필 수정 => 저장
  const handleEdit = async () => {
    let profileimg: string | null = null;

    if (jotaiUserData?.profileimg && Array.isArray(jotaiUserData.profileimg)) {
      profileimg = jotaiUserData.profileimg.join(';');
    }

    if (selectedImages.length > 0) {
      const newImageUrls: string[] = [];

      for (const selectedImage of selectedImages) {
        const { data, error } = await supabase.storage
          .from('1st')
          .upload(`images/${selectedImage.name}`, selectedImage);

        if (error) {
          console.error('Error uploading image to Supabase storage:', error);
          alert('이미지 업로드 중 에러가 발생했습니다!');
          return;
        }

        newImageUrls.push(data.path);
      }

      if (profileimg === null) {
        profileimg = newImageUrls.join(';');
      } else {
        profileimg += ';' + newImageUrls.join(';');
      }
    }

    if (editnickname.length > 6) {
      alert('닉네임은 최대 6글자 입니다.');
      return;
    }

    if (editnickname) {
      const { error } = await supabase
        .from('users')
        .update({
          nickname: editnickname,
          profileimg: profileimg || jotaiUserData?.profileimg
        })
        .eq('uid', jotaiUserData?.uid);

      if (error) {
        console.error('Error editing post:', error);
        alert('에러가 발생했습니다!');
      } else {
        alert('수정이 완료되었습니다.');

        const { data, error: fetchError } = await supabase
          .from('users')
          .select()
          .eq('uid', jotaiUserData?.uid)
          .single();

        if (fetchError) {
          console.error('Error fetching updated user data:', fetchError);
        } else {
          localStorage.setItem('jotaiUserData', JSON.stringify(data));
          setJotaiUserData(data);
        }
        setEditNickName('');
        setSelectedImages([]);
        setIsEditing(false);
      }
    }
  };

  const handleImageChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const updatedSelectedImages = handleImageChange(selectedFiles);
      setSelectedImages(updatedSelectedImages);
    }
  };

  const handleEditClickOpen = () => {
    if (!socialUser?.identities || (undefined && jotaiUserData)) {
      setEditNickName(jotaiUserData?.nickname || '');
      setIsEditing(true);
    } else if (socialUser?.identities[0].provider !== 'email') {
      setIsEditing(false);
      alert('소셜 로그인 시 프로필 수정이 불가능합니다.');
    }
  };

  const handleEditClickClose = () => {
    setIsEditing(false);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditNickName(event.target.value);
  };

  // 마이페이지 등급
  const grade = () => {
    if (myPostLegth >= 20) {
      return 'VIP';
    } else if (myPostLegth >= 15) {
      return 'Gold';
    } else if (myPostLegth >= 10) {
      return 'Silver';
    } else {
      return 'Bronze';
    }
  };

  // 판매완료 개수 체크
  const completed = () => {
    if (!myIscompleted) {
      return 0; // 빈 배열이면 완료된 항목이 없으므로 0을 반환
    } else {
      const userUid = jotaiUserData?.uid;

      // uid가 jotaiUserData의 uid와 일치하고 iscomplted가 true인 객체만 필터링
      const completedItems = myIscompleted.filter((item) => {
        return item.uid == userUid && item.iscompleted == '판매 완료';
      });

      return completedItems.length;
    }
  };

  return (
    <S.MypageContainer>
      {user || jotaiUserData ? (
        <S.MypageWrapper>
          <S.MypageWrap>
            <S.ProfileTable>
              <S.ProfileBox>
                <S.ProfileImg
                  src={
                    jotaiUserData?.profileimg
                      ? `${process.env.REACT_APP_SUPABASE_STORAGE_URL}${jotaiUserData?.profileimg}`
                      : '-'
                  }
                  alt={`프로필 이미지 - ${user?.uid}`}
                />
                <S.ProfileInfo>
                  {isEditing ? (
                    <S.NickNameBox>
                      <S.EditNickName>닉네임 :</S.EditNickName>
                      <S.InputNickName type="text" value={editnickname} onChange={handleNicknameChange} />
                    </S.NickNameBox>
                  ) : (
                    <S.NickName>{jotaiUserData ? jotaiUserData.nickname : ''}</S.NickName>
                  )}
                  <S.Email>{jotaiUserData ? jotaiUserData.email : ''}</S.Email>

                  {isEditing ? (
                    <div>
                      <S.EditBtn onClick={handleEdit}>저장하기</S.EditBtn>
                      <S.EditBtn onClick={handleEditClickClose}>취소하기</S.EditBtn>
                    </div>
                  ) : (
                    <S.EditBtn onClick={handleEditClickOpen}>프로필 수정</S.EditBtn>
                  )}
                </S.ProfileInfo>
              </S.ProfileBox>
              <S.EditProfile>
                {isEditing ? (
                  <div>
                    <div>
                      <S.EditProfileLabel htmlFor="file-input">파일선택</S.EditProfileLabel>
                      <S.EditProfileInput
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChangeWrapper}
                      />
                    </div>
                  </div>
                ) : null}
              </S.EditProfile>
            </S.ProfileTable>
            <div>
              <S.EtcInfoBox>
                <S.GradeBox>
                  <S.GradeFc>{grade()}</S.GradeFc> <S.GradeText>회원 등급</S.GradeText>
                </S.GradeBox>
                <S.CompleteBox>
                  <S.CompleteText>판매 완료</S.CompleteText>
                  <S.CompleteNum>
                    {completed()} / {myPostLegth}
                  </S.CompleteNum>
                </S.CompleteBox>
              </S.EtcInfoBox>
            </div>
          </S.MypageWrap>
          <UserPosts />
        </S.MypageWrapper>
      ) : (
        <div>
          <L.LoadingOverlay />
        </div>
      )}
    </S.MypageContainer>
  );
};

export default MyProfile;

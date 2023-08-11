import React, { useState } from 'react';
import { jotaiUserDataAtom } from '../components/common/Header';
import { useAtom } from 'jotai';
import { supabase } from '../services/supabase/supabase';
import { UserType } from '../types/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { handleImageChange } from '../components/posts/HandleImage';
import UserPosts from '../components/mypage/UserPosts';
import { userAtom } from '../components/user/login/Login';
import * as S from '../pages/Styled.Mypage';

const EditProfile = () => {
  const queryClient = useQueryClient();
  const [user] = useAtom(userAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [, setNickname] = useState('');
  const [editnickname, setEditNickName] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [jotaiUserData] = useAtom(jotaiUserDataAtom);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (user) {
  //       const { data, error } = await supabase.from('users').select('*').eq('email', user.email);
  //       if (error) {
  //         console.error('Error fetching user data:', error);
  //       } else {
  //         setUserData(data[0]);
  //         setNickname(data[0].nickname);
  //       }
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  const handleEdit = async () => {
    let profileimg: string | null = null;

    if (user?.profileimg && Array.isArray(user.profileimg)) {
      profileimg = user.profileimg.join(';');
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

    if (editnickname) {
      const { error } = await supabase
        .from('users')
        .update({
          nickname: editnickname,
          profileimg
        })
        .eq('uid', userData?.uid);
      console.log('설마 너냐?', user?.uid);

      console.log('나 실행돼~', editnickname);
      if (error) {
        console.error('Error editing post:', error);
        alert('에러가 발생했습니다!');
      } else {
        console.log('수정완료', editnickname);
        console.log('수정완료', profileimg);
        queryClient.invalidateQueries(['users', user?.email]);
        alert('수정이 완료되었습니다.');

        const { data, error: fetchError } = await supabase.from('users').select('*').eq('email', user?.email);

        if (fetchError) {
          console.error('Error fetching user data:', fetchError);
        } else {
          setUserData(data[0]);
          setNickname(data[0]?.nickname);

          const updatedJotaiUserData = { ...data[0], nickname: editnickname };
          localStorage.setItem('jotaiUserData', JSON.stringify(updatedJotaiUserData));
        }
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
    setIsEditing(true);
  };

  const handleEditClickClose = () => {
    setIsEditing(false);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditNickName(event.target.value);
  };

  return (
    <S.MypageContainer>
      {user || jotaiUserData ? (
        <div>
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
          <UserPosts />
        </div>
      ) : (
        <div>
          <h1>마이 페이지</h1>
          <p>Loading user data...</p>
        </div>
      )}
    </S.MypageContainer>
  );
};

export default EditProfile;

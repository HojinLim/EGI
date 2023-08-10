import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import { useAtom } from 'jotai';
import { userAtom } from '../components/user/Login';
import { supabase } from '../services/supabase/supabase';
import { UserType } from '../types/supabase';

import { handleImageChange } from '../components/posts/HandleImage';
import UserPosts from '../components/mypage/UserPosts';

const EditProfile = () => {
  const [user] = useAtom(userAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [, setNickname] = useState('');
  const [editnickname, setEditNickName] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [userData, setUserData] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const { data, error } = await supabase.from('users').select('*').eq('email', user.email);
        if (error) {
          console.error('Error fetching user data:', error);
        } else {
          setUserData(data[0]);
          setNickname(data[0].nickname);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditNickName(event.target.value);
  };

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
        alert('수정이 완료되었습니다.');

        const { data, error: fetchError } = await supabase.from('users').select('*').eq('email', user?.email);

        if (fetchError) {
          console.error('Error fetching user data:', fetchError);
        } else {
          setUserData(data[0]);
          setNickname(data[0].nickname);
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

  return (
    <div>
      <Link to="/">Home</Link>
      <Header />

      {user ? (
        <div>
          <h1>마이 페이지</h1>
          <div>
            <img
              src={userData?.profileimg ? `${process.env.REACT_APP_SUPABASE_STORAGE_URL}${userData.profileimg}` : '-'}
              alt={`프로필 이미지 - ${user.uid}`}
              style={{
                width: 200,
                height: 200,
                borderRadius: 70,
                border: '3px solid black'
              }}
            />

            <button className="material-symbols-outlined" onClick={handleEditClick}>
              edit
            </button>

            <p>이메일: {userData ? userData.email : ''}</p>
            <p>닉네임: {userData ? userData.nickname : ''}</p>
          </div>
          {isEditing && (
            <div>
              <input type="text" value={editnickname} onChange={handleNicknameChange} />
              <input type="file" accept="image/*" onChange={handleImageChangeWrapper} />
              <button onClick={handleEdit}>수정하기</button>
            </div>
          )}
          <UserPosts />
        </div>
      ) : (
        <div>
          <h1>마이 페이지</h1>
          <p>Loading user data...</p>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

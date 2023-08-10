// Mypage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserPosts from '../components/UserPosts';
import Header from '../components/common/Header';
import { useAtom } from 'jotai';
import { userAtom } from '../components/user/Login';
import { updateUserInfo } from '../services/supabase/auth';

const Mypage = () => {
  const [user] = useAtom(userAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.email || '');
  const [editedNickname, setEditedNickname] = useState(user?.email || ''); // Use 'nickname' or an appropriate field here

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditedName(event.target.value);
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditedNickname(event.target.value);

  const saveChanges = async () => {
    try {
      setIsEditing(false);
      // updateUserInformation 함수 호출
      updateUserInformation();
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  // 사용자 정보 업데이트 예시
  async function updateUserInformation() {
    try {
      // 여기서 새로운 닉네임과 이메일을 받아온다고 가정합니다.
      const newNickname = editedName; // 새로운 닉네임 값
      const userEmail = editedNickname; // 사용자 이메일 값

      // updateUserInfo 함수 호출하여 사용자 정보 업데이트
      await updateUserInfo(userEmail, newNickname);

      console.log('사용자 정보가 업데이트되었습니다.');
    } catch (error) {
      console.error('사용자 정보 업데이트 중 오류 발생:', error);
    }
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <Header />

      {user ? (
        <div>
          <h1>마이 페이지</h1>
          {/* 프로필 이미지 변경 관련 */}
          <div>
            <label htmlFor="imageInput">
              <img
                src={selectedImage ? URL.createObjectURL(selectedImage) : '-'}
                alt={`프로필 이미지 - ${user.uid}`}
                style={{ width: 200, height: 200, borderRadius: 70, cursor: 'pointer', border: '3px solid black' }}
              />
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <button className="material-symbols-outlined" onClick={() => setIsEditing(!isEditing)}>
              edit
            </button>
            <p>이메일: {user.email}</p>
            <p>닉네임: {editedNickname}</p>
          </div>

          {isEditing && (
            <>
              <span>이메일:</span>
              <input type="text" value={editedName} onChange={handleNameChange} />
              <p />
              <span>닉네임:</span>
              <input type="text" value={editedNickname} onChange={handleNicknameChange} />
              <p />
              <button onClick={saveChanges}>Save</button>
              <p />
            </>
          )}

          <div>
            <UserPosts />
          </div>
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

export default Mypage;

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import UserPosts from '../components/UserPosts';
import Header from '../components/common/Header';
import { useAtom } from 'jotai';
import { userAtom } from '../components/user/Login';
import { supabase } from '../services/supabase/supabase';

const Mypage = () => {
  const [user] = useAtom(userAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditedNickname(event.target.value);

  // 닉네임 변경
  const saveChanges = async () => {
    try {
      if (user) {
        await supabase.from('users').update({ nickname: editedNickname }).eq('uid', user.uid);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <div>
      {/* 홈으로 이동 */}
      <Link to="/">Home</Link>
      <Header />

      {user ? (
        <div>
          <h1>마이 페이지</h1>
          <div>
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : '-'}
              alt={`프로필 이미지 - ${user.uid}`}
              style={{
                width: 200,
                height: 200,
                borderRadius: 70,
                cursor: 'pointer',
                border: '3px solid black'
              }}
              onClick={handleImageClick} // Click to change image
            />

            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {/* 수정 버튼 */}
            <button className="material-symbols-outlined" onClick={() => setIsEditing(!isEditing)}>
              edit
            </button>

            <p>이메일: {user.email}</p>
            <p>닉네임: {editedNickname}</p>
          </div>
          {/* 수정 버튼 클릭시 입력폼 */}
          {isEditing && (
            <>
              <span>닉네임 입력:</span>
              <input type="text" value={editedNickname} onChange={handleNicknameChange} />
              <p />
              <button onClick={saveChanges}>Save</button>
              <p />
            </>
          )}
          {/* 유저 포스팅 */}
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

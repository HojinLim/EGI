import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserPosts from '../components/UserPosts';
import Header from '../components/common/Header';
import { useAtom } from 'jotai';
import { userAtom } from '../components/user/Login';

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
      // Update the user data using the appropriate method (e.g., API call)
      // user.email = editedName;
      // user.nickname = editedNickname;
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

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
            <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            <button className="material-symbols-outlined" onClick={() => setIsEditing(true)}>edit</button>
            <p>uid: {user.uid}</p>
            <p>닉네임: {editedNickname}</p>
          </div>

          {isEditing && (
            <>
              <span>이름:</span>
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
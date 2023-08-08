import React, { useState } from 'react';


interface UserProfileProps {
  user: {
    profileImg: string;
    name: string;
    nickname: string;
  };
  toggleEditMode: () => void;
}


const UserProfile: React.FC<UserProfileProps> = ({ user, toggleEditMode }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  return (
    <div>
      <label htmlFor="imageInput">
        {/* 선택한 이미지로 변경 아니면, 기존 이미지 그대로 */}
        <img
          src={selectedImage ? URL.createObjectURL(selectedImage) : user.profileImg}
          alt={`프로필 이미지 - ${user.name}`}
          style={{ width: 200, height: 200, borderRadius: 70, cursor: 'pointer', border: '3px solid black' }}
        />
      </label>
      <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
      <button className="material-symbols-outlined" onClick={toggleEditMode}>
        edit
      </button>
      <p>이름: {user.name}</p>
      <p>닉네임: {user.nickname}</p>
    </div>
  );
};

export default UserProfile;

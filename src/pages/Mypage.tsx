import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import UserProfile from '../components/UserProfile';
import UserPosts from '../components/UserPosts';

const Mypage = () => {
  const user = {
    uid: shortid.generate(),
    profileImg: '/Amphibia.png',
    name: 'Hojin',
    nickname: 'zzHojinzz'
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedNickname, setEditedNickname] = useState(user.nickname);

  const toggleEditMode = () => setIsEditing(!isEditing);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditedName(event.target.value);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditedNickname(event.target.value);

  const saveChanges = () => {
    // 유효성 검사
    if (!editedName || !editedNickname) {
      alert('빈값이 있습니다 !');
      return;
    }

    setIsEditing(false);
    // TODO: 유저 DB 정보 갱신, patch
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/pagination">Pagination</Link>

      <p />

      <h1>마이 페이지</h1>
      <UserProfile user={user} toggleEditMode={toggleEditMode} />
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

      <br />
      

      {/* 옵션 선택 */}
      <div>
       
        {/* TODO : 내가 쓴 글 , 찜 목록 관련 데이터 전달? */}
        <UserPosts />
        
      </div>
    </div>
  );
};

export default Mypage;

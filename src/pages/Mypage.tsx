import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import shortid from 'shortid';
import UserProfile from '../components/UserProfile';

const Mypage = () => {
  // TODO : 외부에서 데이터를 받아와야함. 

  // 샘플 데이터들
  const exampleData = [
    { uid: shortid.generate(), name: 'Alice', age: 25 },
    { uid: shortid.generate(), name: 'Bob', age: 30 },
    { uid: shortid.generate(), name: 'Charlie', age: 22 },
    { uid: shortid.generate(), name: 'Charlie', age: 23 },
    { uid: shortid.generate(), name: 'Charlie', age: 25 }
  ];

  const user = {
    uid: shortid.generate(),
    profileImg: '/Amphibia.png',
    name: 'Hojin',
    nickname: 'zzHojinzz'
  };

  const pagePerObjects = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedNickname, setEditedNickname] = useState(user.nickname);

  const toggleEditMode = () => setIsEditing(!isEditing);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
      <button>좋아요/내가 쓴글</button>
      <Pagination
        currentPage={currentPage}
        pagePerObjects={pagePerObjects}
        data={exampleData}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Mypage;

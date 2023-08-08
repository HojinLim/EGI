import React, { useState } from 'react';
import Pagination from '../components/Pagination';

import { Link } from 'react-router-dom';
import shortid from 'shortid';

const Mypage: React.FC = () => {
  // 샘플 데이터들
  const exampleData = [
    { id: shortid.generate(), name: 'Alice', age: 25 },
    { id: shortid.generate(), name: 'Bob', age: 30 },
    { id: shortid.generate(), name: 'Charlie', age: 22 },
    { id: shortid.generate(), name: 'Charlie', age: 23 },
    { id: shortid.generate(), name: 'Charlie', age: 25 },
    { id: shortid.generate(), name: 'Charlie', age: 26 },
    { id: shortid.generate(), name: 'Charlie', age: 21 },
    { id: shortid.generate(), name: 'Charlie', age: 18 },
    { id: shortid.generate(), name: 'Charlie', age: 19 }
  ];

  // 페이지 당 데이터 수
  const pagePerObjects = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Link to="/">Home</Link> <p/>

      <h1>마이 페이지</h1>
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

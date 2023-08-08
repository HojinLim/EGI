import React, { useState } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

interface Person {
  uid: string;
  name: string;
  age: number;
}

// 페이지 네이션 틀 
const Pagination = () => {


  const data: Person[] = [
    { uid: shortid.generate(), name: 'Alice', age: 25 },
    { uid: shortid.generate(), name: 'Bob', age: 30 },
    { uid: shortid.generate(), name: 'Charlie', age: 22 },
    { uid: shortid.generate(), name: 'Charlie', age: 23 },
    { uid: shortid.generate(), name: 'Charlie', age: 25 }
  ];

  const pagePerObjects = 4;

  const totalCount = data.length; // 데이터의 총 길이
  const totalPages = Math.ceil(totalCount / pagePerObjects);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIdx = (currentPage - 1) * pagePerObjects;
  const endIdx = Math.min(startIdx + pagePerObjects, totalCount);
  const paginatedData = data.slice(startIdx, endIdx);

  return (
    <div>
      <Link to="/">home</Link>

      <p>전체 데이터 수: {totalCount}</p>
      <p>전체 페이지 수: {totalPages}</p>
      <p>현재 페이지: {currentPage}</p>
      <p>페이지 당 데이터 수: {pagePerObjects}</p>
      <ul>
        {paginatedData.map((person) => (
          <li key={person.uid}>
            {person.name}, {person.age}
          </li>
        ))}
      </ul>
      <div>
        <StyledButton onClick={handlePreviousPage} disabled={currentPage === 1} selected={false}>
          ⬅
        </StyledButton>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <StyledButton
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            selected={pageNumber === currentPage}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </StyledButton>
        ))}
        <StyledButton onClick={handleNextPage} disabled={currentPage === totalPages} selected={false}>
          ➡
        </StyledButton>
      </div>
    </div>
  );
};

export default Pagination;

// Styled-components를 사용하여 버튼 스타일 정의
interface ButtonProps {
  selected: boolean;
}

// Styled-components를 사용하여 버튼 스타일 정의
const StyledButton = styled.button<ButtonProps>`
  margin: 4px;
  padding: 8px 16px;
  border: none;
  background-color: ${(props) => (props.selected ? 'yellow' : '#f0f0f0')};
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

import React, { useState } from 'react';
import styled from 'styled-components';

interface Post {
  pid: number;
  nickname: string;
  title: string;
  category: string;
  price: number;
  date: string;
}

//  TODO: 실제 데이터 props나 상태 관리로 가져오기
const Pagination = () => {
  // 더미 데이터 생성
  const dummyPosts: Post[] = [
    { pid: 1, nickname: 'user1', title: 'Post 1', category: 'Tech', price: 100, date: '2023-08-10' },
    { pid: 2, nickname: 'user2', title: 'Post 2', category: 'Food', price: 50, date: '2023-08-11' },
    { pid: 3, nickname: 'user3', title: 'Post 3', category: 'Travel', price: 200, date: '2023-08-12' },
    { pid: 4, nickname: 'user1', title: 'Post 4', category: 'Tech', price: 150, date: '2023-08-13' },
    { pid: 5, nickname: 'user2', title: 'Post 5', category: 'Food', price: 30, date: '2023-08-14' }
  ];

  const pagePerObjects = 3; // 페이지 당 데이터 수
  const totalCount = dummyPosts.length; // 데이터의 총 길이
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
  const paginatedData = dummyPosts.slice(startIdx, endIdx);

  const handleClick = (data: Post) => {
    console.log('카드가 클릭되었습니다:', data.title);
  };

  return (
    <>
      <div>
        <p>전체 데이터 수: {totalCount}</p>
        <p>전체 페이지 수: {totalPages}</p>
        <p>현재 페이지: {currentPage}</p>
        <p>페이지 당 데이터 수: {pagePerObjects}</p>
        <br />
      </div>
      <div>
        <CardList>
          {paginatedData.map((data) => (
            <StyledCard key={data.pid} onClick={() => handleClick(data)}>
              <p>작성자: {data.nickname}</p>
              <p>제목: {data.title}</p>
              <p>카테고리: {data.category}</p>
              <p>가격: {data.price}</p>
              <p>작성일자: {data.date}</p>
            </StyledCard>
          ))}
        </CardList>
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
    </>
  );
};

export default Pagination;

interface ButtonProps {
  selected: boolean;
}

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

const CardList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledCard = styled.li`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

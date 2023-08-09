import React, { useState } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';

// 페이지 네이션 틀
interface PaginationProps {
  postMode: string; // postMode의 타입을 명시적으로 지정
}

const Pagination = ({ postMode }: PaginationProps) => {
  //  임의로 받았다고 가정

  interface Data {
    pid: string;
    nickname: string;
    title: string;
    category: string;
    price: number;
    date: string;
  }
  let samplePosts: Data[] = [];

  const zzimPosts: Data[] = [
    {
      pid: shortid.generate(),
      nickname: 'User123',
      title: 'Item 1',
      category: 'Electronics',
      price: 100,
      date: '2023-08-08'
    },
    {
      pid: shortid.generate(),
      nickname: 'User456',
      title: 'Item 2',
      category: 'Clothing',
      price: 50,
      date: '2023-08-09'
    },
    {
      pid: shortid.generate(),
      nickname: 'User789',
      title: 'Item 3',
      category: 'Furniture',
      price: 200,
      date: '2023-08-10'
    },
    {
      pid: shortid.generate(),
      nickname: 'User789',
      title: 'Item 4',
      category: 'Furniture',
      price: 200,
      date: '2023-08-10'
    },
    {
      pid: shortid.generate(),
      nickname: 'User789',
      title: 'Item 5',
      category: 'Furniture',
      price: 200,
      date: '2023-08-10'
    }
  ];

  const myPosts: Data[] = [
    {
      pid: shortid.generate(),
      nickname: 'User789',
      title: 'Item 5',
      category: 'Furniture',
      price: 200,
      date: '2023-08-10'
    },
    {
      pid: shortid.generate(),
      nickname: 'User789',
      title: 'Item 3',
      category: 'Furniture',
      price: 200,
      date: '2023-08-10'
    },
    {
      pid: shortid.generate(),
      nickname: 'User789',
      title: 'Item 4',
      category: 'Furniture',
      price: 200,
      date: '2023-08-10'
    }
  ];

  samplePosts = postMode === '내가 쓴 글' ? myPosts : zzimPosts;

  const pagePerObjects = 3; // 페이지 당 데이터 수

  const totalCount = samplePosts.length; // 데이터의 총 길이
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
  const paginatedData = samplePosts.slice(startIdx, endIdx);

  const handleClick = (data: Data) => {
    // 클릭 시 수행할 작업을 여기에 추가
    
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

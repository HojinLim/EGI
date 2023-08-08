import React from 'react';
import styled from 'styled-components';

interface Person {
  id: string;
  name: string;
  age: number;
}

interface PaginationProps {
  currentPage: number;
  pagePerObjects: number;
  data: Person[];
  onPageChange: (pageNumber: number) => void; // Callback function to handle page changes
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, pagePerObjects: pagePerObjects, data, onPageChange }) => {
  const totalCount = data.length; // 데이터의 총 길이
  const totalPages = Math.ceil(totalCount / pagePerObjects);
  const startIdx = (currentPage - 1) * pagePerObjects;
  const endIdx = Math.min(startIdx + pagePerObjects, totalCount);
  const paginatedData = data.slice(startIdx, endIdx);

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div>
      <p>전체 데이터 수: {totalCount}</p>
      <p>전체 페이지 수: {totalPages}</p>
      <p>현재 페이지: {currentPage}</p>
      <p>페이지 당 데이터 수: {pagePerObjects}</p>
      <ul>
        {paginatedData.map((person) => (
          <li key={person.id}>
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
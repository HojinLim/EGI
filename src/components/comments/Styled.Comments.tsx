import styled from 'styled-components';

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentsPanel = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
`;

export const CommentsHr = styled.hr`
  border: 1px solid #ccc;
  margin: 20px 0px 0px 0px;
  width: 1200px;
`;

export const CommentList = styled.ul`
  list-style-type: none; /* 기본 목록 스타일 제거 */
  padding: 0; /* 기본 패딩 제거 */
  margin: 0; /* 기본 마진 제거 */
  width: 1200px;
`;

export const CommentItem = styled.li`
  display: flex;
  border-bottom: 1px solid #ccc;
  gap: 10px;
  height: 80px;
  padding: 5px 0;
`;

export const CommentProfileImgBox = styled.div`
  margin: 10px 20px 0 20px;
`;

export const CommentTextBox = styled.div`
  padding: 10px 0;
`;

export const CommentAuthor = styled.div`
  font-weight: 600;
  margin-bottom: 15px;
`;

export const CommentBody = styled.div``;

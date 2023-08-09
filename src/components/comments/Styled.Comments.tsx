import styled, { css } from 'styled-components';

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
  max-width: 1200px;
`;

export const CommentProfileImgBox = styled.div`
  margin: 10px 20px 0 20px;
  width: 5%;
`;

export const CommentTextBox = styled.div`
  padding: 10px 0;
  width: 80%;
`;

export const CommentAuthor = styled.div`
  font-weight: 600;
  margin-bottom: 15px;
`;

export const CommentBody = styled.div`
  margin-top: 5px;
  width: 80%;
  height: 80%;
  input {
    width: 100%;
    height: 100%;
  }
`;

export const CommentForm = styled.form<{ isCommenting?: boolean }>`
  display: none;
  max-width: 1200px;
  ${(props) =>
    props.isCommenting &&
    css`
      display: block;
      border: 1px solid black;
    `};
`;

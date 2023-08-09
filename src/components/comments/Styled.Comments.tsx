import styled, { css } from 'styled-components';

export const CommentsContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

export const CommentsPanel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 99vw;
  max-width: 1200px;
`;

export const CommentsHr = styled.hr`
  border: 1px solid #ccc;
  margin: 20px 0px 0px 0px;
  max-width: 1200px;
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
  width: 99vw;
  justify-content: space-between;
`;

export const CommentProfileImgBox = styled.div`
  margin: 10px 20px 0 20px;
  width: 5%;
  min-width: 50px;
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
`;

export const CommentPanel = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
`;

export const CommentInput = styled.input`
  width: 80%;
`;

interface ButtonProp {
  width?: string;
  height?: string;
}

export const Button = styled.button<ButtonProp>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const CommentAdd = styled.div`
  display: flex;
  align-items: center;
`;

export const CommentForm = styled.form<{ isCommenting?: boolean }>`
  display: none;
  max-width: 1200px;
  ${(props) =>
    props.isCommenting &&
    css`
      margin-top: 20px;
      display: flex; /* 추가: 수직 정렬을 위해 컨테이너를 flex로 설정 */

      border-top: 1px solid black;
    `};
`;

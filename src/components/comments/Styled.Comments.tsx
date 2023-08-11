import styled from 'styled-components';

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

interface StyledReplyProps {
  margin?: string;
}

export const CommentItem = styled.li<StyledReplyProps>`
  display: flex;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  gap: 10px;
  min-height: 100px;
  padding: 5px 0;
  max-width: 1200px;
  width: 99vw;
  justify-content: space-between;
  margin: ${(props) => props.margin};
`;

export const CommentProfileImgBox = styled.div`
  margin: 10px 20px 0 20px;
  width: 5%;
  width: 80px;
  height : 100px;
  border: black solid 1px;
  
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
  min-height: 50%;
  word-break: break-all;
`;

export const CommentPanel = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
`;

export const CommentInput = styled.input`
  width: 80%;
  height: 50%;
`;

interface ButtonProp {
  width?: string;
  height?: string;
  margin?: string;
}

export const Button = styled.button<ButtonProp>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
`;

export const CommentAdd = styled.div`
  display: flex;
  align-items: center;
`;

export const CommentForm = styled.form<{ isCommenting?: boolean }>`
  display: flex;
  max-width: 1200px;
  margin-top: 20px;
  display: flex;
  border-top: 1px solid black;
`;

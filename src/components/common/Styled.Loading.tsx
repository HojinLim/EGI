import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingOverlay = styled(CircularProgress)`
  position: fixed;
  top: 0;
  left: 0;
  width: 2000px; /* 화면의 왼쪽 4분의 1 크기 */
  height: 2000px; /* 화면 높이에 맞춤 */
  background-color: rgba(239, 239, 239, 0); /* 변경된 배경색 */
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

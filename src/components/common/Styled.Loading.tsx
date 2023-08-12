import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingOverlay = styled(CircularProgress)`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: rgba(239, 239, 239, 0); /* 변경된 배경색 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

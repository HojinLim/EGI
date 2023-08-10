import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  h1 {
    font-weight: bold;
    font-size : 30px;
  }

  p {
    font-size : 15px;
  }
`;

export default GlobalStyle;

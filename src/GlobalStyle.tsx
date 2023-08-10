import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  h1 {
    font-weight: bold;
    font-size : 30px;
  }

  body{
    max-width : 1200px;
    max-height : 800px;
    margin : 0 auto;
  }

  p {
    font-size : 15px;
  }
`;

export default GlobalStyle;

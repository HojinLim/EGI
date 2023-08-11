import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    max-width: 1500px;
    min-width: 800px;
    margin: 0 auto
  }

  h1 {
    font-weight: bold;
    font-size : 30px;
  }

  p {
    font-size : 15px;
  }
`;

export default GlobalStyle;

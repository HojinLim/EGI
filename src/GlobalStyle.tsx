import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  /* @font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
} */

  @font-face {
    font-family: 'RIDIBatang';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  body {
    font-family: 'RIDIBatang';
    /* font-family: 'NEXON Lv1 Gothic OTF'; */
    max-width: 1500px;
    min-width: 800px;
    margin: 0 auto;

   
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

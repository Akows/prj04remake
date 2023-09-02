import { createGlobalStyle } from 'styled-components';
import GIfont from '../assets/fonts/ja-jp.ttf';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'GIfont';  // 원하는 폰트 이름을 사용하세요.
    src: url(${GIfont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'GIfont', sans-serif; // 폰트를 적용하려는 기본 폰트와 함께 사용하세요.
  }
`;

export default GlobalStyles;

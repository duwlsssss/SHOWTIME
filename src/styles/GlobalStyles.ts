import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

/**
 * 글로벌 스타일
 * 폰트랑 디자인 토큰은 고정이라 스타일 컴포넌트가 아닌
 * styles/fonts.css, styles/designTokens.css에서 관리
 */
const GlobalStyles = createGlobalStyle`
  ${reset}
  
  body {
    font-family: "Pretendard", sans-serif;
    font-weight: 500;
    color: var(--color-dark-gray);
    background-color: var(--color-white);
  }

  * {
    box-sizing: border-box;
  }

  a{
    text-decoration: none;
    color: var(--color-dark-gray);
  }
`;

export default GlobalStyles;

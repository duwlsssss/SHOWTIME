import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f5f5f5;
  }

  * {
    box-sizing: border-box;
  }

  // header 기본 스타일 초기화
  header {
    border: none;
    margin: 0;
    padding: 0;
  }

  // #root > header 스타일 초기화
  #root > header {
    border: none !important;
    border-bottom: none !important;
  }

  // Outlet으로 렌더링되는 페이지들의 기본 스타일
  .page-content {
    width: 1200px;
    min-height: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

export default function GlobalStyles() {
	return <GlobalStyle />;
}

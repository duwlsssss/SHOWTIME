import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* 추가적인 글로벌 스타일을 여기에 작성할 수 있습니다. */
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default function GlobalStyles() {
	return <GlobalStyle />;
}

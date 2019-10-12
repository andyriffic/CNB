import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 20px;
  }

  @media (min-width: 600px) {
    html {
      font-size: 20px;
    }
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Poppins, sans-serif;
  }

  * + * {
	  margin-top: 1.2em;
  }

  .margins-off > * {
	  margin-top: 0;
  }
`;

export default GlobalStyle;

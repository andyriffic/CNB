import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 3.5vmin;
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
	  margin-top: 1.5em;
  }

  .margins-off > * {
	  margin-top: 0;
  }
`;

export default GlobalStyle;

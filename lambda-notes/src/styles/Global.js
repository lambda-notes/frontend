import { css } from 'styled-components';

export const Global = css`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    color: #21252a;
    background: #f0f4f7;
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  h1 {
  }

  h2 {
    font-size: 2.4rem;
    font-weight: 700;
  }
`;

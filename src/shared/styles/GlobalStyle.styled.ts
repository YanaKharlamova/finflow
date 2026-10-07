import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    color-scheme: light;
  }

  body {
    min-width: 0;
    min-height: 100vh;
    margin: 0;
    overflow-y: scroll;
    font-family: Inter, system-ui, sans-serif;
    color: ${({ theme }) => theme.colors.textPrimary};
    background: ${({ theme }) => theme.colors.background};

    @supports (height: 100dvh) {
      min-height: 100dvh;
    }
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

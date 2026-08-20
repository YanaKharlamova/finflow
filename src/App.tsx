import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { router } from "src/app/router";
import { GlobalStyle } from "src/shared/styles/GlobalStyle.styled";
import { theme } from "src/shared/styles/theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

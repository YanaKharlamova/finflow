import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { router } from "src/app/router";
import { GlobalStyle } from "src/shared/styles/GlobalStyle.styled";
import { theme } from "src/shared/styles/theme";
import { AppStartupError } from "src/AppStartupError";

type Props = {
  startupError?: boolean;
};

export const App = ({ startupError = false }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {startupError ? <AppStartupError /> : <RouterProvider router={router} />}
    </ThemeProvider>
  );
};

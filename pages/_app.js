import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../styles/global";

export const theme = {
  primary: "#b5e245",
  secondary: "#363636",
  third: "#ffffff",
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default MyApp;

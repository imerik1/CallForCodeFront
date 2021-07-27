import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
  }
  #__next {
    display: flex;
    flex-flow: column nowrap;
  }
  .logo_powered {
    filter: saturate(0%);
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1);
    transition-duration: 2s;
  }
  .logo_powered:hover {
    filter: saturate(100%);
  }
  header, main, footer {
    padding: 1rem 8rem;
    @media screen and (max-width: 1105px) {
      padding: 0.8rem 6rem;
    }
    @media screen and (max-width: 805px) {
      padding: 0.5rem 2rem;
    }
    @media screen and (max-width: 445px) {
      padding: 0;
    }
  }
  #loading {
    height: 60px !important;
  }
  .MuiFilledInput-underline:after {
    border-bottom: 2px solid #b5e245 !important;
  }
  .MuiInputLabel-filled.MuiInputLabel-shrink {
    color: #363636 !important;
  }
`;

export default GlobalStyle;

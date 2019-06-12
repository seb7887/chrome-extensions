import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier Now", monospace;
  }
`;

export default GlobalStyle;

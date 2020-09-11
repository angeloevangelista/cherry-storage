import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100vh;
  }

  body {
    color: #673017;
    background: #EEEEEE;
    --webkit-font-smoothing: antialiased;
  }

  h1 {
    font-size: 3.4rem;
  }

  body, input, button, textarea {
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }
`;

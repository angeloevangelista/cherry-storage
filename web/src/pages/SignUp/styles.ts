import styled from 'styled-components';
import { shade } from 'polished';

import signUpBackground from '../../assets/images/sign-up-background.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  place-content: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 20px 0;
    width: 340px;
    text-align: center;

    h1 {
      color: #220e03;
      font-size: 24px;
      margin-bottom: 24px;
    }

    a {
      color: #52761e;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.25s;
      font-size: 14px;

      &:hover {
        color: ${shade(0.25, '#52761e')};
      }
    }
  }

  > a {
    color: #cd373b;
    text-decoration: none;
    transition: color 0.25s;
    font-size: 14px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 100px 5px rgba(205, 55, 59, 0.1);

    background: #fff;

    display: flex;
    align-items: center;

    transition: 0.25s;

    svg {
      margin-right: 10px;
    }

    &:hover {
      color: #fff;
      background: #cd373b;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;

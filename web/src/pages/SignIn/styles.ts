import styled from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/images/sign-in-background.jpg';

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
    margin: 60px 0;
    width: 340px;
    text-align: center;

    h1 {
      color: #220e03;
      font-size: 24px;
      margin-bottom: 24px;
    }

    input {
      font-size: 14px;
      color: #220e03;
      border-radius: 10px;
      border: solid 2px #fff;
      background: #fff;
      padding: 16px;
      width: 100%;

      & + input {
        margin-top: 8px;
      }
    }

    button {
      border-radius: 10px;
      border: 0;

      width: 100%;
      height: 56px;

      background: #cd373b;
      padding: 0 16px;

      color: #fff;
      font-size: 16px;
      font-weight: bold;
      margin-top: 16px;
      transition: background-color 0.25s;

      &:hover {
        background: ${shade(0.25, '#cd373b')};
      }
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
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
`;
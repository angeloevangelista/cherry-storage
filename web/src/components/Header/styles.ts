import styled, { css } from 'styled-components';

interface ContentProps {
  hideLogo?: boolean;
}

export const Container = styled.header`
  background: #ca484c;
  height: 7rem;
  display: flex;
  width: 100%;
`;

export const Content = styled.div<ContentProps>`
  flex: 1;
  display: flex;

  justify-content: space-between;
  align-items: center;

  padding: 1rem 2rem;
  max-width: 1000px;
  margin: 0 auto;

  a {
    text-decoration: none;
    display: flex;
    align-content: center;
    padding: 0.4rem;
    transition: opacity 0.25s;

    &:hover {
      opacity: 0.75;
    }
  }

  > img {
    width: 16rem;
    height: 20rem;
  }

  ${(props) => props.hideLogo
    && css`
      @media only screen and (max-width: 800px) {
        > img {
          display: none;
        }
      }
    `}
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  width: 16rem;

  strong {
    text-align: right;
    flex: 1;
  }

  a {
    z-index: 1;
    margin-left: 1rem;
    display: flex;
    align-content: center;

    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }
  }

  @media only screen and (max-width: 800px) {
    width: 8rem;
    justify-content: flex-end;

    strong {
      display: none;
    }

    /* isto aqui pode interferir no toast */
    a {
      margin-left: 2rem;
      z-index: 1;
    }
  }
`;

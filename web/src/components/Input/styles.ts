import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  font-size: 1.4rem;
  border-radius: 1.2rem;
  background: #fff;
  padding: 1.4rem;
  width: 100%;
  transition: 0.25s;

  border: solid 2px #fff;
  color: #220e03;

  display: flex;
  align-items: center;

  ${(props) => props.isErrored
    && css`
      border-color: #c53030;
    `}

  ${(props) => props.isFocused
    && css`
      border: solid 2px #b56868;

      color: #b56868;
    `}

  ${(props) => props.isFilled
    && css`
      color: #b56868;
    `}

  & + div {
    margin-top: 1rem;
  }

  input {
    background: transparent;
    flex: 1;
    border: 0;

    &::placeholder {
      color: #220e03;
    }
  }

  svg {
    margin-right: 1.4rem;
  }
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  margin-left: 1.4rem;

  svg {
    margin: 0;
  }

  span {
    background: #f7514d;

    &::before {
      border-color: #f7514d transparent;
    }
  }
`;

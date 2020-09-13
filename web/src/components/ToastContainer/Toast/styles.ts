import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'info' | 'success' | 'error';
  hasDescription: boolean;
}

const toastTypeVariation = {
  info: css`
    background: #ebf8f0;
    color: #777777;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  width: 30rem;
  z-index: 1;

  position: relative;
  padding: 1.2rem 4rem 1.2rem 1.2rem;
  border-radius: 1rem;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  ${(props) => toastTypeVariation[props.type || 'info']}

  & + div {
    margin-top: 1rem;
  }

  > svg {
    margin: 0.2rem 0.6rem 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 0.4rem;
      font-size: 1.4rem;
      opacity: 0.8;
      line-height: 2rem;
    }
  }

  button {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    background: transparent;
    border: 0;
    color: inherit;
  }

  ${(props) => !props.hasDescription
    && css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;

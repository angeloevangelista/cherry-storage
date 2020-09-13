import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  color: string;
  background: string;
  loading?: boolean;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  border-radius: 10px;
  border: 0;

  width: 100%;
  height: 56px;

  background: ${(props) => props.background};
  padding: 0 16px;

  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
  transition: background-color 0.25s;

  ${(props) => (props.loading
    ? css`
          opacity: 0.75;
          cursor: not-allowed;

          &:hover {
            background: ${props.background};
          }
        `
    : css`
          &:hover {
            background: ${shade(0.25, props.background)};
          }
        `)}

  svg {
    position: absolute;
    right: 1.6rem;
    animation: ${spin} 3s infinite linear;
  }
`;

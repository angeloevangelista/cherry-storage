import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 20rem;
    color: #fff;
    background: #99292c;
    padding: 0.8rem;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.25s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 0.8rem);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      position: absolute;
      border-style: solid;
      border-color: #99292c transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: initial;
  }
`;

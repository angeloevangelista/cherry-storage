import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;

  label {
    cursor: pointer;
    border: 2px solid #ca484c;
    border-radius: 50%;
    width: 15rem;
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    &:hover {
      opacity: 0.75;
    }

    img {
      width: 15rem;
      height: 15rem;
      border-radius: 50%;
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;

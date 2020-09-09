import styled from 'styled-components';

export const Container = styled.div`
  font-size: 14px;
  color: #220e03;
  border-radius: 10px;
  border: solid 2px #fff;
  background: #fff;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    background: transparent;
    flex: 1;
    border: 0;

    &::placeholder{
      color: #220e03;
    }
  }

  svg {
    margin-right: 16px;
    color: #220e03;
  }
`;

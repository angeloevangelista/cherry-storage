import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
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
`;

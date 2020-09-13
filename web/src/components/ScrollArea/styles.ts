import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    /* 1 */
    width: 1rem;
  }
  &::-webkit-scrollbar-button {
    /* 2 */
  }
  &::-webkit-scrollbar-track {
    /* 3 */
    /* box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track-piece {
    /* 4 */
  }
  &::-webkit-scrollbar-thumb {
    /* 5 */
    border-radius: 10px;
    background: #fff;
  }
  &::-webkit-scrollbar-corner {
    /* 6 */
  }
  &::-webkit-resizer {
    /* 7 */
  }
`;

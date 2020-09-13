import styled from 'styled-components';

export const Container = styled.div`
  form {
    margin: 0 4rem;
    flex: 1;
  }

  @media only screen and (max-width: 800px) {
    > img {
      display: none;
    }

    form {
      margin: 0rem;
    }
  }
`;

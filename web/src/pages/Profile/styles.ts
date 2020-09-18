import styled from 'styled-components';

export const Container = styled.div`
  header {
    position: fixed;
    z-index: 1;
  }
`;

export const ProfileContainer = styled.div`
  height: 100vh;
  max-width: 700px;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4rem 10rem 0 10rem;

  form {
    flex: 1;
  }
`;

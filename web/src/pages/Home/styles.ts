import styled from 'styled-components';

export const Container = styled.div`
  /* display: flex; */

  header {
    position: fixed;
    z-index: 1;
  }

  form {
    margin: 0 4rem;
    flex: 1;
  }

  @media only screen and (max-width: 800px) {
    form {
      margin: 0rem;
    }
  }
`;

export const Content = styled.div`
  /* padding: 7rem 0; */
  padding-top: 7rem;
  display: flex;
`;

export const FileControl = styled.aside`
  position: fixed;
  /* background: #333; */
  display: flex;
  flex-direction: column;
  width: 24rem;
  height: calc(100vh - 7rem);
`;

export const FilesContainer = styled.div`
  padding-left: 24rem;
`;

export const FileList = styled.table``;

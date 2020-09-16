import { darken } from 'polished';
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
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
  padding-top: 7rem;
  display: flex;
`;

export const FileControl = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 24rem;
  height: calc(100vh - 7rem);
  transition: margin-left 0.3s;

  input {
    width: 100%;

    &::-webkit-file-upload-button {
    }
  }

  button {
    margin-bottom: 2rem;
  }

  @media only screen and (max-width: 800px) {
    margin-left: -24rem;
  }
`;

export const UsageInfo = styled.fieldset`
  border: 0;

  legend {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  > div {
    width: 100%;
    margin-top: 1rem;
    background: #ccc;
    border-radius: 3rem;
    overflow: hidden;

    div {
      height: 0.4rem;
      width: ${`${(500 / 2048) * 100}%`};
      background: #4285f4;
    }
  }
`;

export const FilesContainer = styled.div`
  margin-left: calc(24rem);
  transition: margin-left 0.3s;
  padding: 4rem;
  width: 100%;

  @media only screen and (max-width: 800px) {
    margin-left: 0;
  }
`;

export const FileList = styled.table`
  width: 100%;
  margin-top: 4rem;
  background: transparent;
  border-spacing: 0 0.5rem;
  text-align: left;
  border-collapse: collapse;

  thead tr {
    th {
      padding-bottom: 1rem;
      color: #444444;
      font-size: 1.6rem;
      border-bottom: 1px solid #4444;

      &:last-child {
        text-align: center;
      }
    }
  }
`;

interface FileItemProps {
  downloading?: boolean;
}

export const FileItem = styled.tr<FileItemProps>`
  line-height: 30px;
  padding-top: 0.5rem;

  &:hover td {
    background: ${darken(0.05, '#eeeeee')};
  }

  td {
    padding: 1rem 0 1rem 1rem;
    vertical-align: middle;
    display: table-cell;

    div {
      display: flex;
      justify-content: space-around;

      button {
        padding: 0.6rem;
        border: 0;
        background: transparent;
        border-radius: 50%;
        display: flex;
        align-content: center;

        &:hover {
          background: #bbb;
        }

        ${(props) => props.downloading
          && css`
            &:last-child {
              cursor: not-allowed;

              svg {
                animation: ${spin} 3s infinite linear;
              }
            }
          `}
      }
    }
  }

  & + tr td {
    border-top: 1px solid #4444;
  }
`;

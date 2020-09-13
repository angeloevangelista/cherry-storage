import React, { useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Form } from '@unform/web';

import Header from '../../components/Header';
import Button from '../../components/Button';
import ScrollArea from '../../components/ScrollArea';

import Input from '../../components/Input';

import {
  Container,
  FileControl,
  FilesContainer,
  Content,
  FileList,
} from './styles';

const Home: React.FC = () => {
  const handleSearchSubmit = useCallback(() => {}, []);

  return (
    <Container>
      <Header hideLogo>
        <Form onSubmit={handleSearchSubmit}>
          <Input name="search" icon={FiSearch} placeholder="Pesquisar" />
        </Form>
      </Header>

      <Content>
        <FileControl>
          <ScrollArea>
            <Button background="#ddd" color="#010101">
              Novo arquivo
            </Button>

            <fieldset>
              <legend>Uso de armazenamento</legend>

              <strong>Usado: </strong>
              <span>2,4gb</span>

              <strong>Livre: </strong>
              <span>2,6gb</span>

              <div />
            </fieldset>
          </ScrollArea>
        </FileControl>

        <FilesContainer>
          <h1>Home</h1>

          <FileList>
            <thead>
              <td>Nome</td>
              <td>Última modificação</td>
            </thead>
          </FileList>
        </FilesContainer>
      </Content>
    </Container>
  );
};

export default Home;

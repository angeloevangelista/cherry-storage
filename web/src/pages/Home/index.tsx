import React, { useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Form } from '@unform/web';

import Header from '../../components/Header';

import Input from '../../components/Input';

import { Container } from './styles';

const Home: React.FC = () => {
  const handleSearchSubmit = useCallback(() => {}, []);

  return (
    <Container>
      <Header>
        <Form onSubmit={handleSearchSubmit}>
          <Input name="search" icon={FiSearch} placeholder="Pesquisar" />
        </Form>
      </Header>
      <h1>Home</h1>
    </Container>
  );
};

export default Home;

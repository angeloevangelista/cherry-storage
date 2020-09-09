import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft, FiMail, FiLock, FiUser, FiBookmark,
} from 'react-icons/fi';

import logoImg from '../../assets/images/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="Cherry Storage" />

      <form>
        <h1>Faça seu cadastro</h1>

        <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
        <Input name="surname" icon={FiBookmark} type="text" placeholder="Sobrenome" />
        <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Cadastrar</Button>
      </form>

      <Link to="/">
        <FiArrowLeft />
        <span>Voltar para logon</span>
      </Link>
    </Content>
  </Container>
);

export default SignUp;

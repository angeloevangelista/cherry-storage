import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/images/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Cherry Storage" />

      <form>
        <h1>Fazer logon</h1>

        <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>
        <Link to="/forgot">Esqueci minha senha</Link>
      </form>

      <Link to="/signup">
        <FiLogIn />
        <span>Criar conta</span>
      </Link>
    </Content>
    <Background />
  </Container>
);

export default SignIn;

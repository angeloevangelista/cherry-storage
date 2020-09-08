import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/images/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Cherry Storage" />

      <form>
        <h1>Fazer login</h1>

        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>
        <a href="/forgot">Esqueci minha senha</a>
      </form>

      <a href="/register">
        <FiLogIn />
        <span>Criar conta</span>
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;

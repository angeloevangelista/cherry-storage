import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiUser,
  FiBookmark,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/images/logo.svg';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

interface SignUpData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignUpData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .notOneOf(['Hello', 'hello'], 'World!')
          .required('O nome é obrigatório.'),
        surname: Yup.string().required('O sobrenome é obrigatório.'),
        email: Yup.string()
          .email('Insira um email válido.')
          .required('O E-mail é obrigatório.'),
        password: Yup.string().min(
          6,
          'A senha deve ter ao menos 6 caracteres.',
        ),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="Cherry Storage" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input
            name="surname"
            icon={FiBookmark}
            type="text"
            placeholder="Sobrenome"
          />
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          <span>Voltar para logon</span>
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;

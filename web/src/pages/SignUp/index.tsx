import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

import { User } from '../../hooks/auth';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/images/logo.svg';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container, Content, AnimationContainer, Background,
} from './styles';

interface SignUpData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpData) => {
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

        setLoading(true);

        await schema.validate(data, { abortEarly: false });

        const {
          name, surname, email, password,
        } = data;

        await api.post<User>('users', {
          name,
          surname,
          email,
          password,
        });

        setLoading(false);

        addToast({
          type: 'success',
          tittle: 'Sucesso',
          description: 'O cadastro foi realizado com sucesso.',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          setLoading(false);
          return;
        }

        if (err.response.data.message === 'Email already used') {
          addToast({
            type: 'error',
            tittle: 'Usuário existente',
            description:
              'Já existe um usuário com este email, apenas faça logon.',
          });

          history.push('/');
        } else {
          addToast({
            type: 'error',
            tittle: 'Erro na criação',
            description: 'Houve um erro ao realizar o cadastro.',
          });
        }

        setLoading(false);
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
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
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            <span>Voltar para logon</span>
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;

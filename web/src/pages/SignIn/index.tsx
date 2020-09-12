import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiLogIn, FiMail, FiLock,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/images/logo.svg';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container, Content, AnimationContainer, Background,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (formData: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Insira um email válido')
            .required('O E-mail é obrigatório'),
          password: Yup.string().required('A senha é obrigatória'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        setLoading(true);

        const { email, password } = formData;

        await signIn({ email, password });

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            tittle: 'Erro na autenticação',
            description: 'Houve um erro ao fazer login, cheque as credenciais',
          });
        }

        setLoading(false);
      }
    },
    [addToast, signIn],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Cherry Storage" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Fazer logon</h1>

            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit" loading={loading}>
              Entrar
            </Button>
            <Link to="/forgot">Esqueci minha senha</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            <span>Criar conta</span>
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;

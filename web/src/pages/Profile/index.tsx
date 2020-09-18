import { Form } from '@unform/web';
import React, { useCallback, useState } from 'react';
import { FiUser, FiBookmark } from 'react-icons/fi';

import Input from '../../components/Input';
import ImageInput from '../../components/ImageInput';
import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';

import { Container, ProfileContainer } from './styles';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ProfileFormData {
  avatar: File;
  name: string;
  surname: string;
}

const Profile: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { addToast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = useCallback(
    async ({ avatar }: ProfileFormData) => {
      try {
        setUploading(true);

        const htmlFormData = new FormData();

        htmlFormData.append('avatar', avatar);

        const response = await api.patch('users/avatar', htmlFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        refreshUser(response.data);

        setUploading(false);

        addToast({
          type: 'success',
          tittle: 'Atualizado',
          description: 'O perfil foi atualizado com sucesso',
        });
      } catch {
        addToast({
          type: 'error',
          tittle: 'Falha ao Atualizar',
          description: 'Houve uma falha ao atualizar o perfil, tente novamente',
        });

        setUploading(false);
      }
    },
    [addToast, refreshUser],
  );

  return (
    <Container>
      <Header isProfile />
      <ProfileContainer>
        <Form initialData={user} onSubmit={handleSubmit}>
          <ImageInput name="avatar" avatar_url={user.avatar_url} />

          <Input disabled name="name" placeholder="Nome" icon={FiUser} />
          <Input
            disabled
            name="surname"
            placeholder="Sobrenome"
            icon={FiBookmark}
          />
          {/* <Input name="email" placeholder="E-mail" icon={FiMail} />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            icon={FiLock}
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirme sua senha"
            icon={FiLock}
          /> */}

          <Button loading={uploading} type="submit">
            Atualizar perfil
          </Button>
        </Form>
      </ProfileContainer>
    </Container>
  );
};

export default Profile;

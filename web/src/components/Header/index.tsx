import React from 'react';
import { Link } from 'react-router-dom';

import logoWhiteImg from '../../assets/images/logo-white.svg';

import { useAuth } from '../../hooks/auth';

import { Container, Content, UserInfo } from './styles';

const Header: React.FC = ({ children }) => {
  const { user } = useAuth();

  return (
    <Container>
      <Content>
        <img src={logoWhiteImg} alt="Cherry Storage" />

        {children}

        <UserInfo>
          <strong>{user.name}</strong>
          <Link to="profile">
            <img
              title={`${user.name} ${user.surname}`}
              src={
                user.avatar_url
                  ? user.avatar_url
                  : 'https://api.adorable.io/avatars/50/dot@adorable.io.png'
              }
              alt={user.name}
            />
          </Link>
        </UserInfo>
      </Content>
    </Container>
  );
};

export default Header;

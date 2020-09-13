import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoWhiteImg from '../../assets/images/logo-white.svg';

import { useAuth } from '../../hooks/auth';

import { Container, Content, UserInfo } from './styles';

interface HeaderProps {
  isProfile?: boolean;
  hideLogo?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideLogo, isProfile, children }) => {
  const { user } = useAuth();

  return (
    <Container>
      <Content hideLogo={hideLogo}>
        {isProfile && (
          <Link to="/home">
            <FiArrowLeft color="#fff" size={24} />
          </Link>
        )}

        <img src={logoWhiteImg} alt="Cherry Storage" />

        {children}

        {!isProfile && (
          <UserInfo>
            <strong>{user.name}</strong>
            <Link to="profile">
              <img
                title={`${user.name} ${user.surname}`}
                src={
                  user.avatar_url
                    ? user.avatar_url
                    : `https://api.adorable.io/avatars/50/${user.name}@adorable.io.png`
                }
                alt={user.name}
              />
            </Link>
          </UserInfo>
        )}
      </Content>
    </Container>
  );
};

export default Header;

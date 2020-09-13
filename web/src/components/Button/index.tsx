import React, { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  background?: string;
  color?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  background = '#cd373b',
  color = '#fff',
  ...rest
}) => (
  <Container
    color={color}
    background={background}
    loading={loading}
    disabled={loading}
    type="button"
    {...rest}
  >
    {children}
    {loading && <FiLoader size={24} />}
  </Container>
);

export default Button;

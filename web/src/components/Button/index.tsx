import React, { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container loading={loading} disabled={loading} type="button" {...rest}>
    {children}
    {loading && <FiLoader size={24} />}
  </Container>
);

export default Button;

import React, { useEffect, CSSProperties } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  style: CSSProperties;
  message: ToastMessage;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({
  style,
  message: {
    id, tittle, description, type,
  },
}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), 3000);

    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <Container style={style} key={id} type={type} hasDescription={!!description}>
      {icons[type || 'info']}
      <div>
        <strong>{tittle}</strong>
        {description && <p>{description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;

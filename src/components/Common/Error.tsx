import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ConfirmButton,
  ModalContent,
  Overlay,
} from '../../styles/ModalCommonStyles';

interface ErrorModalProps {
  message: string;
}

const Error: React.FC<ErrorModalProps> = ({ message }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/');
  };

  return (
    <Overlay>
      <ModalContent>
        {message || '오류가 발생했습니다.'}
        <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
      </ModalContent>
    </Overlay>
  );
};

export default Error;

import React from 'react';
import { ModalContent, Overlay } from '../../styles/ModalCommonStyles';

const Loading: React.FC = () => {
  return (
    <Overlay>
      <ModalContent>데이터를 불러오고 있습니다...</ModalContent>
    </Overlay>
  );
};

export default Loading;

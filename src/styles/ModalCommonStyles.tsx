import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); // 투명도가 적용된 검은색
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: rgba(255, 255, 255, 0.9); // 모달의 배경 색상
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); // 그림자 효과
  width: 50%; // 필요에 따라 크기 조절
  text-align: center;

  display: flex;
  flex-direction: column;
`;

export const ConfirmButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff; // 파란색, 원하는 색상으로 수정 가능
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; // 호버 시 색상 변경
  }
`;

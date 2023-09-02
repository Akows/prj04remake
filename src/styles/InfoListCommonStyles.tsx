import styled from 'styled-components';

export const ListContainers = styled.div`
  max-width: 1200px; // max-width로 수정
  width: 100%; // 100%로 설정하여 화면 크기에 따라 조절되게 함
  height: auto;

  margin-top: 80px;
`;

export const ListBody = styled.div`
  width: 98%;
  height: 99%;
  margin: 5px;
  display: flex;
  flex-direction: row; // 가로로 정렬.
  flex-wrap: wrap; // 아이템들이 여러 줄로 표시되도록 함.
`;

export const ItemOuterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 48%; // 가로 너비를 50% 대신에 48%로 설정하여 좌우 여백을 생성
  height: 150px;
  margin: 15px 1%; // 상하 간격을 15px로 조정하고 좌우 여백을 1%로 설정
  background-color: rgba(0, 0, 0, 0.3); // 투명도가 적용된 검정색

  transition:
    width 0.3s ease,
    margin 0.3s ease; // 부드러운 애니메이션 효과를 위해 추가

  @media (max-width: 1200px) {
    // 가로 너비가 1200px 이하일 때 적용될 스타일
    width: 100%; // 너비를 100%로 설정
    margin: 15px 0; // 좌우 여백을 0으로 설정
  }
`;

export const ItemInfoWrapper = styled.div`
  color: white; // 텍스트 색상을 흰색으로
  align-self: flex-start; // 상단에 배치
  flex-direction: column; // 세로로 배치
  gap: 5px; // 세로 간격 지정
`;

export const ItemDetails = styled.div`
  display: flex; // 가로로 배치
  gap: 15px; // 가로 간격 지정
`;

export const ItemName = styled.div`
  font-weight: bolder;
  font-size: 32px;
  margin-bottom: 5px;
  margin-left: 15px;
`;

export const StarsInfo = styled.div`
  display: flex; // 가로로 배열하기 위한 flex 추가
  gap: 5px; // 가로로 배열된 요소들 사이의 간격 지정
  margin-bottom: 5px;
  margin-left: 15px;
  font-size: 22px;
`;

export const ElementInfo = styled.div`
  display: flex; // 가로로 배열하기 위한 flex 추가
  gap: 5px; // 가로로 배열된 요소들 사이의 간격 지정
  margin-bottom: 5px;
  font-size: 22px;
`;

export const CharacterImage = styled.img`
  width: 150px;
  height: auto;
`;

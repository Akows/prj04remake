import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AppDataContext } from '../context/AppDataContext';

const MenuBar: React.FC = () => {
  const appDataContext = useContext(AppDataContext);

  if (!appDataContext) {
    throw new Error('MenuBar must be used within an AppDataProvider');
  }

  const { dispatch } = appDataContext;

  // 메뉴를 전환하는 기능.
  const handleDisplayClick = (componentName: string) => {
    dispatch({
      type: 'SET_DISPLAY',
      component: componentName,
    });
  };

  // 스크롤을 내리면 메뉴바의 투명도가 0으로 바뀌는 기능.
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppbarHead isScrolled={isScrolled}>
      <AppbarContent>
        <AppTitleArea>
          <TitleText>Genshindex</TitleText>
        </AppTitleArea>
        <ButtonArea>
          {/* <Button onClick={() => handleDisplayClick('characters')}>
            Characters
          </Button> */}
        </ButtonArea>
      </AppbarContent>
    </AppbarHead>
  );
};

export default MenuBar;

const AppbarHead = styled.div<{ isScrolled: boolean }>`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: ${props =>
    props.isScrolled ? 'rgba(0, 0, 0)' : 'rgba(0, 0, 0, 0.5)'};
  z-index: 10;
  transition: background-color 0.3s; // 부드러운 전환 효과를 위해.
`;

const AppbarContent = styled.div`
  display: flex;
  justify-content: space-between; // 가로 정렬.
  align-items: center; // 세로 중앙 정렬.
  width: 100%;
  height: 100%;
  padding: 0 20px; // 좌우에 패딩을 추가.
`;

const AppTitleArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex; // 추가
  align-items: center; // 중앙 정렬 (수직)
  justify-content: flex-start; // 좌측 정렬 (수평)

  a {
    text-decoration: none;
    color: black;
  }
`;

const TitleText = styled.div`
  font-size: xx-large;
  font-weight: bolder;
  color: white; // 텍스트 색상을 흰색으로 설정.
`;

const ButtonArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex; // 가로로 배치.
  align-items: center; // 세로 중앙 정렬.
  justify-content: flex-end; // 우측 정렬.
  gap: 10px; // 버튼 간 간격.
  padding-right: 30px; // 우측에서의 간격.
`;

const Button = styled.button`
  width: 180px;
  height: 80%;
  border-radius: 10px;
  font-size: large;
  font-weight: bolder;
  border: none;

  &:hover {
    background-color: black;
    color: white;
  }

  &:active {
    background-color: black;
    color: red;
  }
`;

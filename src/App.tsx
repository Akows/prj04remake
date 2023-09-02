import React from 'react';
import styled from 'styled-components';
import AppRouter from './router/AppRouter';
import { AppDataProvider } from './context/AppDataContext';
import backgroundImage from './assets/background.jpg';

// React.FC?
// Function Component의 약자로, 컴포넌트의 타입을 나타낸다.
// TypeScript를 사용하는 프로젝트에서는 컴포넌트를 정의할 때 일관성을 유지하기 위해 React.FC 타입을 사용하는 것이 좋다.

const App: React.FC = () => {
  return (
    <AppDataProvider>
      <AppBackGroundContainer>
        <AppRouter />
      </AppBackGroundContainer>
    </AppDataProvider>
  );
};

export default App;

const AppBackGroundContainer = styled.div`
  min-height: 100vh; // 내부 컨텐츠가 100vh를 초과해도 배경 이미지가 확장될 수 있도록.
  display: flex; // flexbox를 사용
  justify-content: center; // 수평 중앙 정렬
  align-items: flex-start; // 수직 중앙 정렬

  background-image: url(${backgroundImage});
  background-size: cover; // 배경 이미지가 컨테이너 크기에 꽉 차게 조절.
  background-repeat: no-repeat; // 이미지가 반복되지 않도록.
  background-position: center; // 이미지의 중앙이 컨테이너의 중앙과 일치하게 하도록.
  background-attachment: fixed; // 스크롤을 내려도 배경 이미지가 고정.
`;

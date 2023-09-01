import React from 'react';
import styled from 'styled-components';
import './App.css';
import AppRouter from './router/AppRouter';

import { AppDataProvider } from './context/AppDataContext';

// React.FC?
// Function Component의 약자로, 컴포넌트의 타입을 나타낸다.
// TypeScript를 사용하는 프로젝트에서는 컴포넌트를 정의할 때 일관성을 유지하기 위해 React.FC 타입을 사용하는 것이 좋다.

const App: React.FC = () => {
  return (
    <AppDataProvider>
      <CenteredContainer>
        <AppRouter />
      </CenteredContainer>
    </AppDataProvider>
  );
};

export default App;

const CenteredContainer = styled.div`
  height: 100vh; // 화면의 높이 전체를 차지
  display: flex; // flexbox를 사용
  justify-content: center; // 수평 중앙 정렬
  align-items: flex-start; // 수직 중앙 정렬
`;

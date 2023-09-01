import React from 'react';
import styled from 'styled-components';
import './App.css';
import AppRouter from './router/AppRouter';

// React.FC?
// Function Component의 약자로, 컴포넌트의 타입을 나타낸다.
// TypeScript를 사용하는 프로젝트에서는 컴포넌트를 정의할 때 일관성을 유지하기 위해 React.FC 타입을 사용하는 것이 좋다.

const App: React.FC = () => {
  return (
    <AppWrapper>
      <AppRouter />
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  width: 100vw;
  height: auto;

  display: inline-flex;
  align-items: center;
  flex-direction: column;

  border-radius: 20px;

  border: 2px solid black;

  @media (min-width: 800px) {
    width: 600px;
    height: auto;

    display: inline-flex;
    align-items: center;
    flex-direction: column;

    border-radius: 20px;

    border: 2px solid black;
  }
`;

import React from 'react';
import './App.css';
import AppRouter from './router/AppRouter';

// React.FC?
// Function Component의 약자로, 컴포넌트의 타입을 나타낸다.
// TypeScript를 사용하는 프로젝트에서는 컴포넌트를 정의할 때 일관성을 유지하기 위해 React.FC 타입을 사용하는 것이 좋다.

const App: React.FC = () => {
  return (
    <div>
      <AppRouter />
    </div>
  );
};

export default App;

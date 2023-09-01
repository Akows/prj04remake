import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '../pages/MainPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={MainPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

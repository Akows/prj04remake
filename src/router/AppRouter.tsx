import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InfoItemPage from '../pages/InfoItemPage';

import MainPage from '../pages/MainPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/infoitem/:name" Component={InfoItemPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

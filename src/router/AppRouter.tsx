import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import IntroducePage from '../pages/IntroducePage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/introduce" Component={IntroducePage} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../router/AppRouter';

test('renders MainPage component for the root route', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <AppRouter />
    </MemoryRouter>,
  );

  // 가정: MainPage 컴포넌트에 "MainPage"라는 텍스트가 있다.
  expect(getByText('MainPage')).toBeInTheDocument();
});

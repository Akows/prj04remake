import React, { useContext } from 'react';
import styled from 'styled-components';
import CharactersList from '../components/CharactersList';
import MenuBar from '../components/MenuBar';
import { AppDataContext } from '../context/AppDataContext';

const MainPage: React.FC = () => {
  const contextValue = useContext(AppDataContext);

  if (!contextValue) {
    // contextValue가 제대로 설정되지 않았을 때의 처리를 여기에 적어주세요.
    throw new Error(
      'MainPage component must be rendered within AppDataProvider',
    );
  }

  const { state } = contextValue;

  return (
    <MainPageWrapper>
      <MenuBar />
      {state.displayComponent === 'characters' && <CharactersList />}
    </MainPageWrapper>
  );
};

export default MainPage;

const MainPageWrapper = styled.div`
  width: 100vw;
  height: auto;

  display: inline-flex;
  align-items: center;
  flex-direction: column;

  border-radius: 20px;
`;

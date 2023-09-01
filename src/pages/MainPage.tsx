import React, { useContext } from 'react';
import styled from 'styled-components';
import CharactersList from '../components/CharactersList';
import IntroduceMySelf from '../components/IntroduceMySelf';
import MenuBar from '../components/MenuBar';
import WeaponsList from '../components/WeaponsList';
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
      {state.displayComponent === 'weapons' && <WeaponsList />}
      {state.displayComponent === 'introducemyself' && <IntroduceMySelf />}
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

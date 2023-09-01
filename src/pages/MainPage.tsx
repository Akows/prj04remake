import React from 'react';
import styled from 'styled-components';
import CharactersList from '../components/CharactersList';
import MenuBar from '../components/MenuBar';

const MainPage: React.FC = () => {
  return (
    <MainPageWrapper>
      <MenuBar />
      <CharactersList />
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

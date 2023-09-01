import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import menuimg from '../assets/menu.png';
import { AppDataContext } from '../context/AppDataContext';

const MenuBar: React.FC = () => {
  const appDataContext = useContext(AppDataContext);

  if (!appDataContext) {
    throw new Error('MenuBar must be used within an AppDataProvider');
  }

  const { dispatch } = appDataContext;

  const handleDisplayClick = (componentName: string) => {
    dispatch({
      type: 'SET_DISPLAY',
      component: componentName,
    });
  };

  return (
    <AppbarHead>
      <AppbarHeadUpper>
        <MenuButtonArea>
          <Link to="/introduce">
            <MenuButton>
              <MenuImage src={menuimg} alt={'menuimg'} />
            </MenuButton>
          </Link>
        </MenuButtonArea>
        <AppTitleArea>
          <TitleText onClick={() => handleDisplayClick('introducemyself')}>
            Genshindex
          </TitleText>
        </AppTitleArea>
      </AppbarHeadUpper>

      <AppbarHeadLower>
        <ButtonArea>
          <LowerButton onClick={() => handleDisplayClick('characters')}>
            Characters
          </LowerButton>
        </ButtonArea>
        <ButtonArea>
          <LowerButton onClick={() => handleDisplayClick('weapons')}>
            Weapons
          </LowerButton>
        </ButtonArea>
      </AppbarHeadLower>
    </AppbarHead>
  );
};

export default MenuBar;

const AppbarHead = styled.div`
  width: 100%;
  height: 120px;
`;

const AppbarHeadUpper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
`;

const MenuButtonArea = styled.div`
  width: 10%;
  height: 100%;
`;

const MenuButton = styled.button`
  width: 40px;
  height: 40px;
  margin-top: 15px;
  margin-left: 25px;
  border-radius: 10px;
  background-color: gray;
  border: none;
  outline: none;

  &:active {
    background-color: whitesmoke;
  }
`;

const MenuImage = styled.img`
  width: 100%;
  height: 100%;
  margin-top: 2px;
`;

const AppTitleArea = styled.div`
  width: 90%;
  height: 100%;
  text-align: center;

  a {
    text-decoration: none;
    color: black;
  }
`;

const TitleText = styled.div`
  font-family: 'GIfont';
  font-size: xx-large;
  font-weight: bolder;
  margin-top: 18px;
`;

const AppbarHeadLower = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
`;

const ButtonArea = styled.div`
  width: 50%;
  height: 100%;
`;

const LowerButton = styled.button`
  width: 90%;
  height: 60%;
  margin-top: 10px;
  border-radius: 10px;
  font-family: 'GIfont';
  font-size: large;
  font-weight: bolder;
  border: none;

  &:hover {
    background-color: black;
    color: white;
  }

  &:active {
    background-color: black;
    color: red;
  }
`;

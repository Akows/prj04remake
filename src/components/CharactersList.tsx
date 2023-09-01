import React from 'react';
import styled from 'styled-components';

const CharactersList: React.FC = () => {
  return (
    <ListContainer>
      <ListBody>
        <ItemOuterWrapper>
          <ItemWrapper>
            <ItemTextWrapper>
              <ItemName>datas</ItemName>
            </ItemTextWrapper>
          </ItemWrapper>
        </ItemOuterWrapper>
      </ListBody>
    </ListContainer>
  );
};

export default CharactersList;

const ListContainer = styled.div`
  width: 100%;
  height: auto;
`;

const ListBody = styled.div`
  width: 98%;
  height: 99%;
  margin: 5px;
`;

const ItemOuterWrapper = styled.div`
  a {
    text-decoration: none;
    color: black;
  }
`;

const ItemWrapper = styled.div`
  width: 98%;
  height: 150px;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  border: 1px solid black;
`;

const ItemTextWrapper = styled.div`
  width: 70%;
  height: 95%;
  margin: 3px;
  border-radius: 10px;
  font-family: 'GIfont';
  font-size: x-large;
  font-weight: bolder;
`;

const ItemName = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 3px;
`;

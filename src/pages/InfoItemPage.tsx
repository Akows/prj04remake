import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  ItemOuterWrapper,
  ItemInfoWrapper,
  ItemDetails,
  ItemName,
  RarityInfo,
  VisionInfo,
} from '../styles/InfoListCommonStyles';

const InfoItemPage: React.FC = () => {
  const location = useLocation();
  const characterData = location.state?.characterData;

  const { name } = useParams();

  return (
    <>
      <ItemOuterWrapper imagePath={`/assets/characterImage/${name}.png`}>
        <ItemInfoWrapper>
          <ItemName>{characterData.name}</ItemName>
          <ItemDetails>
            <RarityInfo>{characterData.rarity}✦</RarityInfo>
            {characterData.vision && (
              <VisionInfo>{characterData.vision}</VisionInfo>
            )}
          </ItemDetails>
        </ItemInfoWrapper>
      </ItemOuterWrapper>

      <p>{name}</p>
      <br />
      <p>{characterData.name}</p>
      <br />
      <p>{characterData.vision}</p>
      <br />
      <p>{characterData.weapon}</p>
      <br />
      <p>{characterData.nation}</p>
      <br />
      <p>{characterData.affiliation}</p>
      <br />
      <p>{characterData.rarity}✦</p>
      <br />
      <p>{characterData.birthday}</p>
    </>
  );
};

export default InfoItemPage;

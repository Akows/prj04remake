import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ItemOuterWrapper,
  ItemInfoWrapper,
  ItemDetails,
  ItemName,
  RarityInfo,
  VisionInfo,
} from '../styles/InfoListCommonStyles';

const InfoItemPage: React.FC = () => {
  // 상세 페이지에서는 데이터를 어떻게 다루어야 하는가?
  // 제일 간단한 방법 : param으로 키워드만 받아서 데이터를 다시 호출.
  // 혹은 이전 컴포넌트에서 useNavigate나 Link 태그로 state 전달.
  // 다만 이 방법의 경우 상세 페이지 url을 복사 붙여넣기 할 경우 페이지가 렌더링 되지 않는다.

  const { name } = useParams();

  const location = useLocation();
  const characterData = location.state?.characterData;

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getCharacterImagePath = (characterName: string) => {
    const formattedName = capitalizeFirstLetter(characterName);
    const encodedName = encodeURIComponent(formattedName); // 인코딩 추가
    return `/assets/characterImage/${encodedName}.png`;
  };

  const imagePath = getCharacterImagePath(`${name}`);

  // 상세 페이지 url을 복사 붙여넣기 할 경우 페이지가 렌더링 되지 않는 문제 방지. (딥 링크 문제.)
  const navigate = useNavigate();

  useEffect(() => {
    if (!characterData) {
      alert('잘못된 접근입니다.'); // 경고창 출력
      navigate('/'); // 메인 페이지로 리다이렉트
    }
  }, [characterData, navigate]);

  if (!characterData) {
    return null;
  }

  return (
    <>
      <ItemOuterWrapper imagePath={imagePath}>
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

import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  ItemOuterWrapper,
  ItemInfoWrapper,
  ItemDetails,
  ItemName,
  RarityInfo,
  VisionInfo,
} from '../styles/InfoListCommonStyles';
import { getCharacterImagePath } from '../util/getCharacterImagePath';

type SkillTalent = {
  name: string;
  unlock: string;
  description: string;
  type: string;
};

type PassiveTalent = {
  name: string;
  unlock: string;
  description: string;
  level: number;
};

type Constellation = {
  name: string;
  unlock: string;
  description: string;
  level: number;
};

type CharacterData = {
  name: string;
  title: string;
  vision: string;
  weapon: string;
  nation: string;
  affiliation: string;
  rarity: number;
  constellation: string;
  birthday: string;
  description: string;
  skillTalents: SkillTalent[];
  passiveTalents: PassiveTalent[];
  constellations: Constellation[];
  vision_key: string;
  weapon_type: string;
};

const InfoItemPage: React.FC = () => {
  // 상세 페이지에서는 데이터를 어떻게 다루어야 하는가?
  // 제일 간단한 방법 : param으로 키워드만 받아서 데이터를 다시 호출.
  // 혹은 이전 컴포넌트에서 useNavigate나 Link 태그로 state 전달.
  // 다만 이 방법의 경우 상세 페이지 url을 복사 붙여넣기 할 경우 페이지가 렌더링 되지 않는다.

  const location = useLocation();
  const characterData = location.state?.characterData;

  // 이미지 경로 불러오기.
  const imagePath = getCharacterImagePath(`${characterData.name}`);

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
    <ContentWrapper>
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

      <InfoBox>
        <InfoContent>
          <InfoTitle>기본 정보</InfoTitle>
          <div>
            <p>제목: {characterData.title}</p>
            <p>무기: {characterData.weapon}</p>
            <p>국가: {characterData.nation}</p>
            <p>소속: {characterData.affiliation}</p>
            <p>생일: {characterData.birthday}</p>
          </div>
        </InfoContent>
      </InfoBox>

      <InfoBox>
        <InfoContent>
          <InfoTitle>설명</InfoTitle>
          <div>
            <p>{characterData.description}</p>
          </div>
        </InfoContent>
      </InfoBox>

      <InfoBox>
        <InfoContent>
          <InfoTitle>스킬</InfoTitle>
          {/* 본문 */}
          {characterData.skillTalents.map(
            (skill: SkillTalent, index: number) => (
              <div key={index}>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </div>
            ),
          )}
        </InfoContent>
      </InfoBox>

      <InfoBox>
        <InfoContent>
          <InfoTitle>탈렌트</InfoTitle>
          {characterData.passiveTalents.map(
            (talent: PassiveTalent, index: number) => (
              <div key={index}>
                <h3>{talent.name}</h3>
                <p>{talent.description}</p>
              </div>
            ),
          )}
        </InfoContent>
      </InfoBox>

      <InfoBox>
        <InfoContent>
          <InfoTitle>별자리</InfoTitle>
          {characterData.constellations.map(
            (constellation: Constellation, index: number) => (
              <div key={index}>
                <h3>{constellation.name}</h3>
                <p>{constellation.description}</p>
              </div>
            ),
          )}
        </InfoContent>
      </InfoBox>
    </ContentWrapper>
  );
};

export default InfoItemPage;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column; // 세로로 정렬
  align-items: center; // 가운데 정렬
`;

const InfoBox = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex; // 가로로 정렬
  justify-content: space-between; // 요소들 사이에 간격을 줌
  max-width: 1200px; // 가로 최대 너비 설정
  width: 100%; // 전체 너비를 차지

  @media (max-width: 1200px) {
    flex-wrap: wrap; // 화면 너비에 따라 요소들을 유연하게 처리하기 위해 wrap 적용
  }
`;

const InfoTitle = styled.h2`
  border-bottom: 1px solid white;
  padding-bottom: 10px;
  margin-bottom: 15px;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column; // 세로 방향으로 정렬
  justify-content: space-between; // 상단과 하단에 각각 InfoTitle과 본문 위치
  height: 100%; // InfoContent의 높이를 최대로

  @media (max-width: 1200px) {
    margin-left: 20px;
  }
`;

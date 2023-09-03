import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
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

const InfoItemPage: React.FC = () => {
  // 드롭다운 메뉴를 관리하기 위한 상태 변수들.
  const [skillDropdownOpen, setSkillDropdownOpen] = useState<number | null>(
    null,
  );
  const [talentDropdownOpen, setTalentDropdownOpen] = useState<number | null>(
    null,
  );
  const [constellationDropdownOpen, setConstellationDropdownOpen] = useState<
    number | null
  >(null);

  // 상세 페이지에서는 데이터를 어떻게 다루어야 하는가?
  // 제일 간단한 방법 : param으로 키워드만 받아서 데이터를 다시 호출.
  // 혹은 이전 컴포넌트에서 useNavigate나 Link 태그로 state 전달.
  // 다만 이 방법의 경우 상세 페이지 url을 복사 붙여넣기 할 경우 페이지가 렌더링 되지 않는다.

  const location = useLocation();
  const characterData = location.state?.characterData;

  // 이미지 경로 불러오기.
  const imagePath = getCharacterImagePath(`${characterData.name}`);

  // 생일 데이터의 존재하지 않는 4자리 년도 부분을 제거하는 함수.
  const getMonthAndDay = (birthday: string) => {
    const dateParts = birthday.split('-');
    return `${dateParts[1]}-${dateParts[2]}`; // MM-DD 형식 반환
  };

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
            <p>별명: {characterData.title}</p>
            <p>무기: {characterData.weapon}</p>
            <p>국가: {characterData.nation}</p>
            <p>소속: {characterData.affiliation}</p>
            <p>생일: {getMonthAndDay(characterData.birthday)}</p>
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
          {characterData.skillTalents.map(
            (skill: SkillTalent, index: number) => (
              <div
                key={index}
                onClick={() =>
                  setSkillDropdownOpen(prev => (prev === index ? null : index))
                }
              >
                <h3>{skill.name}</h3>
                <DropdownContent isOpen={skillDropdownOpen === index}>
                  <p>{skill.description}</p>
                </DropdownContent>
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
              <div
                key={index}
                onClick={() =>
                  setTalentDropdownOpen(prev => (prev === index ? null : index))
                }
              >
                <h3>{talent.name}</h3>
                <DropdownContent isOpen={talentDropdownOpen === index}>
                  <p>{talent.description}</p>
                </DropdownContent>
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
              <div
                key={index}
                onClick={() =>
                  setConstellationDropdownOpen(prev =>
                    prev === index ? null : index,
                  )
                }
              >
                <h3>{constellation.name}</h3>
                <DropdownContent isOpen={constellationDropdownOpen === index}>
                  <p>{constellation.description}</p>
                </DropdownContent>
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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  max-height: ${props =>
    props.isOpen ? '200px' : '0'}; // 이 값은 필요에 따라 조절할 수 있습니다.
  overflow-y: auto; // 내용이 영역을 초과하면 스크롤바 표시
  transition: max-height 0.5s ease-out; // 높이 변경에 대한 부드러운 효과
  display: block; // 항상 block으로 설정하며, max-height로 드롭다운의 표시 여부를 제어합니다.
  animation: ${fadeIn} 0.3s forwards;
`;

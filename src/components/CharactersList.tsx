import React from 'react';
import styled from 'styled-components';
import useFetchCharacters from '../hooks/useFetchCharacters';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Error from './common/Error';
import Loading from './common/Loading';

const CharactersList: React.FC = () => {
  const { page, lastCharacterElementRef } = useInfiniteScroll();
  const { data, loading, error } = useFetchCharacters(page);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  console.log(data);

  return (
    <ListContainer>
      <ListBody>
        {data.map((character, index) => {
          const isLastElement = data.length === index + 1;
          return (
            <ItemOuterWrapper
              ref={isLastElement ? lastCharacterElementRef : null}
              key={character}
            >
              <ItemInfoWrapper>
                <ItemName>{character.name}</ItemName>
                <ItemDetails>
                  <StarsInfo>{character.rarity}✦</StarsInfo>
                  <ElementInfo>{character.vision}</ElementInfo>
                </ItemDetails>
              </ItemInfoWrapper>
              {/* <CharacterImage src={character.imageUrl} alt={character.name} /> */}
            </ItemOuterWrapper>
          );
        })}
      </ListBody>
    </ListContainer>
  );
};

export default CharactersList;

const ListContainer = styled.div`
  width: 100%;
  height: auto;

  margin-top: 80px;
`;

const ListBody = styled.div`
  width: 98%;
  height: 99%;
  margin: 5px;
  display: flex;
  flex-direction: column; // 여기서 세로 정렬을 위해 추가한 부분
`;

const ItemOuterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 150px;
  margin: 15px 0px; // 상하 간격을 15px로 조정
  background-color: rgba(0, 0, 0, 0.3); // 투명도가 적용된 검정색
`;

const ItemInfoWrapper = styled.div`
  color: white; // 텍스트 색상을 흰색으로
  align-self: flex-start; // 상단에 배치
  flex-direction: column; // 세로로 배치
  gap: 5px; // 세로 간격 지정
`;

const ItemDetails = styled.div`
  display: flex; // 가로로 배치
  gap: 15px; // 가로 간격 지정
`;

const ItemName = styled.div`
  font-weight: bolder;
  font-size: 32px;
  margin-bottom: 5px;
  margin-left: 15px;
`;

const StarsInfo = styled.div`
  display: flex; // 가로로 배열하기 위한 flex 추가
  gap: 5px; // 가로로 배열된 요소들 사이의 간격 지정
  margin-bottom: 5px;
  margin-left: 15px;
  font-size: 22px;
`;

const ElementInfo = styled.div`
  display: flex; // 가로로 배열하기 위한 flex 추가
  gap: 5px; // 가로로 배열된 요소들 사이의 간격 지정
  margin-bottom: 5px;
  font-size: 22px;
`;

const CharacterImage = styled.img`
  width: 150px;
  height: auto;
`;

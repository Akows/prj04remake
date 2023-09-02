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

  return (
    <ListContainer>
      <ListBody>
        {data.map((character, index) => {
          // 목록의 가장 마지막 요소는 무한 스크롤 동작을 위한 Observer DOM을 적용해야 한다.
          // 따라서 전체 데이터의 length가 해당 요소의 index와 일치할 경우, 이 요소는 화면에 출력되는 가장 마지막 요소가 된다.
          const isLastElement = data.length === index + 1;

          return (
            // isLastElement 변수를 이용, 현재 화면에 가장 마지막 요소에는 ref를 적용한다.
            <ItemOuterWrapper
              ref={isLastElement ? lastCharacterElementRef : null}
              key={character}
            >
              <ItemWrapper>
                {isLastElement && 'Img'}{' '}
                {/* Img가 필요한 경우에만 추가되도록 조건부 렌더링 */}
                <ItemTextWrapper>
                  <ItemName>{character}</ItemName>
                </ItemTextWrapper>
              </ItemWrapper>
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

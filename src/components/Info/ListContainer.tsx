import React from 'react';
import ListItem from './ListItem';
import useFetchCharacters from '../../hooks/useFetchCharacters';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import Loading from '../Common/Loading';
import Error from '../Common/Error';
import { ListContainers, ListBody } from '../../styles/InfoListCommonStyles';

const ListContainer: React.FC = () => {
  const { page, lastElementRef } = useInfiniteScroll();
  const { data, loading, error } = useFetchCharacters(page);

  // 데이터 중복 렌더링 방지 로직.
  // 커스텀 훅에서 저장하는 데이터는 이제 객체 형식이므로 map 함수로 렌더링 할 수가 없다.
  // 따라서 객체 데이터를 배열 데이터로 변환해주어야 한다.
  // Object.values()를 사용하게 되면 객체 데이터의 values 값만을 추출하여 배열 형식으로 반환한다.
  // 이때 key 값이 숫자라면 숫자 오름차순으로 정렬되니 주의.
  // 다음으로는 flat(). 배열로 전환했다고 해도 2차원 배열 등으로 배열 속의 배열이 존재하는 경우가 있다.
  // 이때는 flat() 함수를 사용하여 1차원 배열로 바꾸어줘야 한다.
  const allData = Object.values(data).flat();

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <ListContainers>
      <ListBody>
        {allData.map((item, index) => {
          const isLastElement = allData.length === index + 1;
          return (
            <ListItem
              key={item.name}
              item={item}
              isLast={isLastElement}
              ref={lastElementRef}
            />
          );
        })}
      </ListBody>
    </ListContainers>
  );
};

export default ListContainer;

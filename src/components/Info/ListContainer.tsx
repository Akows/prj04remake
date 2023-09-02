import React from 'react';
import ListItem from './ListItem';
import useFetchCharacters from '../../hooks/useFetchCharacters';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import Loading from '../common/Loading';
import Error from '../common/Error';
import { ListContainers, ListBody } from '../../styles/InfoListCommonStyles';

const ListContainer: React.FC = () => {
  const { page, lastElementRef } = useInfiniteScroll();
  const { data, loading, error } = useFetchCharacters(page);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <ListContainers>
      <ListBody>
        {data.map((item, index) => {
          const isLastElement = data.length === index + 1;
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

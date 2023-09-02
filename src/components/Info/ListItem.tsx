import React, { forwardRef } from 'react';
import {
  ItemOuterWrapper,
  ItemInfoWrapper,
  ItemDetails,
  ItemName,
  StarsInfo,
  ElementInfo,
  CharacterImage,
} from '../../styles/InfoListCommonStyles';

interface ListItemProps {
  item: {
    name: string;
    rarity: string;
    vision?: string; // weapons에는 이 프로퍼티가 없을 수 있음.
    imageUrl?: string; // character.imageUrl
  };
  isLast?: boolean;
}

const ListItem = forwardRef<HTMLDivElement, ListItemProps>((props, ref) => {
  const { item, isLast } = props;
  return (
    <ItemOuterWrapper ref={isLast ? ref : null}>
      <ItemInfoWrapper>
        <ItemName>{item.name}</ItemName>
        <ItemDetails>
          <StarsInfo>{item.rarity}✦</StarsInfo>
          {item.vision && <ElementInfo>{item.vision}</ElementInfo>}
        </ItemDetails>
      </ItemInfoWrapper>
      {item.imageUrl && <CharacterImage src={item.imageUrl} alt={item.name} />}
    </ItemOuterWrapper>
  );
});

export default ListItem;

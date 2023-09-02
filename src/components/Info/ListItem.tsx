import { forwardRef } from 'react';
import {
  ItemOuterWrapper,
  ItemInfoWrapper,
  ItemDetails,
  ItemName,
  RarityInfo,
  VisionInfo,
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

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getCharacterImagePath = (characterName: string) => {
    const formattedName = capitalizeFirstLetter(characterName);
    const encodedName = encodeURIComponent(formattedName); // 인코딩 추가
    return `/assets/characterImage/${encodedName}.png`;
  };

  // 이미지 경로 생성
  const imagePath = getCharacterImagePath(item.name);

  return (
    <ItemOuterWrapper ref={isLast ? ref : null} imagePath={imagePath}>
      <ItemInfoWrapper>
        <ItemName>{item.name}</ItemName>
        <ItemDetails>
          <RarityInfo>{item.rarity}✦</RarityInfo>
          {item.vision && <VisionInfo>{item.vision}</VisionInfo>}
        </ItemDetails>
      </ItemInfoWrapper>
    </ItemOuterWrapper>
  );
});

export default ListItem;

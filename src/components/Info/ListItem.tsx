import { forwardRef } from 'react';
import {
  ItemOuterWrapper,
  ItemInfoWrapper,
  ItemDetails,
  ItemName,
  RarityInfo,
  VisionInfo,
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

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getCharacterImagePath = (characterName: string) => {
    const formattedName = capitalizeFirstLetter(characterName);
    return `/assets/characterImage/${formattedName}.png`;
  };

  // 이미지 경로 생성
  const imagePath = getCharacterImagePath(item.name);

  return (
    <ItemOuterWrapper ref={isLast ? ref : null}>
      <ItemInfoWrapper>
        <ItemName>{item.name}</ItemName>
        <ItemDetails>
          <RarityInfo>{item.rarity}✦</RarityInfo>
          {item.vision && <VisionInfo>{item.vision}</VisionInfo>}
        </ItemDetails>
      </ItemInfoWrapper>
      <CharacterImage src={imagePath} alt={item.name} />
    </ItemOuterWrapper>
  );
});

export default ListItem;

import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const handleItemClick = () => {
    // 상세 페이지로 이동할 때, state로 데이터도 같이 전달.
    navigate(`/infoitem/${item.name}`, { state: { characterData: item } });
  };

  // 이미지 경로 생성
  const imagePath = getCharacterImagePath(item.name);

  return (
    <ItemOuterWrapper
      ref={isLast ? ref : null}
      imagePath={imagePath}
      onClick={handleItemClick}
    >
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

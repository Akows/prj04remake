const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getCharacterImagePath = (characterName: string) => {
  const formattedName = capitalizeFirstLetter(characterName);
  const encodedName = encodeURIComponent(formattedName); // 인코딩 추가
  return `/assets/characterImage/${encodedName}.png`;
};

export { getCharacterImagePath };

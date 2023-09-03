const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getCharacterImagePath = (characterName: string) => {
  const formattedName = characterName
    .split(' ')
    .map(capitalizeFirstLetter)
    .join('_');
  return `/assets/characterImage/${formattedName}.png`;
};

export { getCharacterImagePath };

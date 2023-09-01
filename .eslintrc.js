// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        // Prettier는 줄바꿈 문자에 관해 자동으로 판단
        endOfLine: 'auto',
        // 작은 따옴표 사용 여부.
        singleQuote: true,
        // 세미콜론 사용 여부.
        semi: true,
        // 탭 사용 여부.
        useTabs: false,
        // 탭 간격.
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        // 화살표 함수의 인자가 하나 일 경우 ()를 생략.
        arrowParens: 'avoid',
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};

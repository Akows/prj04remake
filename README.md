# prj04remake
prj04의 2023년 리메이크.

# 설치 순서

npx create-react-app . --template typescript

Prettier와 관련된 패키지 설치
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

ESLint 설정
.eslintrc.json 또는 .eslintrc.js 파일을 프로젝트의 루트에 생성하거나, package.json 내에 ESLint 설정 섹션을 추가

Prettier 설정
프로젝트 루트에 .prettierrc 파일을 생성하고, 원하는 Prettier 설정을 추가

스크립트 추가 (선택사항)
package.json에 아래와 같은 스크립트를 추가하여 소스 코드의 포맷을 쉽게 할 수 있다.

"scripts": {
  "format": "prettier --write \"src/**/*.ts*\"",
  "lint": "eslint 'src/**/*.{ts,tsx}' --quiet --fix"
}

format 스크립트:

prettier --write \"src/**/*.ts*\": 이 명령은 Prettier를 사용하여 프로젝트의 src 디렉토리 내 모든 TypeScript (.ts, .tsx) 파일들을 자동으로 포맷팅합니다.
--write 플래그는 포맷팅 된 결과를 파일에 직접 쓰라는 것을 의미합니다.
사용 예: npm run format
lint 스크립트:

eslint 'src/**/*.{ts,tsx}' --quiet --fix: 이 명령은 ESLint를 사용하여 src 디렉토리 내의 모든 TypeScript 파일들에 대한 linting을 수행합니다.
--quiet 플래그는 경고 메시지보다 중요한 에러 메시지만 출력하도록 합니다.
--fix 플래그는 자동으로 고칠 수 있는 linting 문제들을 수정하도록 ESLint에 지시합니다.
사용 예: npm run lint

* 다만 VSCode에서는 ESLint와 Prettier를 자동으로 적용하는 확장 프로그램을 설치하면 코드를 저장할 때마다 자동으로 포맷팅과 린팅을 적용할 수 있다.

위 스크립트는 전체 프로젝트에 대한 포맷팅과 린팅을 적용할 때 사용한다.
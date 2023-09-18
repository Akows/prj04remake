# 개인 프로젝트 04 - React-GenshinAPI, 2023 리메이크!

## 👥 Member Info

### 이유승

## 💪🏻프로젝트 목표

- 게임 ‘원신’을 주제로 하는 외부 API 호출, 무한 스크롤 기능이 포함된 앱 구현. 
- 리메이크에서는 Styled-Components, TypeScript, React.js Custom Hooks 등의 사용 능력 증진을 위해 기능 동작 방식을 리팩토링.

### ✔️ 배포

(리메이크 배포 링크)
- `vercel` [🔗Link](https://prj04remake.vercel.app/)

(원본 배포 링크)
- `Google Firebase` [🔗Link](https://prj4deploy.web.app/) 

## 🛫 시작 가이드

- 실행을 위해 다음 Node version이 필요합니다.
  [Node.js 18.17.0](https://nodejs.org/ca/blog/release/v18.17.0/)

- 실행 방법 (2가지 중 택 1)
  > 1. 배포 링크를 통한 접속
  > 2. ZIP 파일 다운로드 및 압축 풀기 후 코드 에디터로 실행

```
$ npm i
$ npm run start
```

## 🛠️ 사용한 기술 스택

#### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Git hub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Source Tree](https://img.shields.io/badge/SOURCE%20TREE-blue?style=for-the-badge&logo=sourcetree)

#### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

#### Development

![HTML5](https://img.shields.io/badge/HTML-%23F5AF64?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS-%230A82FF?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>
![Axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=black)

## 주요 기능
### - 무한 스크롤.
  <details>
  <summary>기능 설명</summary>
  
  ```
  import { useState, useRef, useCallback } from 'react';
  
  const useInfiniteScroll = () => {
    const [page, setPage] = useState<number>(1);
    const observer = useRef<any>();
  
    const lastElementRef = useCallback((node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    }, []);
  
    return { page, lastElementRef };
  };
  
  export default useInfiniteScroll;
  ```
  
  Intersection Observer API와 useRef를 사용하여 observer의 대상이 될 DOM를 제어하고 해당 DOM의 isIntersecting 여부를 체크하여 true일 경우에는 다음 페이지의 데이터가 호출되도록 구현하였습니다.
  
  또한 커스텀 훅 구조를 활용하여 무한 스크롤 기능이 컴포넌트에서 분리되어 독립적으로 존재함으로써 관심사가 분리될 수 있도록 구현하였습니다. 또한 커스텀 훅 구조로 인해 코드의 재사용성이 증대되고 캡슐화가 이루어져 관련 로직 및 상태가 하나의 훅에 모아져 있어 코드의 흐름을 파악하고 이해하는 것이 쉬워지도록 하였습니다.
  
  ### 무한 스크롤 구현 방법 : 왜 Intersection Observer API인가?
  
  React.js에서 무한 스크롤을 구현하는 방법은 여러가지가 존재한다. Event Listener, 상태 관리 라이브러리 사용, Third-party 라이브러리 등등..
  
  Intersection Observer API는 비동기적으로 특정 요소가 뷰포트 또는 다른 특정 요소와 교차하는지 여부를 확인하여 Event Listener를 사용하는 것보다 더 효율적으로 요소의 가시성을 감지할 수 있습니다. 또 Event Listener와 달리 스크롤 동작이 발생할 때마다 연속적으로 호출되지 않아 과도한 계산을 발생시키지 않으며, Event Listener에 비해 더욱 간결하고 이해하기가 쉬운 코드의 작성이 가능합니다.
  
  따라서 무한 스크롤 구현에 Intersection Observer API를 사용하였습니다.
  </details>

### 커스텀 훅을 활용한 API 호출과 데이터의 가공
<details>
<summary>기능 설명</summary>

```
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ITEMS_PER_PAGE } from '../constants/fetchData';

const useFetchCharacters = (page: number) => {
  // Record?
  // 객체의 키와 값을 타입으로 강제하는 데 사용.
  const [data, setData] = useState<Record<number, any[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.genshin.dev/characters`);
        const characterNames = response.data;

        // 1 페이지에 해당되는 데이터만을 호출하기 위해 캐릭터 이름을 10 단위로 slice.
        // 현재 페이지가 1이라면, (1 - 1) * 10 = 0이므로 시작 인덱스는 0.
        // 현재 페이지가 2라면, (2 - 1) * 10 = 10이므로 시작 인덱스는 10.
        const slicedNames = characterNames.slice(
          (page - 1) * ITEMS_PER_PAGE,
          page * ITEMS_PER_PAGE,
        );

        // 10개의 이름이 slice되었으니 이제 이를 바탕으로 데이터를 호출한다.
        // 이 로직에서는 1 페이지당 호출을 10번씩 하고 있어서 너무 비효율적이지만..
        // 이 API에서는 페이지네이션을 위한 param등을 지원하지 않고..
        // 기본 주소에는 달랑 캐릭터 이름만을 반환하기 때문에 목록 컴포넌트에서 이름 이외에 부가적인 정보를 출력하기 위해서는 어쩔 수 없이 이런 방법을 선택해야한다.
        const characterDataPromises = slicedNames.map((name: string) =>
          axios.get(`https://api.genshin.dev/characters/${name}`),
        );

        const characterDataResponses = await Promise.all(characterDataPromises);
        const characterData = characterDataResponses.map(res => res.data);

        // 데이터의 저장 방식을 배열에서 객체로 변경.
        // 페이지 번호를 key로, 데이터를 value로 지정하여 저장.
        // 따라서 같은 페이지의 데이터는 덮어씌워지지, 2번 저장되지 않는다.
        setData(prevData => ({ ...prevData, [page]: characterData }));
        setLoading(false);
      } catch (err) {
        setError('데이터를 불러오는 과정에 에러가 발생하였습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { data, loading, error };
};

export default useFetchCharacters;
```

무한 스크롤 훅이 담당하는 기능은 정확하게 말하자면 '데이터를 불러올 때 몇 번째 페이지를 불러오는 가'에서, '몇 번째 페이지'만을 제어하고 있습니다. 무한 스크롤이 발동되면 useState의 setPage로 page의 값이 변화하고, 실제로 API 호출로 데이터를 불러오는 부분은 useFetchCharacters 커스텀 훅에서 담당하고 있습니다.

이 프로젝트의 API는 param 등으로 전체 데이터 중 일부 데이터만을 가져오는 기능이 포함되어있지 않습니다. 따라서 우선 전체 데이터를 불러온 다음 page의 값을 이용하여 slice 함수를 통해 일부분의 데이터만 가져오는 것처럼 기능을 구현하여 무한 스크롤 기능과 연계된 데이터 호출 기능을 구현하였습니다.
</details>

## 담당 역할

- 프로젝트 기획, UI 디자인, 기능 구현, 프로젝트 버전 관리 등 개발 전반.

## 성과

- Typescript 사용 방법과 사용 이유.
- styled-components 사용 경험 및 사용 능력 증진.
- 커스텀 훅의 사용 이유와 사용 방법 숙지.

## 개선할 점

- Type을 적용하고 사용하는데 이해와 더 숙련된 방법을 익혀야한다.
- 전역 관리 라이브러리 + styled-components + Typescript의 동시 사용 방법 공부.
(JavaScript를 사용했을 때와는 상당히 다르다..)

## 🌲프로젝트 구조

```bash
src
 ┣ assets
 ┃ ┣ fonts
 ┃ ┃ ┗ ja-jp.ttf
 ┃ ┣ background.jpg
 ┃ ┗ menu.png
 ┣ components
 ┃ ┣ Common
 ┃ ┃ ┣ Error.tsx
 ┃ ┃ ┗ Loading.tsx
 ┃ ┣ Info
 ┃ ┃ ┣ ListContainer.tsx
 ┃ ┃ ┗ ListItem.tsx
 ┃ ┣ CharactersList.tsx
 ┃ ┗ MenuBar.tsx
 ┣ constants
 ┃ ┗ fetchData.tsx
 ┣ context
 ┃ ┗ AppDataContext.tsx
 ┣ hooks
 ┃ ┣ useFetchCharacters.tsx
 ┃ ┗ useInfiniteScroll.tsx
 ┣ pages
 ┃ ┣ InfoItemPage.tsx
 ┃ ┗ MainPage.tsx
 ┣ router
 ┃ ┗ AppRouter.tsx
 ┣ styles
 ┃ ┣ GlobalStyles.tsx
 ┃ ┣ InfoListCommonStyles.tsx
 ┃ ┗ ModalCommonStyles.tsx
 ┣ test
 ┃ ┗ AppRouter.test.tsx
 ┣ util
 ┃ ┗ getCharacterImagePath.tsx
 ┣ App.tsx
 ┣ declarations.d.ts
 ┣ index.css
 ┗ index.tsx
```

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
        const response = await axios.get(`https://genshin.jmp.blue/characters`);
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
          axios.get(`https://genshin.jmp.blue/characters/${name}`),
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

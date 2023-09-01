import { useState, useEffect } from 'react';
import axios from 'axios';

const ITEMS_PER_PAGE = 10;

const useFetchCharacters = (page: number) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.genshin.dev/characters`);
        const slicedData = response.data.slice(
          (page - 1) * ITEMS_PER_PAGE,
          page * ITEMS_PER_PAGE,
        );
        setData(prevData => [...prevData, ...slicedData]);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { data, loading, error };
};

export default useFetchCharacters;

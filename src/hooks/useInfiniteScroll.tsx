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

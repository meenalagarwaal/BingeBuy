import { useEffect, useState } from "react";

 function useDebounce(query, delay) {
  const [debouncedQuery, setDebounceQuery] = useState();
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounceQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);
  
  return debouncedQuery;
}
export default useDebounce;

import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
   
    const fetchData = () => {
        return fetch("http://localhost:8000/blogs")
          .then((response) => response.json())
          .then((data) => setData(data));
  }

  useEffect(() => {
    fetchData();
  },[])

    return { data  };
}

export default useFetch;
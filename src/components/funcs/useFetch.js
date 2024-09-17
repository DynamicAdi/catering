import axios from "axios";
import { useState, useEffect } from "react";

export function readData(backend, endpoint, tabName) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  let url = `${backend}/${endpoint}`;

  if (tabName) {
    url = `${backend}/${endpoint}/${tabName}`;
  }
  const options = {
    method: "GET",
    url: url,
    headers: {
      "content-type": "application/json",
    },
  };

  async function RetriveData() {
    setLoading(true);
    try {
      const response = await axios.request(options);
      if (response.status !== 200) {
        setError(true);
        return;
      } else {
        setData(response.data);
      }
      setLoading(false);
    } catch (error) {
      setError(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    RetriveData();
  }, []);

  function reFetch() {
    setLoading(true);
    setError(false);
    RetriveData();
  }

  return { data, isLoading, error, reFetch };
}
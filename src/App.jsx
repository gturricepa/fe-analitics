import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const [bayerData, setBayerData] = useState(null); // Novo estado para armazenar dados do endpoint /api/bayer
  const [error, setError] = useState(null);
  const [bayerError, setBayerError] = useState(null); // Novo estado para armazenar erros do endpoint /api/bayer

  useEffect(() => {
    // Função para buscar dados do endpoint principal
    const fetchData = async () => {
      try {
        const response = await fetch('https://be-analitics.onrender.com/api/');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const fetchBayerData = async () => {
    try {
      const response = await fetch('https://be-analitics.onrender.com/api/bayer');
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      setBayerData(result);
    } catch (error) {
      setBayerError(error);
    }
  };

  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data from Backend</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <button onClick={fetchBayerData}>Fetch Bayer Data</button>
      
      {bayerError && (
        <div>
          <p>Error fetching Bayer data: {bayerError.message}</p>
        </div>
      )}

      {bayerData && (
        <div>
          <h2>Bayer Data!</h2>
          <pre>{JSON.stringify(bayerData, null, 2)}</pre>
        </div> 
      )}
    </div>
  );
};

export default App;

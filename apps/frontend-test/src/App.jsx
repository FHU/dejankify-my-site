import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Monorepo Demo</h1>
      <div className="card">
        <h2>Frontend + Backend Integration</h2>
        
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <button onClick={fetchData} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Data from Backend'}
          </button>
          
          {error && (
            <div style={{ color: '#ff4444', marginTop: '10px' }}>
              Error: {error}
            </div>
          )}
          
          {data && (
            <div style={{ marginTop: '20px' }}>
              <h3>Response from Backend:</h3>
              <p><strong>Message:</strong> {data.message}</p>
              <p><strong>Timestamp:</strong> {data.timestamp}</p>
              <h4>Data:</h4>
              <ul style={{ textAlign: 'left' }}>
                {data.data.map(item => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className="read-the-docs">
        Frontend running on port 3000 | Backend API on port 3001
      </p>
    </>
  );
}

export default App;

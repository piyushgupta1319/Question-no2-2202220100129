import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [numberId, setNumberId] = useState('p');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNumbers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:8000/numbers/${numberId}`);
      setResponse(res.data);
    } catch (err) {
      setError('Failed to fetch data.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Average Calculator</h1>

      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={numberId}
          onChange={(e) => setNumberId(e.target.value)}
        >
          <option value="p">Prime (p)</option>
          <option value="f">Fibonacci (f)</option>
          <option value="e">Even (e)</option>
          <option value="r">Random (r)</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={fetchNumbers}
        >
          Fetch Numbers
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {response && (
        <div className="bg-gray-50 p-4 rounded mt-4">
          <p><strong>Previous Window:</strong> {JSON.stringify(response.windowPrevState)}</p>
          <p><strong>Current Window:</strong> {JSON.stringify(response.windowCurrState)}</p>
          <p><strong>New Numbers:</strong> {JSON.stringify(response.numbers)}</p>
          <p><strong>Average:</strong> {response.avg}</p>
        </div>
      )}
    </div>
  );
}

// src/components/Matches.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Matches({ userId }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/matches/${userId}`);
        setMatches(response.data);
      } catch (err) {
        setError('Failed to fetch matches.');
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchMatches();
    }
  }, [userId]);

  if (loading) {
    return <p>Loading matches...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (matches.length === 0) {
    return <p>No matches found.</p>;
  }

  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            {match.username} - {match.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Matches;
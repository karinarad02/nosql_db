import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieType = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/movies/type`
      );
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching movies by type:", err);
    }
  };

  return (
    <div>
      <h2>Movies Grouped by Type</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Movie Count</th>
          </tr>
        </thead>
        <tbody>
          {stats.length > 0 ? (
            stats.map(({ type, count }) => (
              <tr key={type}>
                <td>{type}</td>
                <td>{count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieType;

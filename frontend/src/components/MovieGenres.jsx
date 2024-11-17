import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieGenres = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/movies/genre`
    );
    setStats(res.data);
  };

  return (
    <div>
      <h2>Movie Genre Stats</h2>
      <table>
        <thead>
          <tr>
            <th>Genre</th>
            <th>Average IMDb Rating</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(({ genre, avg }) => (
            <tr>
              <td>{genre}</td>
              <td>{avg.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieGenres;

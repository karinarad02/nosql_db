import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieYear = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/movies/year`
      );
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching movies by year:", err);
    }
  };

  return (
    <div>
      <h2>Movies Grouped by Year</h2>
      <div className="scrollable">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Movie Count</th>
            </tr>
          </thead>
          <tbody>
            {stats.length > 0 ? (
              stats.map(({ year, count }) => (
                <tr key={year}>
                  <td>{year}</td>
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
    </div>
  );
};

export default MovieYear;

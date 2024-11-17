import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieAwards = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMoviesWithAwards();
  }, []);

  const fetchMoviesWithAwards = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/movies/awards`
      );
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies with awards:", err);
    }
  };

  return (
    <div>
      <h2>Movies with Awards</h2>
      <div className="scrollable">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Awards</th>
            </tr>
          </thead>
          <tbody>
            {movies.length > 0 ? (
              movies.map(({ title, awards }) => (
                <tr>
                  <td>{title}</td>
                  <td>{awards}</td>
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

export default MovieAwards;

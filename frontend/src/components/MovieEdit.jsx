import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function MovieEdit({ fetchMovies }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    year: "",
    plot: "",
    genres: [],
  });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/movies/${id}`
        );
        const movieData = res.data;

        // Map the nested structure to the form state
        setMovie({
          title: movieData.title,
          year: movieData.year.$numberInt || movieData.year, // Handle nested or direct year
          plot: movieData.plot || "",
          genres: movieData.genres || [],
        });
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedMovie = {
        title: movie.title,
        year: parseInt(movie.year, 10), // Ensure year is a number
        plot: movie.plot,
        genres: movie.genres, // Handle genres as an array
      };

      await axios.put(
        `${process.env.REACT_APP_API_URL}/movies/${id}`,
        updatedMovie
      );
      fetchMovies();
      navigate("/");
    } catch (err) {
      console.error("Failed to update movie:", err);
    }
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter movie title"
          value={movie.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input
          id="year"
          name="year"
          type="number"
          placeholder="Enter release year"
          value={movie.year}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="plot">Plot</label>
        <textarea
          id="plot"
          name="plot"
          placeholder="Enter movie plot"
          value={movie.plot}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="genres">Genres</label>
        <input
          id="genres"
          name="genres"
          type="text"
          placeholder="Enter genres (comma separated)"
          value={movie.genres.join(", ")}
          onChange={(e) =>
            setMovie((prevMovie) => ({
              ...prevMovie,
              genres: e.target.value.split(",").map((genre) => genre.trim()),
            }))
          }
        />
      </div>
      <button type="submit" className="submit-btn">
        Update Movie
      </button>
    </form>
  );
}

export default MovieEdit;

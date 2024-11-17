import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MovieCreate({ fetchMovies }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [plot, setPlot] = useState("");
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [poster, setPoster] = useState("");
  const navigate = useNavigate();

  const handleGenresChange = (e) => {
    setGenres(e.target.value.split(",").map((genre) => genre.trim()));
  };

  const handleDirectorsChange = (e) => {
    setDirectors(e.target.value.split(",").map((director) => director.trim()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!genres.length || !directors.length) {
      return alert("Please provide at least one genre and one director.");
    }

    const newMovie = {
      title,
      year: parseInt(year, 10),
      plot,
      genres,
      directors,
      poster,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/movies`, newMovie);
      fetchMovies();
      navigate("/");
    } catch (error) {
      console.error("Failed to add movie:", error);
    }
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>

      {/* Title Field */}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Year Field */}
      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input
          id="year"
          type="number"
          placeholder="Enter release year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>

      {/* Plot Field */}
      <div className="form-group">
        <label htmlFor="plot">Plot</label>
        <textarea
          id="plot"
          placeholder="Enter movie plot"
          value={plot}
          onChange={(e) => setPlot(e.target.value)}
          required
        />
      </div>

      {/* Genres Field */}
      <div className="form-group">
        <label htmlFor="genres">Genres</label>
        <input
          id="genres"
          type="text"
          placeholder="Enter genres (comma-separated, e.g., Action, Drama)"
          value={genres.join(", ")}
          onChange={handleGenresChange}
        />
      </div>

      {/* Directors Field */}
      <div className="form-group">
        <label htmlFor="directors">Directors</label>
        <input
          id="directors"
          type="text"
          placeholder="Enter directors (comma-separated, e.g., Director1, Director2)"
          value={directors.join(", ")}
          onChange={handleDirectorsChange}
        />
      </div>

      {/* Poster URL Field */}
      <div className="form-group">
        <label htmlFor="poster">Poster URL</label>
        <input
          id="poster"
          type="url"
          placeholder="Enter poster image URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-btn">
        Add Movie
      </button>
    </form>
  );
}

export default MovieCreate;

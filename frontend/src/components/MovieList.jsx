import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieList({ movies, onDelete }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  // Filter movies based on search and genre
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesSearch ;
  });

  return (
    <div className="movie-list-container">
      <h1>Movie Management</h1>
      {/* Filters and Create Button */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="genre-filter"
        >
          <option value="">All Genres</option>
          {Array.from(new Set(movies.flatMap((movie) => movie.genres))).map(
            (genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            )
          )}
        </select>
        <button onClick={() => navigate("/create")} className="create-btn">
          Create Movie
        </button>
        <button onClick={() => navigate("/stats")} className="create-btn">
          Movie Stats
        </button>
      </div>

      {/* Movie List */}
      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <div className="movie-poster">
                <img
                  src={
                    movie.poster ||
                    "https://templatelab.com/wp-content/uploads/2019/06/movie-poster-template-03.jpg?w=395"
                  }
                  alt={movie.title}
                />
              </div>
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p className="movie-year">{movie.year}</p>
                <p className="movie-plot">
                  {movie.plot ? movie.plot : "No plot available."}
                </p>
                <p className="movie-genres">
                  Genres: {movie.genres?.join(", ") || "No genres available"}
                </p>
                <div className="movie-actions">
                  <button
                    onClick={() => navigate(`/edit/${movie._id}`)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(movie._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found matching the filters.</p>
        )}
      </div>
    </div>
  );
}

export default MovieList;

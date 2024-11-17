import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieCreate from "./components/MovieCreate";
import MovieEdit from "./components/MovieEdit";
import MovieStats from "./components/MovieStats";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/movies`);
    setMovies(res.data);
  };

  const deleteMovie = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/movies/${id}`);
    fetchMovies();
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* Main Movie List */}
          <Route
            path="/"
            element={<MovieList movies={movies} onDelete={deleteMovie} />}
          />

          {/* Create New Movie */}
          <Route
            path="/create"
            element={<MovieCreate fetchMovies={fetchMovies} />}
          />

          {/* Edit Existing Movie */}
          <Route
            path="/edit/:id"
            element={<MovieEdit fetchMovies={fetchMovies} />}
          />
          {/* Display Movie Statistics*/}
          <Route path="/stats" element={<MovieStats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

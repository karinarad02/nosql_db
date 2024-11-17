import React from "react";
import MovieGenres from "./MovieGenres";
import MovieYear from "./MovieYear";
import MovieAwards from "./MovieAwards";
import MovieType from "./MovieType";

const MovieStats = () => {
  return (
    <div className="stats">
      <MovieGenres />
      <MovieYear />
      <MovieAwards />
      <MovieType />
    </div>
  );
};

export default MovieStats;

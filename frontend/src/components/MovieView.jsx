import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieView = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieAndComments = async () => {
      try {
        // Fetch movie data
        const movieRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/movies/${id}`
        );
        setMovie(movieRes.data);

        // Fetch comments
        const commentsRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/movies/${id}/comments`
        );
        setComments(commentsRes.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieAndComments();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="movie-view">
      <h1>{movie.title}</h1>
      {movie.poster && (
        <img
          src={
            movie.poster ||
            "https://templatelab.com/wp-content/uploads/2019/06/movie-poster-template-03.jpg?w=395"
          }
          alt={movie.title}
          style={{ maxWidth: "300px" }}
        />
      )}
      {movie.plot && (
        <p>
          <strong>Plot:</strong> {movie.plot}
        </p>
      )}
      {movie.genres?.length > 0 && (
        <p>
          <strong>Genres:</strong> {movie.genres.join(", ")}
        </p>
      )}
      {movie.runtime && (
        <p>
          <strong>Runtime:</strong> {movie.runtime} minutes
        </p>
      )}
      {movie.cast?.length > 0 && (
        <p>
          <strong>Cast:</strong> {movie.cast.join(", ")}
        </p>
      )}
      {movie.languages?.length > 0 && (
        <p>
          <strong>Languages:</strong> {movie.languages.join(", ")}
        </p>
      )}
      {movie.released && (
        <p>
          <strong>Released:</strong> {new Date(movie.released).toDateString()}
        </p>
      )}
      {movie.directors?.length > 0 && (
        <p>
          <strong>Directors:</strong> {movie.directors.join(", ")}
        </p>
      )}
      {movie.writers?.length > 0 && (
        <p>
          <strong>Writers:</strong> {movie.writers.join(", ")}
        </p>
      )}
      {movie.awards?.text && (
        <p>
          <strong>Awards:</strong> {movie.awards.text}
        </p>
      )}
      {movie.imdb?.rating && movie.imdb?.votes && (
        <p>
          <strong>IMDB Rating:</strong> {movie.imdb.rating} ({movie.imdb.votes}{" "}
          votes)
        </p>
      )}
      {movie.tomatoes?.viewer?.rating && movie.tomatoes?.viewer?.numReviews && (
        <p>
          <strong>Viewer Rating:</strong> {movie.tomatoes.viewer.rating} (
          {movie.tomatoes.viewer.numReviews} reviews)
        </p>
      )}
      {movie.year && (
        <p>
          <strong>Year:</strong> {movie.year}
        </p>
      )}
      {movie.countries?.length > 0 && (
        <p>
          <strong>Countries:</strong> {movie.countries.join(", ")}
        </p>
      )}
      {movie.fullplot && (
        <p>
          <strong>Full Plot:</strong> {movie.fullplot}
        </p>
      )}

      <h2>Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>
                <strong>{comment.name}:</strong> {comment.text}
              </p>
              <p>
                <em>
                  Posted on: {new Date(comment.date).toLocaleDateString()}
                </em>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available for this movie.</p>
      )}
    </div>
  );
};

export default MovieView;

const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// Routes for statistics
router.get("/genre", movieController.getAvgRatingByGenre);
router.get("/year", movieController.getMoviesGroupedByYear);
router.get("/awards", movieController.getMoviesWithAwards);
router.get("/type", movieController.getMoviesByType);

// Routes for movies
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovieById);
router.post("/", movieController.addMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

// Route for fetching comments for a movie
router.get("/:id/comments", movieController.getCommentsByMovieId);

module.exports = router;

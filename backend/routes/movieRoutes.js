const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/genre", movieController.getAvgRatingByGenre);
router.get("/year", movieController.getMoviesGroupedByYear);
router.get("/awards", movieController.getMoviesWithAwards);
router.get("/type", movieController.getMoviesByType);
// Define routes for movies
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovieById);
router.post("/", movieController.addMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);


module.exports = router;

const { MongoClient, ObjectId } = require("mongodb");

// Global variable to hold the collection reference
let moviesCollection;
let commentsCollection;

// Function to connect to MongoDB
async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db("sample_mflix");
    moviesCollection = db.collection("movies");
    commentsCollection = db.collection("comments");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

// Controller functions
const getMovies = async (req, res) => {
  try {
    if (!moviesCollection) {
      return res.status(500).send("Database connection not established");
    }

    const movies = await moviesCollection
      .find({})
      .limit(50)
      .sort({ year: -1 })
      .toArray();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!moviesCollection) {
      return res.status(500).send("Database connection not established");
    }

    const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    res.json(movie);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getCommentsByMovieId = async (req, res) => {
  const { id } = req.params;

  try {
    if (!commentsCollection) {
      return res.status(500).send("Database connection not established");
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid Movie ID format");
    }

    const comments = await commentsCollection
      .find({ movie_id: new ObjectId(id) })
      .sort({ date: -1 })
      .toArray();

    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments for movie:", err);
    res.status(500).send(err.message);
  }
};

const addMovie = async (req, res) => {
  try {
    if (!moviesCollection) {
      return res.status(500).send("Database connection not established");
    }

    const movie = req.body;
    const result = await moviesCollection.insertOne(movie);

    const insertedMovie = await moviesCollection.findOne({
      _id: result.insertedId,
    });

    res.status(201).json(insertedMovie);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const updatedMovie = req.body;

  try {
    if (!moviesCollection) {
      return res.status(500).send("Database connection not established");
    }

    const result = await moviesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: updatedMovie.title,
          year: parseInt(updatedMovie.year, 10),
          plot: updatedMovie.plot,
          genres: updatedMovie.genres,
          poster: updatedMovie.poster,
        },
      },
      { returnDocument: "after" }
    );

    if (!Object.keys(result).length === 0) {
      return res.status(404).send("Movie not found");
    }

    res.json(result.value);
  } catch (err) {
    console.error("Error updating movie:", err);
    res.status(500).send(err.message);
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    if (!moviesCollection) {
      return res.status(500).send("Database connection not established");
    }

    const result = await moviesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send("Movie not found");
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting movie:", err);
    res.status(500).send(err.message);
  }
};

//Stats Functions
const getAvgRatingByGenre = async (req, res) => {
  try {
    if (!moviesCollection) {
      return res.status(500).send("Database connection not established");
    }
    const stats = await moviesCollection
      .aggregate([
        { $unwind: "$genres" },
        { $group: { _id: "$genres", avgRating: { $avg: "$imdb.rating" } } },
        { $sort: { avgRating: -1 } },
        {
          $project: {
            genre: "$_id",
            avg: "$avgRating",
            _id: 0,
          },
        },
      ])
      .toArray();
    res.json(stats);
  } catch (err) {
    console.error("Error fetching average IMDb rating by genre:", err);
    res.status(500).send(err.message);
  }
};

const getMoviesGroupedByYear = async (req, res) => {
  try {
    if (!moviesCollection) {
      return res.status(500).send("Database connection not established");
    }

    const stats = await moviesCollection
      .aggregate([
        { $match: { year: { $exists: true } } },
        { $group: { _id: "$year", movieCount: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        {
          $project: {
            year: "$_id",
            count: "$movieCount",
            _id: 0,
          },
        },
      ])
      .toArray();

    res.json(stats);
  } catch (err) {
    console.error("Error fetching movies grouped by year:", err);
    res.status(500).send(err.message);
  }
};

const getMoviesWithAwards = async (req, res) => {
  try {
    if (!moviesCollection) {
      return res.status(500).send("Database connection not established");
    }

    const movies = await moviesCollection
      .aggregate([
        { $match: { "awards.wins": { $gt: 0 } } },
        { $project: { title: 1, awards: "$awards.text", _id: 0 } },
      ])
      .toArray();
    res.json(movies);
  } catch (err) {
    console.error("Error fetching movies with awards:", err);
    res.status(500).send(err.message);
  }
};

const getMoviesByType = async (req, res) => {
  try {
    if (!moviesCollection) {
      return res.status(500).send("Database connection not established");
    }

    const stats = await moviesCollection
      .aggregate([
        { $group: { _id: "$type", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        {
          $project: {
            type: "$_id",
            count: "$count",
            _id: 0,
          },
        },
      ])
      .toArray();

    res.json(stats);
  } catch (err) {
    console.error("Error fetching number of movies by type:", err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  connectToDatabase,
  getMovies,
  getMovieById,
  getCommentsByMovieId,
  addMovie,
  updateMovie,
  deleteMovie,
  getAvgRatingByGenre,
  getMoviesGroupedByYear,
  getMoviesWithAwards,
  getMoviesByType,
};

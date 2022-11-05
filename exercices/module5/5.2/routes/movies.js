const express = require('express');
const {
  createNewMovie,
  deleteMovie,
  getMovieById,
  patchMovie,
  readAllMovies,
} = require('../models/movies');

const router = express.Router();

/* GET all movies. */
router.get('/', (req, res) => {
  res.json(readAllMovies());
});

/* GET movie by its ID. */
router.get('/:id', (req, res) => {
  const movie = getMovieById(req.params.id);

  if(!movie) return res.status(400);

  return res.json(movie);
});

/* Create a new movie */
router.post('/', (req, res) => {
  const title = req?.body?.title?.lenght !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.lenght !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link) return res.sendStatus(400);

  const newMovie = createNewMovie(title, duration, budget, link);

  return res.json(newMovie);
});

router.delete('/:id', (req, res) => {
  const deletedMovie = deleteMovie(req.params.id);

  if(!deletedMovie) return res.sendStatus(400);

  return res.json(deletedMovie);

});

router.patch('/:id', (req, res) => {
  // console.log(`PATCH /movies/${req.params.id}`);

  const title = req?.body?.title?.lenght !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.lenght !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link) return res.sendStatus(400);

  const patchedMovie = patchMovie(req.params.id, title, duration, budget, link);

  if(!patchedMovie) return res.sendStatus(400);

  return res.json(patchedMovie);
});

module.exports = router;

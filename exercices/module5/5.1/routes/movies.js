const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/movies.json');


const MOVIES = [
  {
    id: 1,
    title: "Forrest Gump",
    duration: 140,
    budget: 55,
    link: "https://www.allocine.fr/film/fichefilm_gen_cfilm=10568.html",
  },
  {
    id: 2,
    title: "La Liste de Schinlder",
    duration: 195,
    budget: 75,
    link: "https://www.allocine.fr/film/fichefilm_gen_cfilm=9393.html",
  },
  {
    id: 3,
    title: "La Ligne verte",
    duration: 189,
    budget: 82,
    link: "https://www.allocine.fr/film/fichefilm_gen_cfilm=22779.html",
  },
];

/* GET all movies. */
router.get('/', (req, res) => {
  // console.log("GET /movies");
  let filteredList;
  const movies = parse(jsonDbPath, MOVIES);

  if (req.query.minimumduration > 0){
    filteredList = movies.filter(
      m => m.duration >= req.query.minimumduration
    );
  }

  return res.json(filteredList ?? movies);
});

/* GET movie by its ID. */
router.get('/:id', (req, res) => {
  const movies = parse(jsonDbPath, MOVIES);
  console.log(movies)
  
  // eslint-disable-next-line eqeqeq
  const movieIndex = movies.findIndex(m => m.id == req.params.id);
  console.log(movieIndex);
  
  if(movieIndex <0) return res.status(400);
  // console.log(`GET /movies/${req.params.id}`);

  return res.json(movies[movieIndex]);
});

/* Create a new movie */
router.post('/', (req, res) => {
  const title = req?.body?.title?.lenght !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.lenght !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link) return res.sendStatus(400);
  
  const movies = parse(jsonDbPath, MOVIES);

  const newId = movies.length +1;

  const newMovie =
  {
    id: newId,
    title,
    duration,
    budget,
    link
  }
  movies.push(newMovie);
  serialize(jsonDbPath, movies);

  return res.json(newMovie);
});

router.delete('/:id', (req, res) => {
  // console.log(`DELETE /movies/${req.params.id}`);

  const movies = parse(jsonDbPath, MOVIES);
  // eslint-disable-next-line eqeqeq
  const foundIndex = movies.findIndex(m => m.id == req.params.id);

  if(foundIndex < 0) return res.sendStatus(400);

  const removedMovies = movies.splice(foundIndex, 1);
  const removedMovie = removedMovies[0];

  serialize(jsonDbPath, movies);
  return res.json(removedMovie);

});

router.patch('/:id', (req, res) => {
  // console.log(`PATCH /movies/${req.params.id}`);

  const title = req?.body?.title?.lenght !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.lenght !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link) return res.sendStatus(400);

  const movies = parse(jsonDbPath, MOVIES);
  console.log(movies[0].id);
  // eslint-disable-next-line eqeqeq
  const foundIndex = movies.findIndex(m => m.id == req.params.id);

  if(foundIndex < 0) return res.sendStatus(400);

  const updatedMovie = {...movies[foundIndex], ...req.body};

  movies[foundIndex] = updatedMovie;
  serialize(jsonDbPath, movies);
  
  return res.json(updatedMovie);
});

module.exports = router;

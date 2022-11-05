var express = require("express");
var router = express.Router();

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
router.get('/', function (req, res, next) {
  let filteredList;
  if (req.query.minimumduration > 0){
    filteredList = MOVIES.filter(
      m => m.duration >= req.query.minimumduration
    );
    }
  console.log("GET /movies");
  res.json(filteredList ?? MOVIES);
});

/* GET all movies. */
router.get('/:id', function (req, res) {
  const movieIndex = MOVIES.findIndex(m => m.id == req.params.id);
  
  if(movieIndex <0) return res.status(400);
  console.log("GET /movies/:id");
  res.json(MOVIES[movieIndex]);
});

router.post('/', function (req, res) {
  const title = req?.body?.title?.lenght !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.lenght !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link) return res.sendStatus(400);
  
  const newId = MOVIES.length +1;

  const newMovie =
  {
    id: newId,
    title: title,
    duration: duration,
    budget: budget,
    link: link
  }
  
  MOVIES.push(newMovie);
  res.json(newMovie);
});

router.delete('/:id', function (req, res) {
  console.log(`DELETE /movies/${req.params.id}`);

  const foundIndex = MOVIES.findIndex(m => m.id == req.params.id);

  if(foundIndex < 0) return res.sendStatus(400);

  const removedMovies = MOVIES.splice(foundIndex, 1);
  const removedMovie = removedMovies[0];

  res.json(removedMovie);

});

router.patch('/:id', function (req, res) {
  console.log(`PATCH /movies/${req.params.id}`);

  const title = req?.body?.title?.lenght !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.lenght !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link) return res.sendStatus(400);

  const foundIndex = MOVIES.findIndex(m => m.id == req.params.id);

  if(foundIndex < 0) return res.sendStatus(400);

  const updatedMovie = {...MOVIES[foundIndex], ...req.body};

  MOVIES[foundIndex] = updatedMovie;

  res.json(updatedMovie);

});

module.exports = router;

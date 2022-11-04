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
  //const duration = req?.body?.duration?.value > 0 ? req.body.duration : undefined;
  //const budget = req?.body?.budget?.value > 0 ? req.body.budget : undefined;
  const duration =req.body.duration;
  const budget = req.body.budget;
  const link = req?.body?.link?.lenght !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link) return res.sendStatus(404);
  
  const newId = MOVIES.length +2;

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

module.exports = router;

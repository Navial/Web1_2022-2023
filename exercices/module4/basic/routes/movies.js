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
  console.log(req.query.minimumduration);
  let filteredList;
  if (req.query.minimumduration !== null){
    filteredList = MOVIES.filter(
      m => m.duration >= req.query.minimumduration
    );
    }
  console.log("GET /movies");
  res.json(filteredList ?? MOVIES);
});

module.exports = router;

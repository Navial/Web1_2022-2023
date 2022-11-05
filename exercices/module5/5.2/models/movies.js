
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

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
function readAllMovies() {
  console.log("GET /movies");
  return parse(jsonDbPath, MOVIES);
};

/* GET movie by its ID. */
function getMovieById(id) {
  console.log(`GET /movies/${id}`);
  const movies = parse(jsonDbPath, MOVIES);
  
  // eslint-disable-next-line eqeqeq
  const movieIndex = movies.findIndex(m => m.id == id);
  return movies[movieIndex];
};

/* Create a new movie */
function createNewMovie(title, duration, budget, link){
  console.log(`CREATE /movies`);
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

  return newMovie;
};

function deleteMovie(id){
  console.log(`DELETE /movies/${id}`);

  const movies = parse(jsonDbPath, MOVIES);
  // eslint-disable-next-line eqeqeq
  const foundIndex = movies.findIndex(m => m.id == id);

  const deletedMovies = movies.splice(foundIndex, 1);
  const deletedMovie = deletedMovies[0];

  serialize(jsonDbPath, movies);
  return deletedMovie;
};

function patchMovie(id, title, duration, budget, link){
  console.log(`PATCH /movies/${id}`);

  const movies = parse(jsonDbPath, MOVIES);
  // eslint-disable-next-line eqeqeq
  const foundIndex = movies.findIndex(m => m.id == id);
  const newMovie = 
  {
    "id": id,
    "title": title,
    "duration": duration,
    "budget": budget,
    "link": link
  };

  const updatedMovie = {...movies[foundIndex], ...newMovie};

  movies[foundIndex] = updatedMovie;
  serialize(jsonDbPath, movies);
  
  return updatedMovie;
};

module.exports = {
    createNewMovie,
    deleteMovie,
    getMovieById,
    patchMovie,
    readAllMovies
};

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import shutterImage from './img/shutter.jpg';
import interstellarImage from './img/interstellar.jpg';

const main = document.querySelector("main");

main.innerHTML = `<p>here're my fav movies</p>`

renderMovieImage(shutterImage);
renderMovieImage(interstellarImage);

function renderMovieImage(imageUrl){
    const image = new Image();
    image.src = imageUrl;
    image.height = 500;
    const images = document.querySelector('main');
    images.appendChild(image);
}
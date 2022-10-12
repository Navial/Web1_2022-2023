const btn = document.querySelector('#myBtn');
let compteur = document.querySelector('#compteur');
let compte = 0;

btn.addEventListener('click', (e) => {
    e.preventDefault();
    //let nvCompte = compteur ++;
    console.log(compteur);
    compteur.innerHTML = compte ++;
    if(compte >= 5 && compte <= 9)btn.innerHTML = "Bravo, bel échauffement !";
    else if(compte >= 10) btn.innerHTML = "Vous êtes passé maître en l'art du clic !";
})
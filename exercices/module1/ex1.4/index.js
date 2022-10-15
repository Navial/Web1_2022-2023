let etat = 1;
let timeoutId;
const red = document.querySelector("#red");
const orange = document.querySelector("#orange");
const green = document.querySelector("#green");

timeoutId = setInterval(changeState, 2000);


function changeState(){
    if(etat == 1){
        red.style.backgroundColor = "red";
        green.style.backgroundColor = "white";
        etat ++;
    }else if (etat == 2){
        console.log(etat);
        red.style.backgroundColor = "white";
        orange.style.backgroundColor = "orange";
        etat ++;
    }else{
        console.log(etat);
        orange.style.backgroundColor = "white";
        green.style.backgroundColor = "green";
        etat = 0;
    }
}

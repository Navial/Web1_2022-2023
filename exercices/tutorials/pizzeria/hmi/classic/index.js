const body = document.querySelector("body");

body.addEventListener("click", startOrStopSong);

function startOrStopSong(){
    const myAudioPlayer = document.querySelector("#audioPlayer");

    if(myAudioPlayer.paused) myAudioPlayer.play();
    else myAudioPlayer.pause();
}
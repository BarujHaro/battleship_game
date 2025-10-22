const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");

export function addMusicEvents(audioPlayer){
 

    playBtn.addEventListener('click', () => {
        audioPlayer.play(); 
        pauseBtn.style.display = "block";
        playBtn.style.display = "none";
    });

    pauseBtn.addEventListener('click', () => {
        audioPlayer.pause();
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
    });


}



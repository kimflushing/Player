const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const cover = document.getElementById("cover");
const lp = document.getElementById("lp");

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const songs = document.querySelectorAll(".song");

const lyricsPanel = document.getElementById("lyricsPanel");
const openLyrics = document.getElementById("openLyrics");
const closeLyrics = document.getElementById("closeLyrics");
const lyrics = document.getElementById("lyrics");

let current = 0;

const playlist = [

{

title:"White Silence",

artist:"Tsubaki",

file:"music/white_silence.mp3",

cover:"cover/album1.jpg",

lyrics:"lyrics/white_silence.lrc"

},

{

title:"Midnight",

artist:"Tsubaki",

file:"music/midnight.mp3",

cover:"cover/album2.jpg",

lyrics:"lyrics/midnight.lrc"

},

{

title:"Blue Rose",

artist:"Tsubaki",

file:"music/bluerose.mp3",

cover:"cover/album3.jpg",

lyrics:"lyrics/bluerose.lrc"

},

{

title:"Memory",

artist:"Tsubaki",

file:"music/memory.mp3",

cover:"cover/album4.jpg",

lyrics:"lyrics/memory.lrc"

}

];

function loadSong(index){

audio.src=playlist[index].file;

cover.src=playlist[index].cover;

title.textContent=playlist[index].title;

artist.textContent=playlist[index].artist;

songs.forEach(song=>song.classList.remove("active"));

songs[index].classList.add("active");

loadLyrics(playlist[index].lyrics);

localStorage.setItem("song",index);

}

loadSong(current);

playBtn.onclick=()=>{

if(audio.paused){

audio.play();

playBtn.textContent="⏸";

lp.style.display="block";

lp.classList.add("spin");

cover.style.opacity=".15";

}

else{

audio.pause();

playBtn.textContent="▶";

lp.classList.remove("spin");

}

}

nextBtn.onclick=()=>{

current++;

if(current>=playlist.length){

current=0;

}

loadSong(current);

audio.play();

playBtn.textContent="⏸";

lp.style.display="block";

lp.classList.add("spin");

cover.style.opacity=".15";

}

prevBtn.onclick=()=>{

current--;

if(current<0){

current=playlist.length-1;

}

loadSong(current);

audio.play();

playBtn.textContent="⏸";

lp.style.display="block";

lp.classList.add("spin");

cover.style.opacity=".15";

}

audio.onended=()=>{

nextBtn.click();

};

audio.ontimeupdate=()=>{

const percent=

(audio.currentTime/audio.duration)*100;

progress.value=percent;

currentTime.textContent=format(audio.currentTime);

duration.textContent=format(audio.duration);

updateLyrics();

}

progress.oninput=()=>{

audio.currentTime=

(progress.value/100)

*audio.duration;

}

volume.oninput=()=>{

audio.volume=

volume.value/100;

localStorage.setItem("volume",volume.value);

}

function format(sec){

if(isNaN(sec)) return "0:00";

const m=Math.floor(sec/60);

const s=Math.floor(sec%60);

return m+":"+(s<10?"0":"")+s;

}

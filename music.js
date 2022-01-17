
const music = document.querySelector('audio');
const img = document.querySelector("img");
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const genre = document.getElementById('genre');

let progress = document.getElementById('progress')
let total_duration = document.getElementById('duration')
let current_time = document.getElementById('currentTime')
const progress_div = document.getElementById('progress_div')

const songList = [
    {
        name: "audio1",
        title: "SiyaRam Lofi remix",
        artist: "Unknown",
        genre: "Emotional"
    },{
        name: "audio2",
        title: "Lovely",
        artist: "Billie Eilish",
        genre: "Pop"
    },{
        name: "audio3",
        title: "Industry Baby",
        artist: "lil nas x",
        genre: "Pop"
    },{
        name: "audio4",
        title: "Dilli ki Ladki",
        artist: "Tanzeel Khan",
        genre: "Pop"
    },{
        name: "audio5",
        title: "Kabhi Tumhhe",
        artist: "Sony Music India",
        genre: "Bollywood"
    },{
        name: "audio6",
        title: "Kya tujhe abb",
        artist: "T-Series",
        genre: "Emotional"
    },{
        name: "audio7",
        title: "Peed X Mood Swings",
        artist: "One Touch Solutions",
        genre: "Pop"
    },{
        name: "audio8",
        title: "Bijlee Bijlee",
        artist: "SuperHit songs",
        genre: "Bollywood"
    },{
        name: "audio9",
        title: "Manika Mage Hithe",
        artist: "Angulia Entertainment",
        genre: "Pop"
    },{
        name: "audio10",
        title: "Aye Khuda",
        artist: "T-Series",
        genre: "Emotional"
    },{
        name: "audio11",
        title: "Phone",
        artist: "Mickey Singh",
        genre: "Pop"
    },
]

let songs = [];
const API_KEY ='18710fb0650d1c749948bcd1398f12c7';
var Genre = "Bollywood";

console.log(`Genre: ${Genre}`)

for(var i=0;i<songList.length;i++){
                var obj = songList[i];
                if(obj.genre == Genre){
                songs.push(obj);
                }

            }
console.log(songs);

//Website functionality 

let isPlay = false;

const playMusic = ()=>{
    isPlay = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    play.title = 'Pause';
}

const pauseMusic = ()=>{
    isPlay = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    play.title = 'Play';
}

play.addEventListener('click', ()=>{
    isPlay? pauseMusic() : playMusic();
})

const loadSong = (songs)=>{
    //if(songs.genre == Genre){
        title.textContent = songs.title;
        artist.textContent = songs.artist;
        genre.textContent = songs.genre;
        music.src = `music/${songs.name}.mp3`;
        img.src = `photos/${songs.name}.jpg`;
    //}else{
        nextSong;
    //}
}

let songIndex = 1;

const nextSong = ()=>{
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

const prevSong = ()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}
loadSong(songs[0])

//progress bar

music.addEventListener('timeupdate', (event) => {
    const {currentTime, duration} = event.srcElement;
    let progress_time = (currentTime/duration) * 100;
    progress.style.width = `${progress_time}%`;
    let min = Math.floor(duration / 60);
    let sec = Math.floor(duration % 60);
    if(duration){
        if(sec<10){
            total_duration.textContent = `${min}:0${sec}`;
        }else{
            total_duration.textContent = `${min}:${sec}`;
        }
    }

    let m = Math.floor(currentTime/60);
    let s = Math.floor(currentTime%60);

    if(currentTime){
        if(s<10){
            current_time.textContent = `${m}:0${s}`;
        }else{
            current_time.textContent = `${m}:${s}`;
        }
    }


})

music.addEventListener("ended", nextSong);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

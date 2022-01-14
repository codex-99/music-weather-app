const music = document.querySelector('audio');
const img = document.querySelector("img");
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const songs = [
    {
        name: "audio1",
        title: "SiyaRam Lofi remix",
        artist: "Yash"
    },{
        name: "audio2",
        title: "Lovely",
        artist: "Billie Eilish"
    },{
        name: "audio1",
        title: "SiyaRam Lofi remix",
        artist: "Yash"
    },
]

let isPlay = false;

const playMusic = ()=>{
    isPlay = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
}

const pauseMusic = ()=>{
    isPlay = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
}

play.addEventListener('click', ()=>{
    isPlay? pauseMusic() : playMusic();
})

const loadSong = (songs)=>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    img.src = `photos/${songs.name}.jpg`;
    
}

songIndex = 1;

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

next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)

loadSong(songs[0])

const music = document.querySelector('audio');
const img = document.querySelector("img");
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const genre = document.getElementById('genre');

const songs = [
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
    }
]

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
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    genre.textContent = songs.genre;
    music.src = `music/${songs.name}.mp3`;
    img.src = `photos/${songs.name}.jpg`;
    
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

next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)

loadSong(songs[0])



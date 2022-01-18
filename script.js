
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const API_KEY ='18710fb0650d1c749948bcd1398f12c7';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);


getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
        console.log(data)
        const { current: { weather = [] } } = data || {};
            if(weather && weather.length) {
                console.log(weather[0])
                playSong(weather[0].main)
            }
        showWeatherData(data);
        })

    }, (error) => {
        let latitude = 28.704060, longitude  = 77.102493;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            const { current: { weather = [] } } = data || {};
            if(weather && weather.length) {
                console.log(weather[0])
                playSong(weather[0].main)
            }
            showWeatherData(data);
        })
    })
}


function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}


// Adding genres according to humidity.
function getGenre(data) {
  
  if (data === 'fog') {
    return "Emotional";
  } else if (data === '') {
    return "Bollywood";
  } else {
    return "Pop";
  }
}


// Music.js

const music = document.querySelector('audio');
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

function playSong(weather){
    var Genre = getGenre(weather);
    let songs = [];
    for(var i=0;i<songList.length;i++){
        var obj = songList[i];
        if(obj.genre === Genre){
            songs.push(obj);
        }
    }

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

}
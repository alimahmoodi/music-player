"use strict";
const container = document.querySelector(".container");
const songName = document.querySelector(".songs-detail .name");
const songArtist = document.querySelector(".songs-detail .artist");
const songImage = document.querySelector(".image-box img");
const mainAudio = document.querySelector("#main-audio");
const playPauseBtn = document.querySelector(".play-pause");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const progress = document.querySelector(".circle2");
const circle = document.querySelector(".circle");
const songDuration = document.querySelector(".timer .end");
const songCurrentTime = document.querySelector(".timer .start");
const repeatBtn = document.querySelector("#repeat-plist");
const fastForward = document.querySelector("#fast-forward");
const fastRewind = document.querySelector("#fast-rewind");
const speed = document.querySelector(".speed");

let songIndex = 1;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function loadSong(indexNum) {
  songName.innerHTML = songsList[indexNum - 1].name;
  songArtist.innerHTML = songsList[indexNum - 1].artist;
  songImage.src = `./images/${songsList[indexNum - 1].img}.jpg`;
  mainAudio.src = `./songs/${songsList[indexNum - 1].src}.mp3`;
}

function playSong() {
  container.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}
function pauseSong() {
  container.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

function nextSong() {
  songIndex++;
  songIndex > songsList.length ? (songIndex = 1) : (songIndex = songIndex);
  loadSong(songIndex);
  playSong();
}
function prevSong() {
  songIndex--;
  songIndex < 1 ? (songIndex = songsList.length) : (songIndex = songIndex);
  loadSong(songIndex);
  playSong();
}

window.addEventListener("load", () => {
  loadSong(songIndex);
});

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = container.classList.contains("paused");
  isMusicPaused ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  nextSong();
});
prevBtn.addEventListener("click", () => {
  prevSong();
});

mainAudio.addEventListener("timeupdate", (e) => {
  let currentTime = e.target.currentTime;
  let duration = e.target.duration;

  progress.style.strokeDashoffset =
    691 - (591 * (currentTime / duration) * 100) / 100;

  mainAudio.addEventListener("loadeddata", () => {
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    songDuration.innerHTML = `${totalMin}:${totalSec}`;
  });
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  songCurrentTime.innerHTML = `${currentMin}:${currentSec}`;
});

fastForward.addEventListener("click", () => {
  mainAudio.currentTime += 6;
  fastForward.setAttribute("title", "fast-forward");
});

fastRewind.addEventListener("click", () => {
  mainAudio.currentTime -= 6;
  fastRewind.setAttribute("title", "fast-rewind");
});

speed.addEventListener("click", () => {
  // speed.classList.toggle("add");
  if (mainAudio.playbackRate === 1) {
    mainAudio.playbackRate = 2;
    speed.classList.add("addColor");
  } else if (mainAudio.playbackRate > 1) {
    mainAudio.playbackRate = 1;
    speed.classList.remove("addColor");
  }
});

repeatBtn.addEventListener("click", () => {
  let getInerText = repeatBtn.innerText;
  if (getInerText == "repeat") {
    repeatBtn.innerText = "repeat_one";
    repeatBtn.setAttribute("title", "Song looped");
  } else if (getInerText == "repeat_one") {
    repeatBtn.innerText = "shuffle";
    repeatBtn.setAttribute("title", "Playback shuffled");
  } else if (getInerText == "shuffle") {
    repeatBtn.innerText = "repeat";
    repeatBtn.setAttribute("title", "Playlist looped");
  }
});

mainAudio.addEventListener("ended", () => {
  let getInerText = repeatBtn.innerText;
  if (getInerText === "repeat") {
    nextSong();
  } else if (getInerText === "repeat_one") {
    mainAudio.currentTime = 0;
    loadSong(songIndex);
    playSong();
  } else if (getInerText === "shuffle") {
    const shuffleMusic = randomIntFromInterval(1, songsList.length - 1);
    loadSong(shuffleMusic);
    playSong();
  }
});

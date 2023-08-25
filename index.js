const timeDisplay = document.querySelector("#timeDisplay");

const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

//Start button
startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now();
    intervalId = setInterval(updateTime, 1000);
  }
});

//Pause button
pauseBtn.addEventListener("click", () => {
  if (!(timeDisplay.textContent === "00:00:00")) {
    if (!paused) {
      paused = true;
      clearInterval(intervalId);
      pauseBtn.textContent = "Resume";
    } else {
      paused = false;
      startTime = Date.now() - elapsedTime;
      intervalId = setInterval(updateTime, 1000);
      pauseBtn.textContent = "Pause";
    }
  }
});

//Reset button
resetBtn.addEventListener("click", () => {
  if (paused) {
    pauseBtn.textContent = "Pause";
  } else {
    paused = true;
  }
  startTime = 0;
  elapsedTime = 0;
  currentTime = 0;
  clearInterval(intervalId);
  timeDisplay.textContent = "00:00:00";
});

//Update time
function updateTime() {
  elapsedTime = Date.now() - startTime;

  secs = Math.floor((elapsedTime / 1000) % 60);
  secs = addZeros(secs);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  mins = addZeros(mins);
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
  hrs = addZeros(hrs);

  timeDisplay.textContent = `${hrs}:${mins}:${secs}`;
  function addZeros(time) {
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  }
}

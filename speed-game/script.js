"use strict";
// initialize shorthands for query selector
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const startBtn = $(".startBtn");
const stopBtn = $(".stopBtn");
const circles = $$(".circle");
const score = $("#score");
const overlay = $(".overlay");
const reset = $(".btn");
const infoButton = $(".infoBtn");
const finalResult = $("#result");

let scoreCount = 0;
let active = 0;
let timer;
let speed = 1000;
let rounds = 0;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// game sound
let caught = new Audio("assets/sounds/caught.mp3");
let gameStartMusic = new Audio("assets/sounds/start.mp3");

const gameStart = () => {
  gameStartMusic.play();
  startBtn.style.visibility = "hidden";
  stopBtn.style.visibility = "visible";

  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });

  if (rounds >= 10) {
    gameEnd();
  } else {
    circles.forEach((circle) => {
      circle.classList.remove("active");
    });

    let nextActive = pickNewCircle(active);
    active = nextActive;
    timer = setTimeout(gameStart, speed);
    speed = speed - 10;

    circles[nextActive].classList.add("active");
    rounds++;
  }
};

function pickNewCircle(active) {
  let nextActive = getRandomNumber(0, 3);
  return nextActive != active ? nextActive : pickNewCircle(active);
}

circles.forEach((circle, e) => {
  circle.addEventListener("click", () => clickCircle(e));
});

const gameEnd = () => {
  circles.forEach((circle) => {
    circle.classList.remove("active");
  });
  score.textContent = 0;
  clearTimeout(timer);
  gameStartMusic.pause();

  if (scoreCount < 5) {
    finalResult.textContent = `Your final score is ${scoreCount}. Try harder?`;
  } else {
    finalResult.textContent = `Your final score is ${scoreCount}. Give it another try!`;
  }

  overlay.style.visibility = "visible";
  startBtn.style.visibility = "hidden";
  stopBtn.style.visibility = "hidden";
};

const clickCircle = (e) => {
  if (circles[e].classList.contains("active")) {
    caught.play();
    scoreCount++;
    rounds--;
    score.textContent = scoreCount;
  } else {
    gameEnd();
  }
};

const resetGame = () => {
  window.location.reload();
  stopBtn.style.visibility = "hidden";
};

startBtn.addEventListener("click", gameStart);
reset.addEventListener("click", resetGame);

stopBtn.addEventListener("click", () => {
  gameEnd();
  overlay.style.visibility = "visible";
});

// script.js
let startTime, updatedTime, difference;
let interval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 10);
        running = true;
        startStopBtn.textContent = 'Pause';
    } else {
        clearInterval(interval);
        running = false;
        startStopBtn.textContent = 'Start';
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    running = false;
    difference = 0;
    lapCounter = 0;
    display.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
    if (running) {
        lapCounter++;
        const lapTime = formatTime(difference);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(time) {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}


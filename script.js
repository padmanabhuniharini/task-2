let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime;
let lapTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

startButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        startButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapTime = 0;
    display.textContent = '00:00:00';
    startButton.textContent = 'Start';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        let lapElapsed = Date.now() - startTime - lapTime;
        lapTime += lapElapsed;
        console.log(formatTime(lapElapsed)); // Log lap time to console
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    let date = new Date(time);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

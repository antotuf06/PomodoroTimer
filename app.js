const startStopBtn = document.getElementById("start-stop");
const resetBtn = document.getElementById("reset");
const breakBtn = document.getElementById("break");
const longBreakBtn  = document.getElementById("long-break");
const timer = document.getElementById("timer");
const bellSound = document.getElementById("alarm-bell");

let timeLeft = 25 * 60; // 25 minutes in seconds
let interval;
let isRunning = false;
let breakTime = 5 * 60; // 5 minutes in seconds
let longBreakTime = 10 * 60; // 15 minutes in seconds
let breakRunning = false;
let breakInterval;

const updateTimerDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const updateStartButton = () => {
    startStopBtn.innerHTML = isRunning ? "Pause" : "Start"; //change the text of the start button to "Pause" when the timer is running and "Start" when it is not

    if (isRunning || breakRunning) {                                //add a class to the start button when the timer is running to change its color
        startStopBtn.classList.add("active-pause");
    } else {
        startStopBtn.classList.remove("active-pause");
    }
}

const toggleTimer = () => {
    if (isRunning || breakRunning) {
        stopTimer();
    } else {
        startTimer();
    }

    updateStartButton();
}

const startTimer = () => {
    if(isRunning || breakRunning) return; //if the timer is already running, do nothing
    
    isRunning = true;
    interval = setInterval(() => {      //every second, decrease the time left and update the display
        updateTimerDisplay();
        timeLeft--;

        if(timeLeft == 0)                //if the timer reaches 0, stop the timer, alert the user and ask if they want to start a break or a new pomodoro
        {
            isRunning = false;
            clearInterval(interval);
            bellSound.play();
            if(confirm("Time's up! Do you want to start a 5-minute break?")) {
                bellSound.pause();
                timeLeft = breakTime;
                startTimer();
            }
            else {
                timeLeft = 25 * 60;
            }
            updateTimerDisplay();
            
        }
    }, 1000)
}

const stopTimer = () => {
    isRunning = false;
    breakRunning = false;
    startStopBtn.disabled = false; //enable the start button when the timer is stopped
    breakBtn.disabled = false; //enable the break button when the timer is stopped
    longBreakBtn.disabled = false; //enable the long break button when the timer is stopped
    clearInterval(interval);
    clearInterval(breakInterval);
    alert("Timer stopped!");

}

const resetTimer = () => {
    isRunning = false;
    breakRunning = false;
    startStopBtn.disabled = false; //enable the start button when the timer is reset
    clearInterval(interval);
    clearInterval(breakInterval);
    alert("Timer reset!");
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

document.addEventListener('keydown', (event) => {  //pressing spacebar will start or stop the timer
    if (event.code === 'Space') {

        event.preventDefault();


        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }
});

startStopBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);
breakBtn.addEventListener("click", () => {
    timeLeft = breakTime;
    updateTimerDisplay();
});
longBreakBtn.addEventListener("click", () => {
    timeLeft = longBreakTime;
    updateTimerDisplay();
});
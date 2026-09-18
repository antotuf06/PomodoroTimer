const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");
const bellSound = document.getElementById("alarm-bell");

let timeLeft = 25 * 60; // 25 minutes in seconds
let interval;

const updateTimerDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
const startTimer = () => {
    interval = setInterval(() => {      //every second, decrease the time left and update the display
        timeLeft--;
        updateTimerDisplay();

        if(timeLeft == 0)                //if the timer reaches 0, stop the timer, alert the user and ask if they want to start a break or a new pomodoro
        {
            clearInterval(interval);
            bellSound.play();
            if(confirm("Time's up! Do you want to start a 5-minute break?")) {
                bellSound.pause();
                timeLeft = 5 * 60;
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
    clearInterval(interval);
    alert("Timer stopped!");

}

const resetTimer = () => {
    clearInterval(interval);
    alert("Timer reset!");
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);
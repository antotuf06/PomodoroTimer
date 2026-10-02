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
let longBreakTime = 10 * 60; // 10 minutes in seconds
let currentMode = "pomodoro"; // can be "pomodoro", "break", or "longBreak"
let breakInterval;

const updateTimerDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const updateStartButton = () => {
    startStopBtn.innerHTML = isRunning? "Pause" : "Start"; //change the text of the start button to "Pause" when the timer is running and "Start" when it is not

    if (isRunning) {                                //add a class to the start button when the timer is running to change its color
        startStopBtn.classList.add("active-pause");
    } else {
        startStopBtn.classList.remove("active-pause");
    }
}

const toggleTimer = () => {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }

    updateStartButton();
}

const startTimer = () => {
    if(isRunning) return; 
    
    isRunning = true;
    updateStartButton(); // Aggiorna graficamente il bottone

    interval = setInterval(() => {      
        timeLeft--;
        updateTimerDisplay();

        if(timeLeft == 0)  {              
            clearInterval(interval);
            bellSound.play();
            isRunning = false;
            updateStartButton(); 
            
            setTimeout(() => {
                // Legge la modalità attuale per decidere la prossima azione
                if(currentMode === "pomodoro" && confirm("Time's up! Do you want to start a 5-minute break?")) {
                    bellSound.pause();
                    bellSound.currentTime = 0;
                    
                    currentMode = "break"; // Cambia modalità
                    timeLeft = breakTime;
                    
                    updateTimerDisplay();
                    startTimer();
                }
                else if((currentMode === "break" || currentMode === "longBreak") && confirm("Break's over! Do you want to start a new pomodoro?")) {
                    bellSound.pause();
                    bellSound.currentTime = 0;
                    
                    currentMode = "pomodoro"; // Torna alla modalità lavoro
                    timeLeft = 25 * 60;
                    
                    updateTimerDisplay();
                    startTimer();
                }
                else {
                    // Fallback
                    bellSound.pause();
                    bellSound.currentTime = 0;
                    currentMode = "pomodoro";
                    timeLeft = 25 * 60; 
                    updateTimerDisplay();
                }
            }, 50);
        }
    }, 1000);
}

const stopTimer = () => {
    clearInterval(interval);
    updateStartButton();
    isRunning = false;
    breakBtn.disabled = false; //enable the break button when the timer is stopped
    longBreakBtn.disabled = false; //enable the long break button when the timer is stopped
    alert("Timer stopped!");

}

const resetTimer = () => {
    clearInterval(interval);
    isRunning = false;
    alert("Timer reset!");
    timeLeft = 25 * 60;
    updateStartButton();
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

resetBtn.addEventListener("click", () => {
    resetTimer();
    currentMode = "pomodoro"; //sets the mode to pomodoro when the timer is reset
    timeLeft = 25 * 60;
    updateTimerDisplay();
});

breakBtn.addEventListener("click", () => {
    currentMode = "break"; //sets the mode to break when the break button is clicked
    timeLeft = breakTime;
    updateTimerDisplay();
});

longBreakBtn.addEventListener("click", () => {
    currentMode = "longBreak"; //sets the mode to long break when the long break button is clicked
    timeLeft = longBreakTime;
    updateTimerDisplay();
});
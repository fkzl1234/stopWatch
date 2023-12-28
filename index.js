// stop-watch.js

document.addEventListener("DOMContentLoaded", function () {
  const timerElement = document.querySelector(".stop-watch-timer");
  const startButton = document.createElement("button");
  const pauseButton = document.createElement("button");
  const resetButton = document.createElement("button");
  const lapButton = document.createElement("button");
  const lapList = document.querySelector(".stop-watch-lap-list");
  let isRunning = false;
  let startTime;
  let lapNumber = 1;
  let elapsedTimeBeforePause = 0;

  startButton.textContent = "시작";
  pauseButton.textContent = "일시정지";
  resetButton.textContent = "초기화";
  lapButton.textContent = "랩 기록";

  document.querySelector(".stop-watch-control").appendChild(startButton);
  document.querySelector(".stop-watch-control").appendChild(pauseButton);
  document.querySelector(".stop-watch-control").appendChild(resetButton);
  document.querySelector(".stop-watch-control").appendChild(lapButton);

  pauseButton.style.display = "none";
  resetButton.style.display = "none";
  lapButton.style.display="none";

  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  resetButton.addEventListener("click", resetTimer);
  lapButton.addEventListener("click", recordLap);

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      startTime = Date.now() - elapsedTimeBeforePause;
      updateTimer();
      startButton.style.display = "none";
      pauseButton.style.display = "inline-block";
      resetButton.style.display = "inline-block";
      lapButton.style.display = "inline-block";
      lapButton.disabled = false;
      lapButton.style.backgroundColor = "#3498db";
      lapButton.style.color = "#fff";
    } else {
      isRunning = false;
      startButton.style.display = "inline-block";
      pauseButton.style.display = "none";
      resetButton.style.display = "inline-block";
      lapButton.style.display = "inline-block";
    }
  }

  function pauseTimer() {
    if (isRunning) {
      isRunning = false;
      elapsedTimeBeforePause = Date.now() - startTime;
    }
    startButton.textContent = "재시작";
    startButton.style.display = "inline-block";
    pauseButton.style.display = "none";
    resetButton.style.display = "inline-block";
    lapButton.style.display = "none";
  }

  function resetTimer() {
    isRunning = false;
    startButton.style.display = "inline-block";
    pauseButton.style.display = "none";
    resetButton.style.display = "none";
    lapButton.style.display = "none";
    lapButton.disabled = true;
    lapButton.style.backgroundColor = "#d3d3d3";
    lapButton.style.color = "#666";
    timerElement.textContent = "00:00.000";
    lapList.innerHTML = "";
    lapNumber = 1;
    elapsedTimeBeforePause = 0;
    startButton.textContent="시작"
  }

  function updateTimer() {
    if (isRunning) {
      const elapsedTime = Date.now() - startTime;
      const formattedTime = formatTime(elapsedTime);
      timerElement.textContent = formattedTime;
      requestAnimationFrame(updateTimer);
    }
  }

  function formatTime(milliseconds) {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${millisecondsFormatted.toString().padStart(3, "0")}`;
  }

  function recordLap() {
    const lapTime = timerElement.textContent;
    const lapTemplate = document.getElementById("stop-watch-lap");
    const lapClone = document.importNode(lapTemplate.content, true);
    lapClone.querySelector("li").textContent = `랩 ${lapNumber} : ${lapTime}`;
    lapList.appendChild(lapClone);
    lapNumber++;
  }

  function clearLapList() {
    lapList.innerHTML = "";
    lapNumber = 1;
    
    
  }
});

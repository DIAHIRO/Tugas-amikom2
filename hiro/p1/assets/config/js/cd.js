function startCountdown() {
  const countdownTime = (2 * 60 + 30) * 60 * 1000; //ini buat ngatur waktu countdown dimulai dari berpa jam sesuaikan sama durasi mengajar. kalau settingan ini di pakai buat jam belajar 2 jam 30 menit

  const storedCountdownTime = localStorage.getItem("countdownTime");
  let remainingTime;

  if (storedCountdownTime) {
    remainingTime = Math.max(
      0,
      countdownTime - (Date.now() - parseInt(storedCountdownTime))
    );
  } else {
    remainingTime = countdownTime;
    localStorage.setItem("countdownTime", Date.now());
  }

  function updateTimer() {
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${formatTime( //"timer" itu untuk ID span atau div yang di pakai buat tampilin cd nya
      hours
    )}:${formatTime(minutes)}:${formatTime(seconds)}`;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").innerHTML = "Kelas Selesai"; // ini pesan klo cd selesai 
      localStorage.removeItem("countdownTime");
    }

    remainingTime -= 1000;
  }

  const timerInterval = setInterval(updateTimer, 1000);

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  updateTimer();
}

startCountdown();

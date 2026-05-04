const DiscountDate = new Date("May 28, 2026 00:00:00").getTime();

const countdownday = setInterval(function() {

  const now = new Date().getTime();

  const distance = DiscountDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("mins").innerHTML = mins;
  document.getElementById("secs").innerHTML = secs;

  if (distance < 0) {
    clearInterval(countdownday);
    document.getElementById("countdown").innerHTML = "ĐÃ ĐẾN GIỜ!";
  }
}, 1000);

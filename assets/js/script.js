const DiscountDate = new Date("May 28, 2026 00:00:00").getTime();

const x = setInterval(function() {

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
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "ĐÃ ĐẾN GIỜ!";
  }
}, 1000);
//#shop
let rangeMin = document.getElementById("range-min");
let rangeMax = document.getElementById("range-max");
let inputMin = document.getElementById("input-min");
let inputMax = document.getElementById("input-max");
let progress = document.getElementById("progress");

const MIN_LIMIT = 33;
const MAX_LIMIT = 99;

function updateSlider() {
  if (parseInt(rangeMin.value) > parseInt(rangeMax.value)) {
    rangeMin.value = rangeMax.value;
  }
  if (parseInt(rangeMax.value) < parseInt(rangeMin.value)) {
    rangeMax.value = rangeMin.value;
  }

  inputMin.value = "$" + rangeMin.value;
  inputMax.value = "$" + rangeMax.value;

  let percentMin = ((rangeMin.value - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100;
  let percentMax = ((rangeMax.value - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100;

  progress.style.left = percentMin + "%";
  progress.style.right = (100 - percentMax) + "%";
}

rangeMin.addEventListener("input", updateSlider);
rangeMax.addEventListener("input", updateSlider);

updateSlider();
//#shopend
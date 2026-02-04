


// Slide-Show

const slidesContainer = document.getElementById("slides");
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");
const slider = document.getElementById("slider");

let index = 0;
let interval;

/* ===== CREATE DOTS ===== */
slides.forEach((_, i)=>{
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if(i===0) dot.classList.add("active");

  dot.addEventListener("click",()=>goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

/* ===== SHOW SLIDE ===== */
function showSlide(){
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(d=>d.classList.remove("active"));
  dots[index].classList.add("active");
}

/* ===== CONTROLS ===== */
function nextSlide(){
  index = (index + 1) % slides.length;
  showSlide();
}

function prevSlide(){
  index = (index - 1 + slides.length) % slides.length;
  showSlide();
}

function goToSlide(i){
  index = i;
  showSlide();
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

/* ===== AUTO SLIDE ===== */
function startAuto(){
  interval = setInterval(nextSlide, 3000);
}

function stopAuto(){
  clearInterval(interval);
}

startAuto();

/* ===== PAUSE ON HOVER ===== */
slider.addEventListener("mouseenter", stopAuto);
slider.addEventListener("mouseleave", startAuto);

/* ===== TOUCH SWIPE ===== */
let startX = 0;

slider.addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", e=>{
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if(diff > 50) nextSlide();
  if(diff < -50) prevSlide();
});


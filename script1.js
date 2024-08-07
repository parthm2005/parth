const left = document.querySelector('.left');
const right = document.querySelector('.right');
const slider = document.querySelector('.slider');
const images = document.querySelectorAll('.image');
const frame = document.querySelector('.frame');

let slideNumber = 0;

const updateSlideWidth = () => {
  const slideWidth = document.querySelector('.frame').clientWidth;
  slider.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
};

const showGradient = () => {
  frame.classList.add('fade-in');
  setTimeout(() => {
    frame.classList.remove('fade-in');
  }, 500);
};

const nextSlide = () => {
  const slideWidth = document.querySelector('.frame').clientWidth;
  if (slideNumber < images.length - 1) {
    slideNumber++;
  } else {
    slideNumber = 0;
  }
  slider.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
  showGradient();
};

const prevSlide = () => {
  const slideWidth = document.querySelector('.frame').clientWidth;
  if (slideNumber > 0) {
    slideNumber--;
  } else {
    slideNumber = images.length - 1;
  }
  slider.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
  showGradient();
};

window.addEventListener('resize', updateSlideWidth);
document.addEventListener('DOMContentLoaded', updateSlideWidth);

right.addEventListener('click', nextSlide);
left.addEventListener('click', prevSlide);

// Swipe detection
let startX;
let endX;

const handleTouchStart = (e) => {
  startX = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  endX = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  if (startX > endX + 50) {
    nextSlide();
  } else if (startX < endX - 50) {
    prevSlide();
  }
};

slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchmove', handleTouchMove);
slider.addEventListener('touchend', handleTouchEnd);

// Mouse events for desktop
let isDragging = false;
let startPos;
let currentTranslate;
let prevTranslate = 0;

const handleMouseDown = (e) => {
  isDragging = true;
  startPos = e.clientX;
};

const handleMouseMove = (e) => {
  if (isDragging) {
    const currentPos = e.clientX;
    currentTranslate = prevTranslate + currentPos - startPos;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }
};

const handleMouseUp = () => {
  isDragging = false;
  const slideWidth = document.querySelector('.frame').clientWidth;
  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100) {
    nextSlide();
  } else if (movedBy > 100) {
    prevSlide();
  } else {
    slider.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
  }
  prevTranslate = -slideNumber * slideWidth;
};

slider.addEventListener('mousedown', handleMouseDown);
slider.addEventListener('mousemove', handleMouseMove);
slider.addEventListener('mouseup', handleMouseUp);
slider.addEventListener('mouseleave', handleMouseUp);
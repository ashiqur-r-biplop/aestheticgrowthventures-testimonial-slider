const slider = document.querySelector(".sliders");
const slides = document.querySelectorAll(".slide");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
let slideIndex = 0;
let autoSlideInterval;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let isAutoSliding = true;

// Calculate slide width based on viewport
const getSlideWidth = () => slides[0].offsetWidth;

// Update slider transform
const updateSlider = () => {
  slider.style.transform = `translateX(-${slideIndex * getSlideWidth()}px)`;
};

// Move to next slide
const nextSlide = () => {
  slideIndex = (slideIndex + 1) % slides.length;
  updateSlider();
};

// Move to previous slide
const prevSlide = () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  updateSlider();
};

// Auto slide
const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    if (isAutoSliding) nextSlide();
  }, 3000);
};

// Stop auto slide
const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};

// Drag start
const touchStart = (event) => {
  isDragging = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  slider.classList.add("grabbing");
  stopAutoSlide();
};

// Drag move
const touchMove = (event) => {
  if (!isDragging) return;
  const currentPosition = getPositionX(event);
  currentTranslate = prevTranslate + currentPosition - startPos;
};

// Drag end
const touchEnd = () => {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100 && slideIndex < slides.length - 1) nextSlide();
  if (movedBy > 100 && slideIndex > 0) prevSlide();
  slider.classList.remove("grabbing");
  prevTranslate = -slideIndex * getSlideWidth();
  updateSlider();
  if (isAutoSliding) startAutoSlide();
};

// Get position (mouse or touch)
const getPositionX = (event) =>
  event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;

// Animation frame for smooth dragging
const animation = () => {
  slider.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
};

// Event listeners
slider.addEventListener("mousedown", touchStart);
slider.addEventListener("mousemove", touchMove);
slider.addEventListener("mouseup", touchEnd);
slider.addEventListener("mouseleave", () => {
  if (isDragging) touchEnd();
});
slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchmove", touchMove);
slider.addEventListener("touchend", touchEnd);

// Buttons
nextButton.addEventListener("click", () => {
  stopAutoSlide();
  nextSlide();
  if (isAutoSliding) startAutoSlide();
});
prevButton.addEventListener("click", () => {
  stopAutoSlide();
  prevSlide();
  if (isAutoSliding) startAutoSlide();
});

// Hover effects
slider.addEventListener("mouseenter", () => (isAutoSliding = false));
slider.addEventListener("mouseleave", () => {
  isAutoSliding = true;
  startAutoSlide();
});

// Responsive handling
const handleResize = () => {
  prevTranslate = -slideIndex * getSlideWidth();
  updateSlider();
};

window.addEventListener("resize", handleResize);

// Initialize slider
updateSlider();
startAutoSlide();

const sliders = document.querySelector(".sliders");
const seeMoreBtn = document.getElementById("btn-see-more");
const allDescription = document.querySelectorAll(".testimonial-description p");
console.log(allDescription);
let isDragging = false;
let startPos = 0;
let startX;
let slideWidth;
let autoSlideInterval;

// Clone the first and last slides for infinite effect
const firstSlide = sliders.firstElementChild.cloneNode(true);
const lastSlide = sliders.lastElementChild.cloneNode(true);
sliders.appendChild(firstSlide);
sliders.insertBefore(lastSlide, sliders.firstElementChild);

// Update slideWidth on resize
window.addEventListener("resize", () => {
  slideWidth = sliders.firstElementChild.offsetWidth;
});
slideWidth = sliders.firstElementChild.offsetWidth; // Initialize on load

// Initialize slider position
let currentSlide = 1;
sliders.scrollLeft = slideWidth;

// Auto-slide functionality
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    moveToSlide(currentSlide + 1);
  }, 3000); // Auto-slide every 3 seconds
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Move to a specific slide
function moveToSlide(slideIndex) {
  currentSlide = slideIndex;
  sliders.scrollTo({
    left: currentSlide * slideWidth,
    behavior: "smooth",
  });

  // Handle infinite loop effect
  if (currentSlide === 0) {
    setTimeout(() => {
      sliders.scrollLeft = (sliders.childElementCount - 2) * slideWidth;
      currentSlide = sliders.childElementCount - 2;
    }, 500);
  } else if (currentSlide === sliders.childElementCount - 1) {
    setTimeout(() => {
      sliders.scrollLeft = slideWidth;
      currentSlide = 1;
    }, 500);
  }
}

// Dragging functionality
sliders.addEventListener("mousedown", dragStart);
sliders.addEventListener("mousemove", dragMove);
sliders.addEventListener("mouseup", dragEnd);
sliders.addEventListener("mouseleave", dragEnd);

sliders.addEventListener("touchstart", dragStart, { passive: true });
sliders.addEventListener("touchmove", dragMove, { passive: true });
sliders.addEventListener("touchend", dragEnd);

function dragStart(e) {
  e.preventDefault(); // Prevent text selection or other default behavior
  isDragging = true;
  startX = getPositionX(e);
  startPos = sliders.scrollLeft;
  sliders.style.cursor = "grabbing";
  stopAutoSlide(); // Pause auto-slide during drag
}

function dragMove(e) {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  const diff = currentPosition - startX;

  sliders.scrollLeft = startPos - diff;
}

function dragEnd() {
  isDragging = false;
  sliders.style.cursor = "grab";

  // Snap to nearest slide
  const scrollLeft = sliders.scrollLeft;
  const nearestSlide = Math.round(scrollLeft / slideWidth);
  moveToSlide(nearestSlide);

  startAutoSlide(); // Resume auto-slide
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

// Hover to pause auto-slide
sliders.addEventListener("mouseenter", stopAutoSlide);
sliders.addEventListener("mouseleave", startAutoSlide);

// Start auto-slide on page load
startAutoSlide();

for (const des of allDescription) {
  const isLong = des.innerHTML.length > 400;
  console.log(isLong);
  if (isLong) {
    seeMoreBtn.style.display = "inline";
  }
  seeMoreBtn.innerText = !(des.innerText.toString().length > 400 == true)
    ? "Show More"
    : "Show Less";

  if (isLong) {
    // Truncate the description to 400 characters and add "..."
    const fullText = des.innerHTML;
    des.innerHTML = fullText.substring(0, 400) + "...";

    // Add an event listener to toggle the description
    seeMoreBtn.addEventListener("click", () => {
      if (seeMoreBtn.innerText === "Show More") {
        des.innerHTML = fullText; // Show full text
        seeMoreBtn.innerText = "Show Less";
      } else {
        des.innerHTML = fullText.substring(0, 400) + "..."; // Show truncated text
        seeMoreBtn.innerText = "Show More";
      }
    });
  }
}

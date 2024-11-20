const slider = document.querySelector(".sliders");
var w = window.innerWidth;
console.log(w);
const slides = document.querySelectorAll(
  `${w > 520 ? ".slide" : ".slide-inner"} `
);
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let slideIndex = 0;
let autoSlideInterval;
let isAutoSliding = true; // Initially auto sliding is on

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
  if (!isAutoSliding) return; // Only run if auto-sliding is enabled
  autoSlideInterval = setInterval(() => {
    if (isAutoSliding) nextSlide();
  }, 3000);
};

// Stop auto slide
const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};

// Next/Prev button clicks
nextButton.addEventListener("click", () => {
  stopAutoSlide(); // Stop auto-slide when button is clicked
  nextSlide();
  if (isAutoSliding) startAutoSlide(); // Re-enable auto-slide after button click
});
prevButton.addEventListener("click", () => {
  stopAutoSlide(); // Stop auto-slide when button is clicked
  prevSlide();
  if (isAutoSliding) startAutoSlide(); // Re-enable auto-slide after button click
});

// Hover effects (slider container)
slider.addEventListener("mouseenter", () => {
  isAutoSliding = false; // Stop auto-slide when hovering over the slider
  stopAutoSlide();
});

slider.addEventListener("mouseleave", () => {
  isAutoSliding = true; // Re-enable auto-slide when mouse leaves the slider
  startAutoSlide();
});

// Hover effects (Next/Prev buttons)
nextButton.addEventListener("mouseenter", () => {
  isAutoSliding = false; // Stop auto-slide when hovering over Next button
  stopAutoSlide();
});

prevButton.addEventListener("mouseenter", () => {
  isAutoSliding = false; // Stop auto-slide when hovering over Prev button
  stopAutoSlide();
});

nextButton.addEventListener("mouseleave", () => {
  if (isAutoSliding) startAutoSlide(); // Re-enable auto-slide when leaving Next button
});

prevButton.addEventListener("mouseleave", () => {
  if (isAutoSliding) startAutoSlide(); // Re-enable auto-slide when leaving Prev button
});

// Responsive handling
const handleResize = () => {
  updateSlider();
};

const allDesCription = document.querySelectorAll("testimonial-description p");
const spanBtn = document.getElementsByClassName("see_more_and_see_less_btn");

const allDescriptions = document.querySelectorAll(".testimonial-description p");
const spanBtns = document.getElementsByClassName("see_more_and_see_less_btn");

allDescriptions.forEach((description, index) => {
  const fullText = description.innerHTML.trim(); // Store full text
  const isLong = fullText.length > 400;

  if (isLong) {
    const truncatedText = fullText.substring(0, 400) + "..."; // Truncate text
    description.innerHTML = truncatedText; // Set initial truncated text

    // Get the corresponding span button
    const btn = spanBtns[index];

    // Set the button text
    btn.innerText = "Show More";
    btn.style.cursor = "pointer";

    // Add a click event listener to toggle the text
    btn.addEventListener("click", () => {
      if (btn.innerText === "Show More") {
        description.innerHTML = fullText; // Show full text
        btn.innerText = "Show Less";
      } else {
        description.innerHTML = truncatedText; // Show truncated text
        btn.innerText = "Show More";
      }
    });
  } else {
    const btn = spanBtns[index];
    btn.style.display = "none"; // Hide the button if the text is not long
  }
});

window.addEventListener("resize", handleResize);

// Initialize slider
updateSlider();
startAutoSlide();

// video
// Select all videos and play buttons
const videoContainers = document.querySelectorAll(".video-box");

videoContainers.forEach((container) => {
  const video = container.querySelector(".video");
  const playButton = container.querySelector(".play-button");

  // Play or pause video when the play button is clicked
  playButton.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playButton.classList.add("hidden"); // Hide the play button
    } else {
      video.pause();
      playButton.classList.remove("hidden"); // Show the play button
    }
  });

  // Show play button when the video is paused
  video.addEventListener("pause", () => {
    playButton.classList.remove("hidden");
  });

  // Hide play button when the video starts playing
  video.addEventListener("play", () => {
    playButton.classList.add("hidden");
  });
});

// Search modal
const headerSearchIcon = document.querySelector(".header_search-icon");
const searchModal = document.querySelector(".search-modal");
const closeSearchModalButton = document.querySelector(
  ".search-modal_close-icon"
);

const displaySearchModal = () => {
  searchModal.style.opacity = 1;
  searchModal.style.zIndex = 50;
};

const closeSearchModal = () => {
  searchModal.style.opacity = 0;
  searchModal.style.zIndex = 0;
};

headerSearchIcon.addEventListener("click", displaySearchModal);
closeSearchModalButton.addEventListener("click", closeSearchModal);

// Slide

let mainSlideActive = 0;
const mainSlideContainer = document.querySelector(".main-slide-container");
const mainSlideDetailHeader = document.querySelector(
  ".main-slide_slide-detail h1"
);
const mainSlideDetailContent = document.querySelector(
  ".main-slide_slide-detail p"
);
const mainSlideDetailButton = document.querySelectorAll(
  ".main-slide_slide-detail-button span"
);
const mainSlideControlLeft = document.querySelector(".main-slide-control_left");
const mainSlideControlRight = document.querySelector(
  ".main-slide-control_right"
);
const mainSlideItems = document.querySelectorAll(".main-slide_slide");
let mainSlideAuto = setInterval(nextSlide, 5000);

const mainSlideDetailHeaderAnimation = () => {
  mainSlideDetailHeader.style.transform = "translateX(-50%)";
  mainSlideDetailHeader.style.opacity = 0;
  setTimeout(() => {
    mainSlideDetailHeader.style.transform = "translateX(0)";
    mainSlideDetailHeader.style.opacity = 1;
  }, 1000);
};

const mainSlideDetailRestAnimation = (element) => {
  element.style.transform = "translateY(80%)";
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.transform = "translateY(0)";
    element.style.opacity = 1;
  }, 1000);
};

function nextSlide() {
  clearInterval(mainSlideAuto);
  if (mainSlideActive === mainSlideItems.length - 1) {
    mainSlideActive = 0;
  } else {
    mainSlideActive++;
  }
  mainSlideContainer.style.transform = `translateX(-${mainSlideActive * 100}%)`;
  mainSlideDetailHeaderAnimation();
  mainSlideDetailRestAnimation(mainSlideDetailContent);
  mainSlideDetailRestAnimation(mainSlideDetailButton[0]);
  mainSlideDetailRestAnimation(mainSlideDetailButton[1]);
  mainSlideAuto = setInterval(nextSlide, 5000);
}

function prevSlide() {
  clearInterval(mainSlideAuto);
  if (mainSlideActive === 0) {
    mainSlideActive = mainSlideItems.length - 1;
  } else {
    mainSlideActive--;
  }
  mainSlideContainer.style.transform = `translateX(-${mainSlideActive * 100}%)`;
  mainSlideDetailHeaderAnimation();
  mainSlideDetailRestAnimation(mainSlideDetailContent);
  mainSlideDetailRestAnimation(mainSlideDetailButton[0]);
  mainSlideDetailRestAnimation(mainSlideDetailButton[1]);
  mainSlideAuto = setInterval(nextSlide, 5000);
}

mainSlideControlRight.addEventListener("click", nextSlide);
mainSlideControlLeft.addEventListener("click", prevSlide);

// Preloader

const preloader = document.querySelector(".prev-loader");
window.onload = hidePreloader = () => {
  setTimeout(() => {
    preloader.style.display = "none";
    mainSlideDetailHeaderAnimation();
    mainSlideDetailRestAnimation(mainSlideDetailContent);
    mainSlideDetailRestAnimation(mainSlideDetailButton[0]);
    mainSlideDetailRestAnimation(mainSlideDetailButton[1]);
  }, 500);
};

// Category slide

let categorySlidesTranslateX = 0;
const widthTranslate = document.querySelector(
  ".category-slides_slide-container"
).clientWidth;
const categorySlides = document.querySelector(".category-slides");
const categorySlideControlLeft = document.querySelector(
  ".category-slides_control--left"
);
const categorySlideControlRight = document.querySelector(
  ".category-slides_control--right"
);

function prevCategorySlide() {
  if (categorySlidesTranslateX > 0) {
    categorySlidesTranslateX -= widthTranslate;
    categorySlides.style.transform = `translateX(-${categorySlidesTranslateX}px)`;
  }
}

function nextCategorySlide() {
  if (categorySlidesTranslateX < widthTranslate * 3) {
    categorySlidesTranslateX += widthTranslate;
    categorySlides.style.transform = `translateX(-${categorySlidesTranslateX}px)`;
  }
}

categorySlideControlLeft.addEventListener("click", prevCategorySlide);
categorySlideControlRight.addEventListener("click", nextCategorySlide);

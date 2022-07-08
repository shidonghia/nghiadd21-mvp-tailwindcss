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

// Scroll to top 
const scrollToTopBtn = document.querySelector(".scroll-to-top-btn")
scrollToTopBtn.addEventListener("click", function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
})

// Scroll window
const headerNavigation = document.querySelector(".header-navigation")
window.onscroll = () => {
  // Header Fixed
  if(document.documentElement.scrollTop > 200) {
    headerNavigation.classList.add("header-navigation--fixed")
  } else {
    headerNavigation.classList.remove("header-navigation--fixed")
  }

  // Display scroll to top button

  if(document.documentElement.scrollTop > 1000) {
    scrollToTopBtn.classList.add("scroll-to-top-btn--display")
  } else if(document.documentElement.scrollTop <= 0) {
    scrollToTopBtn.classList.remove("scroll-to-top-btn--display")
  }
}



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
  fetchCourses();
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

// Courses

function renderCourse(courses) {
  const coursesEle = courses.map((course) => {
    let courseStar = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= course.rate) {
        courseStar.push('<i class="fa-solid fa-star"></i>');
      } else {
        courseStar.push('<i class="fa-regular fa-star"></i>');
      }
    }
    return `
          <div class="courses-slides_slide">
            <div class="courses-slides_slide-container">
              <img
                src=${course.image}
                onerror="this.onerror=null;
                this.src='https://media5.sgp1.digitaloceanspaces.com/wp-content/uploads/2021/10/13143552/Anime-Anime-Wallpapers.jpg';" 
                alt=${course.name}
              />
              <span class="courses_course-price"> ${
                course.price > 0 ? course.price : "Free"
              } ${course.price ? "$" : ""} </span>
              <div class="courses_course-detail">
                <div class="courses_course-rate">
                  <span>
                    ${courseStar.join("")}
                  </span>
                  <p>(${course.rate_quantity} reviews)</p>
                </div>
                <h4 class="courses_course-title">
                  <a href="/">${course.name}</a>
                </h4>
                <div class="courses_course-info">
                  <span class="courses_course-teacher">
                    <img
                      src=${course.image}
                      onerror="this.onerror=null;
                      this.src='https://symbols.vn/wp-content/uploads/2021/12/Cap-nhat-cho-cac-ban-Hinh-dai-dien-avatar-nu-cute.jpg';"
                      alt=${course.teacher}
                    />
                    <p><a href="/">${course.teacher}</a></p>
                  </span>
                  <span class="courses_course-student">
                    <i class="fa-solid fa-user"></i>
                    ${course.total_enrolled}
                  </span>
                </div>
              </div>
            </div>
          </div>
  `;
  });
  const coursesSlideContainer = document.querySelector(
    ".courses-slides-container"
  );
  coursesSlideContainer.innerHTML += coursesEle.join("");
  const coursesContainer = document.querySelector(".courses-container");
  const coursesSlides = document.querySelectorAll(".courses-slides_slide");
  const coursesSlidesControlLeft = document.querySelector(
    ".courses-header_control-slide-left"
  );
  const coursesSlidesControlRight = document.querySelector(
    ".courses-header_control-slide-right"
  );
  const initialCoursesSlideLength = coursesSlides.length;
  const courseTranslateX = coursesSlides[0].clientWidth;
  let maxItemOnScreen = coursesSlideContainer.clientWidth / courseTranslateX;
  let firstSlideCourseOnScreen = 1;
  let lastSlideCourseOnScreen = firstSlideCourseOnScreen + maxItemOnScreen - 1;
  const firstCourseSlideClone = coursesSlides[0].cloneNode(true);
  const secondCourseSlideClone = coursesSlides[1].cloneNode(true);
  const lastCourseSlideClone =
    coursesSlides[initialCoursesSlideLength - 1].cloneNode(true);
  const nearLastCourseSlideClone =
    coursesSlides[initialCoursesSlideLength - 2].cloneNode(true);
  coursesSlideContainer.appendChild(firstCourseSlideClone);
  coursesSlideContainer.appendChild(secondCourseSlideClone);
  coursesSlideContainer.appendChild(coursesSlides[2].cloneNode(true));
  coursesSlideContainer.insertBefore(
    coursesSlides[initialCoursesSlideLength - 3].cloneNode(true),
    coursesSlides[0]
  );
  coursesSlideContainer.insertBefore(
    nearLastCourseSlideClone,
    coursesSlides[0]
  );
  coursesSlideContainer.insertBefore(lastCourseSlideClone, coursesSlides[0]);
  const marginLeftCoursesContainer = window
    .getComputedStyle(coursesContainer)
    .marginLeft.split("p")[0];

  function nextCourseSlide(e, initialPositon) {
    coursesSlideContainer.classList.add("courses-slides-container--move");
    firstSlideCourseOnScreen++;
    lastSlideCourseOnScreen++;
    console.log(initialPositon);
    let pos =
      initialPositon ||
      coursesSlideContainer.offsetLeft - marginLeftCoursesContainer;
    console.log(pos);
    coursesSlideContainer.style.left = pos - courseTranslateX + "px";
  }

  function prevCourseSlide(e, initialPositon) {
    coursesSlideContainer.classList.add("courses-slides-container--move");
    firstSlideCourseOnScreen--;
    lastSlideCourseOnScreen--;
    let pos =
      initialPositon ||
      coursesSlideContainer.offsetLeft - marginLeftCoursesContainer;
    coursesSlideContainer.style.left = pos + courseTranslateX + "px";
  }

  function checkFirstSlideIndex() {
    coursesSlideContainer.classList.remove("courses-slides-container--move");
    if (lastSlideCourseOnScreen > initialCoursesSlideLength + 2) {
      coursesSlideContainer.style.left = "-800px";
      firstSlideCourseOnScreen = 1;
      lastSlideCourseOnScreen = firstSlideCourseOnScreen + maxItemOnScreen - 1;
    } else if (firstSlideCourseOnScreen == -2) {
      coursesSlideContainer.style.left =
        -(initialCoursesSlideLength - maxItemOnScreen + 2) * courseTranslateX +
        "px";
      firstSlideCourseOnScreen = 4;
      lastSlideCourseOnScreen = firstSlideCourseOnScreen + maxItemOnScreen - 1;
    }
  }
  //// Drag slide
  let positionInitial;
  let positionX1;
  let positionX2;
  let positionFinal;
  function dragStart(e) {
    e.preventDefault();
    positionInitial =
      coursesSlideContainer.offsetLeft - marginLeftCoursesContainer;
    positionX1 = e.clientX;
    console.log(positionInitial, positionX1);
    document.onmousemove = dragging;
    document.onmouseup = dragEnd;
  }

  function dragging(e) {
    e.preventDefault();
    positionX2 = positionX1 - e.clientX;
    positionX1 = e.clientX;
    console.log("dragging", positionX2, positionX1);
    coursesSlideContainer.style.left =
      coursesSlideContainer.offsetLeft -
      marginLeftCoursesContainer -
      positionX2 +
      "px";
  }

  function dragEnd(e) {
    e.preventDefault();
    console.log("Ini", positionInitial);
    positionFinal =
      coursesSlideContainer.offsetLeft - marginLeftCoursesContainer;
    console.log(positionInitial, positionFinal);
    if (positionFinal - positionInitial < -courseTranslateX / 2) {
      nextCourseSlide(event, positionInitial);
    } else if (positionFinal - positionInitial > courseTranslateX / 2) {
      prevCourseSlide(event, positionInitial);
    } else {
      coursesSlideContainer.style.left = positionInitial + "px";
    }
    document.onmouseup = null;
    document.onmousemove = null;
  }

  setInterval(nextCourseSlide, 8000);

  coursesSlidesControlRight.addEventListener("click", nextCourseSlide);
  coursesSlidesControlLeft.addEventListener("click", prevCourseSlide);
  coursesSlideContainer.addEventListener("transitionend", checkFirstSlideIndex);
  coursesSlideContainer.addEventListener("mousedown", dragStart);
}

function fetchCourses() {
  axios
    .get("https://60d4611a61160900173cb070.mockapi.io/courses")
    .then((res) => {
      renderCourse(res.data);
    });
}

// Video

const videoPlayButton = document.querySelector(".video-button");
const videoCloseButton = document.querySelector(".video-embed span");
const videoModal = document.querySelector(".video-modal");
const videoEmbed = document.querySelector(".video-embed");
console.log(videoCloseButton);
function videoDisplayModal() {
  const elementIframe = document.createElement("iframe");
  elementIframe.setAttribute(
    "src",
    "https://www.youtube.com/embed/bRRtdzJH1oE"
  );
  elementIframe.setAttribute("frameborder", "0");
  videoEmbed.appendChild(elementIframe);
  videoModal.classList.add("video-modal--display");
}

function hideVideoModal() {
  videoEmbed.removeChild(videoEmbed.lastChild);
  videoModal.classList.remove("video-modal--display");
}

videoPlayButton.addEventListener("click", videoDisplayModal);
videoCloseButton.addEventListener("click", hideVideoModal);

// Slick

$(document).ready(function () {
  // testimanial-slides
  $(".testimonial-slides").slick({
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  });

  // logo partner
  $(".partner-logo-container").slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  });
});

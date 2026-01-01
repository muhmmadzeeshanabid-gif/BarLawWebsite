const navbar = document.querySelector(".main-navbar");
const heroSection = document.querySelector(".hero-section");

if (navbar && heroSection) {
  window.addEventListener("scroll", function () {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

    if (window.scrollY > heroBottom - 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

////////////////////////////////////////////////////

// ///////////////////////////////////
///////////////////////////////////////////////

////////////////////////////////////////////////////
////////////////////////////////////////
const shanPlayBtn = document.getElementById("shanPlayBtn");
const shanVideoModal = document.getElementById("shanVideoModal");
const shanCloseBtn = document.getElementById("shanCloseBtn");
const shanYoutubeVideo = document.getElementById("shanYoutubeVideo");
const shanVideoURL = "https://www.youtube.com/embed/y8fmBHcfr4s?autoplay=1";

if (shanPlayBtn && shanVideoModal && shanYoutubeVideo) {
  shanPlayBtn.onclick = () => {
    shanVideoModal.classList.add("active");
    shanYoutubeVideo.src = shanVideoURL;
  };
}

if (shanCloseBtn && shanVideoModal && shanYoutubeVideo) {
  shanCloseBtn.onclick = () => {
    shanVideoModal.classList.remove("active");
    shanYoutubeVideo.src = "";
  };
}
////////////////////////////////////////
//////////////////////////////////////

/////////////////////////////////////////////
///////////////////////////////////////////////
// Reviews Slider JavaScript
const slider = document.getElementById("slider");
let cards = slider ? slider.children : [];
let index = 0;
let visible = 1; // default

if (slider) {
  function setCardWidth() {
    const wrapper = document.querySelector(".slider-wrapper");
    if (!wrapper) return;
    const wrapperWidth = wrapper.offsetWidth;
    if (window.innerWidth < 768) {
      visible = 1;
    } else if (window.innerWidth < 1200) {
      visible = 2;
    } else {
      visible = 3;
    }
    const cardWidth = (wrapperWidth - (visible - 1) * 20) / visible; // gap 20px
    for (let c of cards) {
      c.style.width = cardWidth + "px";
    }
  }

  function setupInfinite() {
    const clonesBefore = [];
    const clonesAfter = [];
    for (let i = 0; i < visible; i++) {
      clonesAfter.push(slider.children[i].cloneNode(true));
      clonesBefore.push(
        slider.children[slider.children.length - 1 - i].cloneNode(true)
      );
    }
    clonesAfter.forEach((c) => slider.appendChild(c));
    clonesBefore
      .reverse()
      .forEach((c) => slider.insertBefore(c, slider.firstChild));
    cards = slider.children;
    index = visible;
    updateSlider();
  }

  function updateSlider() {
    const cardWidth = cards[0].getBoundingClientRect().width + 20;
    slider.style.transition = "none";
    slider.style.transform = `translateX(-${cardWidth * index}px)`;
  }

  let isMoving = false;

  function move(dir) {
    if (isMoving) return;
    const cardWidth = cards[0].getBoundingClientRect().width + 20;

    isMoving = true;
    index += dir;
    slider.style.transition = "transform 0.6s ease";
    slider.style.transform = `translateX(-${cardWidth * index}px)`;

    slider.addEventListener(
      "transitionend",
      () => {
        isMoving = false;
        const currentCardWidth = cards[0].getBoundingClientRect().width + 20;

        if (index >= cards.length - visible) {
          slider.style.transition = "none";
          index = visible;
          slider.style.transform = `translateX(-${currentCardWidth * index}px)`;
        } else if (index < visible) {
          slider.style.transition = "none";
          index = cards.length - 2 * visible;
          slider.style.transform = `translateX(-${currentCardWidth * index}px)`;
        }
      },
      { once: true }
    );
  }

  window.addEventListener("resize", () => {
    visible = window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;
    setCardWidth();
    updateSlider();
  });

  setCardWidth();
  setupInfinite();
  // expose move to global so inline buttons can use it
  window.move = move;
}

////////////////////////////////////////
//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
  $(".faq-question").click(function () {
    var parent = $(this).parent();
    var answer = parent.find(".faq-answer");
    var icon = $(this).find(".faq-icon");

    $(".faq-answer").not(answer).slideUp(250);
    $(".faq-icon").not(icon).text("+");

    if (answer.is(":visible")) {
      answer.slideUp(250);
      icon.text("+");
    } else {
      answer.slideDown(250);
      icon.text("−");
    }
    // ... existing code ...
  });
});

// Auto-highlight active nav link
document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop(); // Get filename (e.g. generalcouncel.html)
  const menuItems = document.querySelectorAll(".nav-link, .dropdown-item");

  menuItems.forEach((link) => {
    // Get the href filename
    const linkPath = link.getAttribute("href");

    // Check if filenames match (handling empty path for index usually)
    if (linkPath === currentPath || (linkPath === "" && currentPath === "index.html") || (linkPath === "#")) {
      // Skip '#' links unless necessary, usually we only want real pages
      if (linkPath === "#") return;
    }

    if (linkPath === currentPath) {
      link.classList.add("active");

      // Also highlight parent dropdown if it's a dropdown item
      const parentDropdown = link.closest(".dropdown");
      if (parentDropdown) {
        const parentToggle = parentDropdown.querySelector(".nav-link");
        if (parentToggle) parentToggle.classList.add("active");
      }
    }
  });
});

// Footer Subscription Logic
document.addEventListener("DOMContentLoaded", function () {
  const subscribeBtn = document.getElementById("subscribe-btn");
  const subscribeInput = document.getElementById("subscribe-input");
  const formContainer = document.getElementById("subscribe-form-container");

  if (subscribeBtn && subscribeInput && formContainer) {
    subscribeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const emailValue = subscribeInput.value.trim();

      // Basic Email Regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(emailValue)) {
        // Hide/Remove existing content and show success message
        formContainer.innerHTML = '<div class="subscribe-success">Thank you! Your submission has been received!</div>';
        formContainer.style.display = "block"; // Reset flex if necessary
      } else {
        // feedback for invalid email
        subscribeInput.style.borderColor = "red";
      }
    });

    // Reset border on type
    subscribeInput.addEventListener("input", function () {
      subscribeInput.style.borderColor = "rgba(255, 255, 255, 0.3)";
    });
  }
});

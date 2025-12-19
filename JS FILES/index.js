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
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1, // Mobile
      },
      576: {
        items: 3, // Small Tablets
      },
      768: {
        items: 4, // Tablets
      },
      992: {
        items: 5, // Desktop
      },
      1200: {
        items: 6, // Large desktop
      },
    },
  });
});

////////////////////////////////////////////////////
////////////////////////////////////////
const shanPlayBtn = document.getElementById("shanPlayBtn");
const shanVideoModal = document.getElementById("shanVideoModal");
const shanCloseBtn = document.getElementById("shanCloseBtn");
const shanYoutubeVideo = document.getElementById("shanYoutubeVideo");
const shanVideoURL = "https://www.youtube.com/embed/y8fmBHcfr4s?autoplay=1";

shanPlayBtn.onclick = () => {
  shanVideoModal.classList.add("active");
  shanYoutubeVideo.src = shanVideoURL;
};

shanCloseBtn.onclick = () => {
  shanVideoModal.classList.remove("active");
  shanYoutubeVideo.src = "";
};
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

  function move(dir) {
    const cardWidth = cards[0].getBoundingClientRect().width + 20;
    index += dir;
    slider.style.transition = "transform 0.6s ease";
    slider.style.transform = `translateX(-${cardWidth * index}px)`;

    setTimeout(() => {
      if (index >= cards.length - visible) {
        slider.style.transition = "none";
        index = visible;
        slider.style.transform = `translateX(-${cardWidth * index}px)`;
      }
      if (index < visible) {
        slider.style.transition = "none";
        index = cards.length - 2 * visible;
        slider.style.transform = `translateX(-${cardWidth * index}px)`;
      }
    }, 600);
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
  });
});

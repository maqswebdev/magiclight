//import $ from 'jquery'; window.jQuery = $; window.$ = $ // import module example (npm i -D jquery)
import $ from "jquery";
window.$ = window.jQuery = $;
import modal from "jquery-modal";
import IMask from "imask";
import Tabby from "tabbyjs";
import { Fancybox } from "@fancyapps/ui";
import SmoothScroll from "smooth-scroll";

require("~/app/js/vendor/animateNumber/jquery.animateNumber.min.js");

document.addEventListener("DOMContentLoaded", () => {
  function removeActiveClass() {
    document.querySelectorAll(".main-nav__item").forEach((link) => {
      link.classList.remove("active");
    });
  }

  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("link")) {
      removeActiveClass();
    }
  });

  const $allPageLinks = document.querySelectorAll(".link");
  $allPageLinks.forEach(($link) => {
    $link.addEventListener("click", function () {
      removeActiveClass();
    });
  });

  const $phoneMask = document.querySelectorAll(".input-phone");
  if ($phoneMask) {
    $phoneMask.forEach((phone) => {
      IMask(phone, {
        mask: "+{7} (000) 000-00-00",
      });
    });
  }

  const themeSmoothScroll = new SmoothScroll('a[href*="#"]', {
    updateURL: false,
  });

  const $chatBot = document.querySelector(".chat-bot");
  const $chatBotClose = document.querySelector(".chat-bot__close");
  const $chatBotIcon = document.querySelector(".chat-bot-icon");
  if ($chatBotIcon) {
    $chatBotIcon.addEventListener("click", function () {
      $chatBot.classList.add("active");
    });
  }
  if ($chatBotClose) {
    $chatBotClose.addEventListener("click", function () {
      $chatBot.classList.remove("active");
    });
  }

  /** VIDEO LAZYLOAD */
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (
              typeof videoSource.tagName === "string" &&
              videoSource.tagName === "SOURCE"
            ) {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
  /** END VIDEO LAZYLOAD */

  /** LazyLoad Images */
  const $lazyImages = document.querySelectorAll(
    "img[data-src],source[data-srcset]"
  );
  const windowHeight = document.documentElement.clientHeight;

  let lazyImagesPositions = [];
  if ($lazyImages.length) {
    $lazyImages.forEach((lazyImg) => {
      if (lazyImg.dataset.src || lazyImg.dataset.srcset) {
        lazyImagesPositions.push(
          lazyImg.getBoundingClientRect().top + pageYOffset
        );
        lazyScrollCheck();
      }
    });
  }

  window.addEventListener("scroll", lazyScroll);

  function lazyScroll() {
    if (
      document.querySelectorAll("img[data-src],source[data-srcset]").length > 0
    ) {
      lazyScrollCheck();
    }
  }

  function lazyScrollCheck() {
    let imgIndex = lazyImagesPositions.findIndex(
      (imgItem) => pageYOffset > imgItem - windowHeight
    );
    if (imgIndex >= 0) {
      if ($lazyImages[imgIndex].dataset.src) {
        $lazyImages[imgIndex].src = $lazyImages[imgIndex].dataset.src;
        $lazyImages[imgIndex].removeAttribute("data-src");
        setTimeout(() => {
          $lazyImages[imgIndex].parentElement.classList.remove("loading");
        }, 200);
      } else if ($lazyImages[imgIndex].dataset.srcset) {
        $lazyImages[imgIndex].srcset = $lazyImages[imgIndex].dataset.srcset;
        $lazyImages[imgIndex].removeAttribute("data-srcset");
        setTimeout(() => {
          $lazyImages[imgIndex].parentElement.parentElement.classList.remove(
            "loading"
          );
        }, 200);
      }
      delete lazyImagesPositions[imgIndex];
    }
  }
  /** End LazyLoad Images */

  /** Sliders */
  function initImagesSlider() {
    const imagesSlider = new Swiper(".images-slider", {
      slidesPerView: 1,
      lazy: true,
      loop: false,
      effect: "fade",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
  initImagesSlider();

  const gallerySlider = new Swiper(".gallery-slider", {
    slidesPerView: 1,
    lazy: true,
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    /*autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },*/
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });

  const reviewsSlider = new Swiper(".reviews-slider", {
    slidesPerView: 1,
    lazy: true,
    loop: false,
    spaceBetween: 15,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });

  const videoSlider = new Swiper(".video-slider", {
    slidesPerView: "auto",
    lazy: true,
    loop: true,
    spaceBetween: 15,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      480: {
        spaceBetween: 15,
      },
      767: {
        spaceBetween: 30,
      },
      1200: {
        spaceBetween: 50,
      },
    },
  });

  const portfolioSlider = new Swiper(".portfolio-slider", {
    slidesPerView: 1,
    lazy: true,
    loop: false,
    spaceBetween: 15,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
  /** End Sliders */

  /** Init Tabs */
  function initTabs() {
    const tabSelectors = document.querySelectorAll("[data-tabs]");
    for (const [i, tabs] of [...tabSelectors].entries()) {
      tabs.setAttribute(`data-tabs-${i}`, "");
      new Tabby(`[data-tabs-${i}]`);
    }
  }
  initTabs();
  document.addEventListener(
    "tabby",
    function (event) {
      initImagesSlider();
    },
    false
  );

  /** End Init Tabs */

  // Hamburger Menu
  const $burgerBtn = document.querySelector(".hamburger-menu");
  const $mainNavClose = document.querySelector(".main-nav__close");

  function toggleMainNav(el, action = "open") {
    const $mainNav = document.querySelector(".main-nav");
    el.addEventListener("click", function () {
      if (action === "close") {
        $mainNav.classList.remove("active");
        document.body.style.overflow = "";
      } else {
        $mainNav.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  }
  toggleMainNav($burgerBtn);
  toggleMainNav($mainNavClose, "close");

  Fancybox.bind("[data-fancybox]", {
    animated: false,
  });

  // Jquery Functions

  var comma_separator_number_step =
    $.animateNumber.numberStepFactories.separator(" ");
  $(".count").each(function () {
    var tcount = $(this).data("count");
    $(this).animateNumber(
      {
        number: tcount,
        numberStep: comma_separator_number_step,
      },
      1000
    );
  });

  $("a[data-modal]").click(function (event) {
    $(this).modal({
      showClose: false,
      fadeDuration: 300,
    });
    return false;
  });

  $(".main-nav__item.has-child").on("mouseenter", function () {
    setTimeout(() => {
      $(".main-nav__item")
        .removeClass("active")
        .eq($(this).index())
        .addClass("active");
    }, 200);
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > $(this).height()) {
      $(".to-top").addClass("active");
    } else {
      $(".to-top").removeClass("active");
    }
  });

  $(".to-top").on("click", function () {
    $("html, body").stop().animate({ scrollTop: 0 }, "slow", "swing");
  });
});

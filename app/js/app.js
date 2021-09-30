//import $ from 'jquery'; window.jQuery = $; window.$ = $ // import module example (npm i -D jquery)
import IMask from "imask";

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("link")) {
      document.querySelectorAll(".main-nav__item ").forEach((link) => {
        link.classList.remove("active");
      });
    }
  });

  const $phoneMask = document.querySelectorAll(".input-phone");
  if ($phoneMask) {
    $phoneMask.forEach((phone) => {
      IMask(phone, {
        mask: "+{7} (000) 000-00-00",
      });
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
          $lazyImages[imgIndex].parentElement.parentElement.classList.remove(
            "loading"
          );
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

  // Hamburger Menu
  const $burgerBtn = document.querySelector(".hamburger");
  const $mainNavClose = document.querySelector(".main-nav__close");

  function toggleMainNav(el, action = "open") {
    const $hamburgerBtn = document.querySelector(".hamburger");
    const $mainNav = document.querySelector(".main-nav");
    el.addEventListener("click", function () {
      if (action === "close") {
        $hamburgerBtn.classList.remove("is-active");
        $mainNav.classList.remove("active");
        document.body.style.overflow = "";
      } else {
        $hamburgerBtn.classList.add("is-active");
        $mainNav.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  }
  toggleMainNav($burgerBtn);
  toggleMainNav($mainNavClose, "close");

  // Jquery Functions
  // $(window).on("load", function () {
  //   $(".preloader").delay(700).fadeOut("slow");
  // });

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
});

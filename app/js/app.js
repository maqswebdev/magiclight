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

  $(".main-nav__item.has-child").on("mouseenter", function () {
    setTimeout(() => {
      $(".main-nav__item")
        .removeClass("active")
        .eq($(this).index())
        .addClass("active");
    }, 200);
  });
});

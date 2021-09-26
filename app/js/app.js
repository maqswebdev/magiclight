//import $ from 'jquery'; window.jQuery = $; window.$ = $ // import module example (npm i -D jquery)

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("link")) {
      document.querySelectorAll(".main-nav__item ").forEach((link) => {
        link.classList.remove("active");
      });
    }
  });

  // Hamburger Menu
  const $hamburgerBtn = document.querySelector(".hamburger");
  const $mainNav = document.querySelector(".main-nav");
  if ($hamburgerBtn) {
    $hamburgerBtn.addEventListener("click", function () {
      $mainNav.classList.toggle("active");
      /*if (this.classList.contains("is-active")) {
        this.classList.remove("is-active");
        $mainNav.classList.remove("active");
        document.body.style.overflow = "";
      } else {
        this.classList.add("is-active");
        $mainNav.classList.add("active");
        document.body.style.overflow = "hidden";
      }*/
    });
  }
  const $mainNavClose = document.querySelector(".main-nav__close");
  if ($mainNavClose) {
    $mainNavClose.addEventListener("click", function () {
      $mainNav.classList.toggle("active");
    });
  }

  $(".main-nav__item.has-child").on("mouseenter", function () {
    setTimeout(() => {
      $(".main-nav__item")
        .removeClass("active")
        .eq($(this).index())
        .addClass("active");
    }, 200);
  });
});

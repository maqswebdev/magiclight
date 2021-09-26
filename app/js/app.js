//import $ from 'jquery'; window.jQuery = $; window.$ = $ // import module example (npm i -D jquery)

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("link")) {
      document.querySelectorAll(".main-nav__item ").forEach((link) => {
        link.classList.remove("active");
      });
    }
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

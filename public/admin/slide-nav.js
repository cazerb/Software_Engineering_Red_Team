const navSlide = () => {
  const BURGER = document.querySelector(".burger");
  const NAV = document.querySelector(".nav-links");
  const NAVLINKS = document.querySelectorAll(".nav-links li");

  BURGER.addEventListener("click", () => {
    NAV.classList.toggle("nav-active");

    NAVLINKS.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 10 +
          1}s`;
      }
    });

    BURGER.classList.toggle("toggle");
  });
};

navSlide();

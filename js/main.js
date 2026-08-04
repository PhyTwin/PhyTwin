document.documentElement.classList.add("js");

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduce) {
  document.querySelectorAll(".atmosphere").forEach((el) => {
    el.style.animation = "none";
  });
}

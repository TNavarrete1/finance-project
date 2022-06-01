// Sets theme
export const setTheme = (themeName) => {
  const body = document.querySelector("body");
  localStorage.setItem("theme", themeName);
  if (themeName === "theme-dark") {
    body.className = `${themeName}-${body.dataset.page}`;
    return;
  }
  body.className = themeName;
};
export const toggleTheme = () => {
  const themes = document.querySelectorAll(".themes");
  const themeToggle = document.querySelectorAll(".theme-toggle");
  const handleThemeToggle = (e) => {
    if (localStorage.getItem("theme") === "theme-light") {
      setTheme("theme-dark");
      for (let index = 0; index < themeToggle.length; index++) {
        themeToggle[index].classList.add("dark-theme-active");
      }
    } else {
      setTheme("theme-light");
      for (let index = 0; index < themeToggle.length; index++) {
        themeToggle[index].classList.remove("dark-theme-active");
      }
    }
  };
  // Adds click even to themes elements
  for (let index = 0; index < themes.length; index++) {
    themes[index].addEventListener("click", handleThemeToggle);
  }
};
const loadTheme = () => {
  const body = document.querySelector("body");
  const themeToggle = document.querySelectorAll(".theme-toggle");
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
    for (let index = 0; index < themeToggle.length; index++) {
      themeToggle[index].classList.add("dark-theme-active");
    }
  } else {
    setTheme("theme-light");
    for (let index = 0; index < themeToggle.length; index++) {
      themeToggle[index].classList.remove("dark-theme-active");
    }
  }
  body.classList.add("preload");
};
// Sets theme on page load
const main = function () {
  const body = document.querySelector("body");
  loadTheme();
  // Removes preload class on window load
  window.addEventListener("load", () => {
    body.classList.remove("preload");
  });
};

main();

const modalExitBtn = document.getElementById("modal-exit-icon");
const navHamburger = document.getElementById("nav-hamburger");
const navModal = document.getElementById("nav-modal");
const toggleNavModal = () => {
  if (!navModal.classList.contains("open")) {
    navModal.classList.add("open");
  } else {
    navModal.classList.remove("open");
  }
};
navHamburger.addEventListener("click", toggleNavModal);
modalExitBtn.addEventListener("click", toggleNavModal);

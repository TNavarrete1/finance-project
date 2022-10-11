import { toggleTheme } from "/src/shared.js";
const modal = () => {
  const viewPort = document.getElementById("viewport-wrapper");
  const modalExitBtn = document.getElementById("modal-exit-icon");
  const navHamburger = document.getElementById("nav-hamburger");
  const navModal = document.getElementById("nav-modal");
  const navModalBg = document.getElementById("modal-bg");

  const toggleNavModal = () => {
    if (!navModal.classList.contains("openModal")) {
      navModal.classList.add("openModal");
      navModalBg.classList.add("openModal");
      viewPort.style.overflowY = "hidden";
    } else {
      navModal.classList.remove("openModal");
      navModalBg.classList.remove("openModal");
      viewPort.style.overflowY = "auto";
    }
  };

  navHamburger.addEventListener("click", toggleNavModal);
  modalExitBtn.addEventListener("click", toggleNavModal);
  navModalBg.addEventListener("click", toggleNavModal);
};

const checkUser = () => {
  // Html elements
  const profileIcon = document.getElementById("profile-icon");
  if (!profileIcon) {
    return;
  }
  const caretIcon = profileIcon.lastElementChild;
  const profileDropdownMenu = document.getElementById("profile-dropdown-menu");
  const toggleDropdownMenu = () => {
    if (!profileDropdownMenu.classList.contains("openDropdown")) {
      profileDropdownMenu.classList.add("openDropdown");
      caretIcon.style.transform = "rotate(180deg)";
    } else {
      profileDropdownMenu.classList.remove("openDropdown");
      caretIcon.style.transform = "rotate(0deg)";
    }
  };

  profileIcon.addEventListener("click", toggleDropdownMenu);
};

function main() {
  modal();
  toggleTheme();
  checkUser();
}

main();

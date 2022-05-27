const modal = () => {
  const modalExitBtn = document.getElementById("modal-exit-icon");
  const navHamburger = document.getElementById("nav-hamburger");
  const navModal = document.getElementById("nav-modal");

  const toggleNavModal = () => {
    if (!navModal.classList.contains("openModal")) {
      navModal.classList.add("openModal");
    } else {
      navModal.classList.remove("openModal");
    }
  };

  navHamburger.addEventListener("click", toggleNavModal);
  modalExitBtn.addEventListener("click", toggleNavModal);
};

const checkUser = async () => {
  // Html elements
  const profileIcon = document.getElementById("profile-icon");
  const caretIcon = profileIcon.lastElementChild;
  const profileDropdownMenu = document.getElementById("profile-dropdown-menu");
  console.log(caretIcon);

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
  checkUser();
}

main();

import { toggleTheme } from "/src/shared.js";

const toggleSidebarIcon = () => {
  // Handles sidebar icon clicks
  const handleClick = async function (e) {
    // Get elements
    const activeIcon = document.querySelector(".sidebar-icon-active");
    const currIcon = await e.currentTarget;
    const activePanel = document.querySelector(".panel-open");
    const currPanel = document.querySelector(
      `#panel-${currIcon.dataset.panel}`
    );

    // Deactivate current icon and activate clicked icon
    activeIcon.classList.remove("sidebar-icon-active");
    currIcon.classList.add("sidebar-icon-active");

    // Change panels
    activePanel.classList.remove("panel-open");
    currPanel.classList.add("panel-open");
  };

  // Gets all icons from sidebar
  const icons = document.querySelectorAll(".sidebar-icon");
  // Add a click event to each icon
  for (let index = 0; index < icons.length; index++) {
    icons[index].addEventListener("click", handleClick);
  }
};

const main = function () {
  toggleSidebarIcon();
  toggleTheme();
};
main();

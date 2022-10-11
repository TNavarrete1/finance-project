import { toggleTheme } from "/src/shared.js";

const toggleSidebarIcon = () => {
  // Handles sidebar icon clicks
  const handleClick = (e) => {
    // Get elements
    const activeIcon = document.querySelector(".sidebar-icon-active");
    const currIcon = e.currentTarget;
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

const loadCalender = () => {
  // Date arrays
  const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Elements
  const calender = document.querySelector("#calender");
  const month = document.querySelector("#month");
  const daysSlidingWindow = document.querySelector("#days-sliding-window");
  const monthList = document.querySelector("#month-list");
  const monthTitle = document.querySelector("#month-title");
  const daysList = document.querySelectorAll(".days-list");
  const filters = document.querySelectorAll("[data-filter]");

  // Grid variables
  const gridColumns = month.style.getPropertyValue("--grid-columns");
  const gridRows = month.style.getPropertyValue("--grid-rows");
  const gridWidth = month.style.getPropertyValue("--grid-width");

  // Calender variables
  const calenderBaseHeight = calender.style.getPropertyValue(
    "--calender-base-height"
  );
  const calenderMaxHeight = calender.style.getPropertyValue(
    "--calender-max-height"
  );

  /* 
  Setter Methods 
  */

  // Populates each daysList element with a list of days
  const populateDaysList = () => {
    /*
        Populates daysList with li elements which have the day num in innerHTML
          // Loop and fill daysList element with a list of days using data below
          // Starting with sunday
          1. Loop through list of months (daysList elements)
          2. Loop through each daysList element
          3. First filling in last days from previous month in top row (if any)
          4. Fills in current month's days
          5. Fill in rest of list with next month's days
        */
    let date, firstDay, currNumDays, prevNumDays, nextNumDays, li;

    // Loop through months
    for (let currMonth = 0; currMonth < monthsArr.length; currMonth++) {
      // Get the first day of current month
      date = new Date(2022, parseInt(currMonth));
      firstDay = date.getDay();

      // Get number of days in next month
      date = new Date(2022, currMonth + 2, 0);
      nextNumDays = date.getDate();

      // Get number of days in current month
      date = new Date(2022, parseInt(currMonth) + 1, 0);
      currNumDays = date.getDate();

      // Get number of days in previous month
      date = new Date(2022, currMonth, 0);
      prevNumDays = date.getDate();

      // Fill in previous month's days
      for (let count = firstDay - 1; count >= 0; count--) {
        li = document.createElement("li");
        li.innerHTML = `${prevNumDays - count}`;
        li.classList.add("day-inactive");
        daysList[currMonth].append(li);
      }
      // Fill in current month's days
      for (let day = 1; day <= currNumDays; day++) {
        li = document.createElement("li");
        li.innerHTML = `${day}`;
        li.dataset.dayForMonth = `${currMonth}`;
        li.dataset.day = `${day}`;
        daysList[currMonth].append(li);
      }
      // Fill the rest of the days (next month's) left (if any)
      nextNumDays = gridColumns * gridRows - currNumDays - firstDay;
      for (let day = 1; day <= nextNumDays; day++) {
        li = document.createElement("li");
        li.innerHTML = `${day}`;
        li.classList.add("day-inactive");
        daysList[currMonth].append(li);
      }
    }
  };
  // Loads current month with data
  const preloadMonthData = () => {
    /*
        Loads onto month element:
          1. Inserts title of current month
          2. Moves sliding window to current month
          3. Activates current month's dayList element
          4. Activates current day element in daysList
          5. Set's calender height to it's max height to fit all the month data
            when calender opens
      */
    const date = new Date();
    // Fill Month title to current month name
    monthTitle.innerHTML = monthsArr[date.getMonth()];
    // Move dayList across to correct month
    daysSlidingWindow.style.setProperty(
      "--sliding-window-transform",
      `translateX(calc(-1px * ${parseInt(gridWidth) * date.getMonth()}))`
    );
    // Add days-list-active class to current month's daysList
    daysList[date.getMonth()].classList.add("days-list-active");
    // Activats present day in daysList
    daysList[date.getMonth()]
      .querySelectorAll(`[data-day-for-month="${date.getMonth()}"]`)
      [date.getDate() - 1].classList.add("day-active");
    // Sets calender's initial height
    calender.style.setProperty("--calender-height", `${calenderMaxHeight}`);
  };
  const changeMonth = (nextMonth) => {
    /*
     Changes months: 
      1. Adds and removes classes/animations 
      2. Moves sliding window to target month
      3. Changes month title to target month
     */
    const daysSlidingWindow = document.querySelector("#days-sliding-window");
    const activeDaysList = document.querySelector(".days-list-active");

    // Move sliding window
    daysSlidingWindow.style.setProperty(
      "--sliding-window-transform",
      `translateX(calc(-1px * ${parseInt(gridWidth) * nextMonth}))`
    );
    // Change month title
    monthTitle.innerHTML = monthsArr[nextMonth];
    // Activates new daysList and deactivates old one if presenet
    if (activeDaysList) {
      activeDaysList.classList.remove("days-list-active");
    }
    // Add days-list-active class to selected month (adds an animation)
    daysList[nextMonth].classList.add("days-list-active");
  };
  const activateDays = (clickedElement, nextMonth, filter) => {
    /*
      Activate days:
        1. First deactive all current active days
        2. Activate new list of days (one or more days)
    */
    const activeDays = document.querySelectorAll(".day-active");
    const currMonthDays = document.querySelectorAll(
      `[data-day-for-month="${nextMonth}"]`
    );
    const daysInMonth = new Date(2022, nextMonth + 1, 0).getDate();
    const clickedDay = parseInt(clickedElement.innerHTML) - 1;

    // Deactivate all currently active days
    for (let index = 0; index < activeDays.length; index++) {
      activeDays[index].classList.remove("day-active");
    }

    /*
      Activate days according to filter
    */
    if (filter === 0) {
      for (let index = 0; index < daysInMonth; index++) {
        currMonthDays[index].classList.add("day-active");
      }
    }
    for (let index = 0; index < filter; index++) {
      currMonthDays[index + clickedDay].classList.add("day-active");
    }
  };
  const handleMonthData = (clickedElement, nextMonth, filter = null) => {
    /*
      Handles month data after toggle functions fire:
        1. Adds/removes classes/animation
        2. Calls helper functions depending on if stuff is 
          passed into function
    */

    if (clickedElement.hasAttribute("data-month")) {
      // remove transition from sliding window
      daysSlidingWindow.style.setProperty(
        "--sliding-window-transition",
        "none"
      );

      // Deactivates nav button for next month if a month on the side is inacessible
      const prevMonthButton = document.querySelector("#prev-month-button");
      const nextMonthButton = document.querySelector("#next-month-button");
      if (nextMonth === 0) {
        prevMonthButton.classList.add("inactive-button");
      } else if (nextMonth === 11) {
        nextMonthButton.classList.add("inactive-button");
      }
      changeMonth(nextMonth);
      return;
    } else if (
      clickedElement.id === "prev-month-button" ||
      clickedElement.id === "next-month-button"
    ) {
      // Adds tranition to sliding window
      daysSlidingWindow.style.setProperty(
        "--sliding-window-transition",
        "transform ease-in-out 0.3s"
      );
      // changes months
      changeMonth(nextMonth);
      /*
        Remove animation of activated dayList then adds it back.
        This is so there is no animation as the sliding window moves to the left
        or right month.
      */
      daysList[nextMonth].style.animationDuration = "0s";
      setTimeout(() => {
        daysList[nextMonth].style.animationDuration = "0.3s";
      }, 300);
    }

    activateDays(clickedElement, nextMonth, filter);
  };

  /* 
  Toggle Methods
  */

  // Opens/closes calender when filterPicker is clicked
  const toggleCalender = () => {
    const filterButton = document.querySelector("#filter-picker");

    const handleClick = () => {
      if (calender.classList.contains("calender-open")) {
        calender.classList.remove("calender-open");
        monthList.classList.remove("month-list-open");
        month.classList.remove("month-open");
        // Increase calender height
        calender.style.setProperty("--calender-height", `${calenderMaxHeight}`);
      } else {
        calender.classList.add("calender-open");
        month.classList.add("month-open");
      }
    };

    filterButton.addEventListener("click", handleClick);
  };
  // Opens/closes Monthlist when monthButton is clicked
  const toggleMonthList = () => {
    const monthButton = document.querySelector("#month-button");

    const handleClick = () => {
      // Removes inactive class from nav buttons
      const prevMonthButton = document.querySelector("#prev-month-button");
      const nextMonthButton = document.querySelector("#next-month-button");
      prevMonthButton.classList.remove("inactive-button");
      nextMonthButton.classList.remove("inactive-button");
      // Deactivates month element and activates month list
      month.classList.remove("month-open");
      monthList.classList.add("month-list-open");
      // Reduce calender height
      calender.style.setProperty("--calender-height", `${calenderBaseHeight}`);
    };
    monthButton.addEventListener("click", handleClick);
  };
  // Opens/closes month when an item in monthArr is clicked
  const toggleMonth = () => {
    const monthElements = document.querySelectorAll("[data-month]");
    let nextMonth;

    const handleClick = (e) => {
      monthList.classList.remove("month-list-open");
      month.classList.add("month-open");
      // Increase calender height
      calender.style.setProperty("--calender-height", `${calenderMaxHeight}`);

      nextMonth = parseInt(e.currentTarget.dataset.month);
      // Handles month change and loads appropriate data
      handleMonthData(e.currentTarget, nextMonth);
    };
    // Adds click event to each month element in monthLi
    for (let index = 0; index < monthElements.length; index++) {
      monthElements[index].addEventListener("click", handleClick);
    }
  };
  const toggleMonthArrows = () => {
    const prevMonthButton = document.querySelector("#prev-month-button");
    const nextMonthButton = document.querySelector("#next-month-button");
    const handleClick = (e) => {
      let nextMonth;
      const clickedElement = e.currentTarget;
      const currMonth = parseInt(
        document.querySelector(".days-list-active").dataset.listForMonth
      );
      if (clickedElement.id === "prev-month-button") {
        nextMonth = currMonth - 1;
      } else {
        nextMonth = currMonth + 1;
      }
      // Checks if next month is in range
      if (nextMonth < 0 || nextMonth > 11) {
        return;
      }

      // Deactivate when months will become inacessible in either direction
      if (nextMonth === 0) {
        prevMonthButton.classList.add("inactive-button");
      } else if (nextMonth === 11) {
        nextMonthButton.classList.add("inactive-button");
      } else {
        prevMonthButton.classList.remove("inactive-button");
        nextMonthButton.classList.remove("inactive-button");
      }

      handleMonthData(clickedElement, nextMonth);
    };
    prevMonthButton.addEventListener("click", handleClick);
    nextMonthButton.addEventListener("click", handleClick);
  };
  const toggleDay = () => {
    const date = new Date();
    const presentMonth = date.getMonth();
    const presentDay = date.getDate();

    const handleClick = (e) => {
      const clickedElement = e.currentTarget;
      const elementMonth = parseInt(clickedElement.dataset.dayForMonth);
      const daysInElementMonth = new Date(2022, elementMonth + 1, 0).getDate();
      const elementDay = parseInt(clickedElement.dataset.day);
      const filterVal = parseInt(
        document.querySelector(".filter-active").dataset.filter
      );
      // Checks if clicked day is inactive (unclickable)
      if (clickedElement.classList.contains("day-inactive")) {
        return;
      }
      // Checks if clicked day is in range (not activating future days)
      if (
        elementMonth > presentMonth ||
        (elementMonth === presentMonth && elementDay >= presentDay)
      ) {
        return;
      }
      // Gets numbers of available days in the current month
      let daysAvailable;
      if (elementMonth === presentMonth) {
        daysAvailable = presentDay - elementDay;
      } else {
        daysAvailable = daysInElementMonth - elementDay;
      }
      // Checks if there is enough space to activate days according to filter
      if (filterVal === 7 && daysAvailable < 6) {
        return;
      } else if (filterVal === 14 && daysAvailable < 13) {
        return;
      } else if (filterVal === 0 && elementMonth === presentMonth) {
        return;
      }

      handleMonthData(clickedElement, elementMonth, filterVal);
    };

    /* 
      Iterate over each list in daysList and add an event listener 
      to each day li element
    */
    let daysLi;
    for (let index = 0; index < daysList.length; index++) {
      daysLi = daysList[index].children;
      for (let day = 0; day < daysLi.length; day++) {
        daysLi[day].addEventListener("click", handleClick);
      }
    }
  };
  const toggleFilter = () => {
    const handleClick = (e) => {
      const dayActive = document.querySelectorAll(".day-active");
      // Deactivate all days
      for (let index = 0; index < dayActive.length; index++) {
        dayActive[index].classList.remove("day-active");
      }
      // Deactivate previous filter then activate current filter
      document
        .querySelector(".filter-active")
        .classList.remove("filter-active");
      e.currentTarget.classList.add("filter-active");
    };
    for (let index = 0; index < filters.length; index++) {
      filters[index].addEventListener("click", handleClick);
    }
  };
  const submitFilter = () => {
    const setFilterButton = document.querySelector("#set-filter-button");
  };
  /* 
  Preload month and daysList elements with data:
    1. Need to populate daysList elements with a list of days
    2. Then populate data and activate current month's daysList and day li element
  */
  populateDaysList();
  preloadMonthData();

  // Run toggle funcitions
  toggleCalender();
  toggleMonthList();
  toggleMonth();
  toggleMonthArrows();
  toggleDay();
  toggleFilter();

  // submit data function
  submitFilter();
};

const loadSavingsGraph = () => {
  // ctx Object
  const ctx = document.getElementById("myChart").getContext("2d");

  // Gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 350);
  gradient.addColorStop(0, "rgba(14, 173, 105, 1)");
  gradient.addColorStop(1, "rgba(14, 173, 105,0)");

  // CSS var variables
  let globalStyles = getComputedStyle(document.body);
  let primFont = globalStyles.getPropertyValue("--font-primary");
  let colorDark = globalStyles.getPropertyValue("--color-dark");

  // Chart config
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "May 1 - May 7",
          data: [12, 19, 3, 5, 2, 3, 25],
          backgroundColor: gradient,
          fill: true,
          tension: 0.25,
        },
      ],
    },
    options: {
      elements: {
        line: {
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 3,
        },
      },
      layout: {
        padding: 0,
      },
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          align: "end",
          labels: {
            color: colorDark,
            font: {
              size: 14,
              family: primFont,
              weight: "400",
            },
          },
        },
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            display: true,
            color: colorDark,
            font: {
              size: 13,
              family: primFont,
              weight: "400",
            },
            padding: 10,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            display: true,
            color: colorDark,
            font: {
              size: 13,
              family: primFont,
              weight: "400",
            },
            padding: 10,
          },
        },
      },
    },
  });

  const themeButton = document.querySelector(".themes");
  themeButton.addEventListener("click", (e) => {
    // Gets theme values
    globalStyles = getComputedStyle(document.body);
    colorDark = globalStyles.getPropertyValue("--color-dark");
    // Update chart colors when theme changes
    myChart.options.plugins.legend.labels.color = colorDark;
    myChart.options.scales.y.ticks.color = colorDark;
    myChart.options.scales.x.ticks.color = colorDark;

    myChart.update();
  });
};

const handleTransactionSubmit = () => {
  const form = document.querySelector("#transaction-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/transactions/create", {
        method: "POST",
        body: JSON.stringify({
          category: "savings",
          date: "2022-06-25",
          price: 600,
          title: "Deposit",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.status === 400 || res.status === 401) {
        window.alert(`${data.message}. ${data.error ? data.error : ""}`);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  });
};

const main = function () {
  // Toggles light and dark theme
  toggleTheme();
  // Toggles sidebar icons to switch panels
  toggleSidebarIcon();
  // Loads calender functionality
  loadCalender();

  // Loads graphs
  loadSavingsGraph();

  // Handles creating, updating, and deleting of transactions
  handleTransactionSubmit();
};

main();

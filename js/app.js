// Creates an array of all of the sections on the page even if more are added
let sections = document.querySelectorAll("section");
sections = Array.from(sections);
const nav = document.querySelector("#navbar__list");
const navSections = document.querySelectorAll("[data-nav] h2");
const topOfPage = document.createElement("button");
topOfPage.className = "button";
const topButton = document.createTextNode("Top");
topOfPage.appendChild(topButton);

nav.insertAdjacentElement("afterend", topOfPage);

//createNav
for (let i = 0; i < navSections.length; i++) {
  const navListItem = document.createElement("li");
  const navLink = document.createElement("a");
  const navSection = document.createTextNode(navSections[i].textContent);
  navLink.appendChild(navSection);
  navListItem.appendChild(navLink);
  nav.appendChild(navListItem);
}

// build collapse and restore buttons and add them to the dom
sections.forEach((section, index) => {
  let collapse = document.createTextNode("X");
  let collapseButton = document.createElement("button");
  collapseButton.appendChild(collapse);

  let restore = document.createTextNode("+");
  let restoreButton = document.createElement("button");
  restoreButton.appendChild(restore);

  if (index % 2 === 0) {
    collapseButton.className = "collapseR";
    restoreButton.className = "restoreR";
  } else {
    collapseButton.className = "collapseL";
    restoreButton.className = "restoreL";
  }

  restoreButton.setAttribute("data-foo", `section${index + 1}`);
  collapseButton.setAttribute("data-foo", `section${index + 1}`);

  let sectionHeader = section.querySelector("h2");
  sectionHeader.appendChild(collapseButton);
  section.insertAdjacentElement("beforebegin", restoreButton);
});

//style nav
const navBar = document.querySelector(".navbar__menu");
const navList = document.querySelector("#navbar__list");
navBar.style.className = "navbar__menu";
const listItem = document.querySelectorAll("#navbar__list a");
//style nav links
for (let i = 0; i < navSections.length; i++) {
  listItem[i].className = "menu__link";
}

navBar.style.display = "flex";

//puts navbar on display when scrolling and takes it away 4 seconds after stopping ONLY WORKS SOMETIMES
let isScrolling;

window.addEventListener("scroll", function (e) {
  navBar.style.display = "flex";
  window.clearTimeout(isScrolling);

  isScrolling = setTimeout(function () {
    navBar.style.display = "none";
  }, 4000);
});

//Hides top of page button
topOfPage.style.display = "none";

//Shows the tops of page button after scrolling past the fold and makes it dissapear when you scroll back above that point
document.addEventListener(
  "scroll",
  function () {
    if (document.documentElement.scrollTop > window.innerHeight) {
      topOfPage.style.display = "flex";
    } else {
      topOfPage.style.display = "none";
    }
  },
  false
);

//checks what part of the page is closest to the top so you can put it in active mode when it is what is being viewed
//also sets the active state to the navbar section
document.addEventListener("scroll", function () {
  let sectionYs = [];
  let activeSection = null;
  let sectionYIndex = 0;

  let activeMenu = document.querySelectorAll(".menu__link");
  activeMenu = Array.from(activeMenu);
  sections.forEach((section) => {
    let y = section.getBoundingClientRect().y;
    sectionYs.push(Math.abs(y));
  });
  sectionYs.forEach((section, index) => {
    if (!activeSection || activeSection > section) {
      activeSection = section;
      sectionYIndex = index;
    }
  });
  sections.forEach((section, index) => {
    if (index === sectionYIndex) {
      section.className = "your-active-class";
      activeMenu[index].style.border = "4px solid orange";
    } else {
      section.classList.remove("your-active-class");
      activeMenu[index].style.border = "";
    }
  });
});

//makes it so clicking the link scrolls to that section of the page SORT OF WORKS BUT NOT ACCURATE
let links = document.querySelectorAll("a");
links.forEach((link, index) => {
  //   const scrollTarget = sections[index].getBoundingClientRect().y;
  link.addEventListener("click", function () {
    sections[index].scrollIntoView();
  });
});

// functionality for scroll top button
topOfPage.addEventListener("click", function () {
  scroll(0, 0);
});

//makes it so navbar pops up when you move into that area
document.addEventListener("mousemove", function (e) {
  if (e.clientY < 100) {
    navBar.style.display = "flex";
  }
});

// creates functionaly for collaplse button and respotre buttons RESTORE BUTTONS NOT YET WORKING
let collapseR = document.querySelectorAll(".collapseR");
let collapseL = document.querySelectorAll(".collapseL");

[...collapseR, ...collapseL].forEach((section) => {
  section.addEventListener("click", function (e) {
    let sectionId = section.getAttribute("data-foo");
    document.querySelector(`#${sectionId}`).style.display = "none";
  });
});

let restoreR = document.querySelectorAll(".restoreR");
let restoreL = document.querySelectorAll(".restoreL");

[...restoreR, ...restoreL].forEach((section) => {
  section.addEventListener("click", function (e) {
    let sectionId = e.target.getAttribute("data-foo");
    document.querySelector(`#${sectionId}`).style.display = "flex";
  });
});

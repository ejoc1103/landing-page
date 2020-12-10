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

sections.forEach((section, index) => {
  let collapse = document.createTextNode("X");
  let collapseButton = document.createElement("button");
  collapseButton.appendChild(collapse);

  let restore = document.createTextNode("+");
  let restoreButton = document.createElement("button");
  restoreButton.appendChild(restore);

  if (index % 2 === 0) {
    collapseButton.className = "collapseR";
    restoreButton.className = "collapseR";
  } else {
    collapseButton.className = "restoreL";
    restoreButton.className = "restoreL";
  }
  let sectionHeader = section.querySelector("h2");
  sectionHeader.appendChild(collapseButton);
  section.insertAdjacentElement("beforebegin", restoreButton);
});

const navBar = document.querySelector(".navbar__menu");
const navList = document.querySelector("#navbar__list");
navBar.style.className = "navbar__menu";
const listItem = document.querySelectorAll("#navbar__list a");
//style nav links
for (let i = 0; i < navSections.length; i++) {
  listItem[i].className = "menu__link";
}

navBar.style.display = "flex";

document.addEventListener("scroll", function () {
  navBar.style.display = "flex";
  setTimeout(function () {
    navBar.style.display = "none";
  }, 4000);
});

topOfPage.style.display = "none";

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

let links = document.querySelectorAll("a");
links.forEach((link, index) => {
  const scrollTarget = sections[index].getBoundingClientRect().y;
  link.addEventListener("click", function () {
    scrollTo(0, scrollTarget);
  });
});

topOfPage.addEventListener("click", function () {
  scroll(0, 0);
});

document.addEventListener("mousemove", function (e) {
  if (e.clientY < 100) {
    navBar.style.display = "flex";
  }
});

let collapseR = document.querySelectorAll(".collapseR");
let collapseL = document.querySelectorAll(".collapseL");

collapseR.forEach((section) => {
  section.addEventListener("click", function (e) {
    let sectionId = e.path[3].id;
    document.querySelector(`#${sectionId}`).style.display = "none";
  });
});

collapseL.forEach((section) => {
  section.addEventListener("click", function (e) {
    console.log(e);
    let sectionId = e.path[3].id;
    document.querySelector(`#${sectionId}`).style.display = "none";
  });
});

let restoreR = document.querySelectorAll(".restoreR");
let restoreL = document.querySelectorAll(".restoreL");

restoreR.forEach((section) => {
  section.addEventListener("click", function (e) {
    let sectionId = e.path[3].id;
    console.log(sectionId);
    document.querySelector(`#${sectionId}`).style.display = "flex";
  });
});

restoreL.forEach((section) => {
  section.addEventListener("click", function (e) {
    let sectionId = e.path[3].id;
    console.log(sectionId);
    document.querySelector(`#${sectionId}`).style.display = "flex";
  });
});

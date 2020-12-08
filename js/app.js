/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 */

/**
 * Define Global Variables
 *
 */

const nav = document.querySelector("#navbar__list");
const navSections = document.querySelectorAll("[data-nav] h2");

//createNav
for (let i = 0; i < navSections.length; i++) {
  const navListItem = document.createElement("li");
  const navLink = document.createElement("a");
  const navSection = document.createTextNode(navSections[i].textContent);
  navLink.href = `index.html#section${i + 1}`;
  navLink.appendChild(navSection);
  navListItem.appendChild(navLink);
  nav.appendChild(navListItem);
}

const navBar = document.querySelector(".navbar__menu");
const navList = document.querySelector("#navbar__list");
navBar.style.cssText =
  "color: blue; font-size: 2em; font-weight: bold; padding: 10px;";
const listItem = document.querySelectorAll("#navbar__list a");
//style nav links
for (let i = 0; i < navSections.length; i++) {
  listItem[i].style.cssText = "color: orange; margin: 10px;";
}

navBar.style.display = "none";

document.addEventListener("scroll", function () {
  if (window.scrollY >= 300) {
    navBar.style.display = "flex";
  } else {
    navBar.style.display = "none";
  }
});
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

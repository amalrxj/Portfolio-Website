/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const lightIcon = "uil-sun";
const darkIcon = "uil-moon";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(lightIcon) ? darkIcon : lightIcon;

// Apply previously saved theme and icon
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === darkIcon ? "add" : "remove"](
    lightIcon
  );
}

// Add toggle functionality
if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(lightIcon);
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SKILLS TAB ====================*/
// const skillsContent = document.getElementsByClassName("skills__content"),
//   skillsHeader = document.querySelectorAll(".skills__header");

// function toggleSkills() {
//   let itemClass = this.parentNode.className;

//   for (let i = 0; i < skillsContent.length; i++) {
//     skillsContent[i].className = "skills__content skills__close";
//   }
//   if (itemClass === "skills__content skills__close") {
//     this.parentNode.className = "skills__content skills__open";
//   }
// }

// skillsHeader.forEach((e) => {
//   e.addEventListener("click", toggleSkills);
// });

/* ==================== UPDATED SKILLS TABS ==================== */

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function animateSkillBars(parent) {
  const bars = parent.querySelectorAll(".skills__pct");
  bars.forEach((bar) => {
    const targetWidth = bar.getAttribute("data-skill");
    bar.style.width = targetWidth;
  });
}

function resetSkillBars(parent) {
  const bars = parent.querySelectorAll(".skills__pct");
  bars.forEach((bar) => {
    bar.style.width = "0";
  });
}

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
    resetSkillBars(skillsContent[i]);
  }

  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
    animateSkillBars(this.parentNode);
  }
}

skillsHeader.forEach((e) => {
  e.addEventListener("click", toggleSkills);
});

// 🧠 Animate bars in the first open section on page load
window.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < skillsContent.length; i++) {
    if (skillsContent[i].classList.contains("skills__open")) {
      animateSkillBars(skillsContent[i]);
    }
  }
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};
modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});
modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


/* ===================== CONTACT ME ======================= */
const contactForm = document.getElementById("contact-form"),
  contactMsg = document.getElementById("contact-msg");
const sendEmail = (e) => {
  e.preventDefault();
  //ServiceID, TemplateID, #form, publickey
  emailjs
    .sendForm(
      "service_c0n6gpa",
      "template_axvxtb9",
      "#contact-form",
      "ldlAFMA6vlTrKV6V7"
    )
    .then(
      () => {
        //show sent message
        contactMsg.textContent = "Message sent successfully ✅";
        //Remove message after five seconds
        setTimeout(() => {
          contactMsg.textContent = "";
        }, 5000);
        // Clear input field
        contactForm.reset();
      },
      () => {
        //Show error message
        contactMsg.textContent = "Message not sent (service error) ❌";
      }
    );
};
contactForm.addEventListener("submit", sendEmail);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);


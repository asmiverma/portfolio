const menuButton = document.getElementById("mobile-menu-button");
const navLinks = document.getElementById("mobile-menu");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    if (navLinks) {
      navLinks.classList.remove("open");
    }
    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a")];

const highlightCurrentNav = () => {
  const scrollY = window.scrollY + 140;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollY >= top && scrollY < bottom) {
      navAnchors.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${section.id}`;
        link.classList.toggle("active", isActive);
      });
    }
  });
};

window.addEventListener("scroll", highlightCurrentNav);
highlightCurrentNav();

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) {
        return;
      }

      setTimeout(() => {
        entry.target.classList.add("is-visible");
      }, index * 75);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

revealElements.forEach((element) => observer.observe(element));

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = document.querySelectorAll("div[id]");
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (hamburger) {
    hamburger.addEventListener("click", () => nav.classList.toggle("active"));
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          if (entry.target.id === "home") return;
          const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    { threshold: 0.35, rootMargin: "-80px 0px -30% 0px" }
  );

  sections.forEach((section) => observer.observe(section));

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      if (nav.classList.contains("active")) nav.classList.remove("active");
    });
  });

  const animateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animateObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  const elementsToAnimate = document.querySelectorAll(
    '.heroSectionLeft > div, .heroSectionLeft h3, .heroSectionLeft .box4, ' +
    '.cards, .contentWrapper, .contentHeading, .contentDecription, .contactSectionHeading'
  );

  elementsToAnimate.forEach(el => {
    el.classList.add('fade-up');
    animateObserver.observe(el);
  });
});


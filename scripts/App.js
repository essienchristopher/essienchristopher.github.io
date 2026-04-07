document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ─── ABOUT ME heading — slide from left (existing, keep) ───────────────────
  gsap.utils.toArray(".aboutme, .whatido").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom top",
        toggleActions: "play none none reset",
      },
      opacity: 0,
      x: -80,
      duration: 1,
      ease: "power2.out",
    });
  });

  // ─── SLIDE UP FROM BOTTOM — aboutmetext, cards, projects, contact, links ───
  gsap.utils
    .toArray(".aboutmetext, .cards, .projectsContainer, .contactME, .links")
    .forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
        duration: 0.9,
        opacity: 0,
        y: 60,
        ease: "power3.out",
      });
    });

  // ─── FOOTER EYE ANIMATION ──────────────────────────────────────────────────
  const footer = document.getElementById("contactME");
  if (footer) {
    const eyeContainer = footer.querySelector(".eye-container");
    let mouthPosition = { currentX: 0, currentY: 0 };
    const eyeDots = footer.querySelectorAll(".eye-dot-inner");
    const contactItems = footer.querySelectorAll(".contact-hover");
    const isMobile = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;

    if (isMobile) {
      eyeDots.forEach((dot) => {
        dot.textContent = "❤️";
        dot.style.background = "transparent";
      });
    }

    let mouseX = 0,
      mouseY = 0,
      mouseInFooter = false;
    let eyePositions = [
      { currentX: 0, currentY: 0 },
      { currentX: 0, currentY: 0 },
      { currentX: 0, currentY: 0 },
    ];

    footer.addEventListener("mouseenter", () => {
      mouseInFooter = true;
    });
    footer.addEventListener("mouseleave", () => {
      mouseInFooter = false;
      eyePositions.forEach((pos) => {
        pos.currentX = 0;
        pos.currentY = 0;
      });
    });
    footer.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      eyeDots.forEach((dot, index) => {
        if (!mouseInFooter) {
          dot.style.transform = `translate(0px, 0px)`;
          return;
        }
        const rect = dot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
        const maxDistance = 8;
        const targetX = Math.cos(angle) * maxDistance;
        const targetY = Math.sin(angle) * maxDistance;
        const speed = index < 2 ? 0.4 : 0.5;
        eyePositions[index].currentX +=
          (targetX - eyePositions[index].currentX) * speed;
        eyePositions[index].currentY +=
          (targetY - eyePositions[index].currentY) * speed;
        dot.style.transform = `translate(${eyePositions[index].currentX}px, ${eyePositions[index].currentY}px)`;
      });

      if (mouseInFooter && eyeContainer) {
        const rect = eyeContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
        const targetX = Math.cos(angle) * 4;
        const targetY = Math.sin(angle) * 4;
        mouthPosition.currentX += (targetX - mouthPosition.currentX) * 0.12;
        mouthPosition.currentY += (targetY - mouthPosition.currentY) * 0.12;
        eyeContainer.style.transform = `translate(${mouthPosition.currentX}px, ${mouthPosition.currentY}px)`;
      } else if (eyeContainer) {
        eyeContainer.style.transform = `translate(0px, 0px)`;
      }
      requestAnimationFrame(animate);
    }

    animate();

    contactItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        eyeDots.forEach((dot) => {
          dot.textContent = "❤️";
          dot.style.background = "transparent";
        });
      });
      item.addEventListener("mouseleave", () => {
        eyeDots.forEach((dot) => {
          dot.textContent = "";
          dot.style.background = "white";
        });
      });
    });

    const reveals = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    reveals.forEach((el) => revealObserver.observe(el));
  }

  // ─── FALL EFFECT OBSERVER ──────────────────────────────────────────────────
  const fallSection = document.querySelector(".fall-effect");
  if (fallSection) {
    const fallObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.3 },
    );
    fallObserver.observe(fallSection);
  }

  // ─── MENU ──────────────────────────────────────────────────────────────────
  const openMenu = document.querySelector(".openmenu");
  const menu = document.querySelector(".menu");
  const Section = document.querySelector(".Section");
  const menuLinks = document.querySelectorAll(".menu a");
  const menuItems = document.querySelectorAll(".menu-item");
  const menuLines = document.querySelectorAll(".menu-item .h-0\\.5");

  let menuOpen = false;

  function openMenuFn() {
    openMenu.classList.add("active");
    gsap.to(Section, {
      opacity: 0,
      y: 40,
      scale: 0.98,
      duration: 0.4,
      ease: "power2.out",
      pointerEvents: "none",
    });
    gsap.fromTo(
      menu,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.6,
        ease: "power3.out",
        transformOrigin: "bottom",
      },
    );
    gsap.fromTo(
      menuItems,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.25,
      },
    );
    gsap.fromTo(
      menuLines,
      { width: "0%" },
      {
        width: "100%",
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.4,
      },
    );
    menuOpen = true;
  }

  function closeMenuFn() {
    openMenu.classList.remove("active");
    gsap.to(menuLines, {
      width: "0%",
      duration: 0.3,
      ease: "power2.in",
      stagger: { each: 0.08, from: "end" },
    });
    gsap.to(menuItems, {
      y: 60,
      opacity: 0,
      duration: 0.35,
      ease: "power3.in",
      stagger: { each: 0.08, from: "end" },
    });
    gsap.to(menu, {
      scaleY: 0,
      duration: 0.5,
      ease: "power3.in",
      delay: 0.55,
      transformOrigin: "bottom",
    });
    gsap.to(Section, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      pointerEvents: "auto",
      delay: 0.2,
    });
    menuOpen = false;
  }

  openMenu.addEventListener("click", () => {
    menuOpen ? closeMenuFn() : openMenuFn();
  });
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenuFn);
  });

  // ─── COLOR SWITCHER ─────────────────────────────────────────────────────────
  // Works on BOTH desktop (click to toggle) and mobile (tap to toggle)
  const navbarWrap = document.querySelector(".navbar-wrap");
  const colorPill = document.querySelector(".color-pill");
  const colorSwatches = document.querySelectorAll(".color-swatch");

  function applyTheme(theme) {
    document.body.classList.remove("theme-red", "theme-green");
    if (theme !== "default") document.body.classList.add(`theme-${theme}`);
  }

  function openColorPicker() {
    navbarWrap.classList.add("color-open-active");
    colorPill.classList.add("color-open");
  }

  function closeColorPicker() {
    navbarWrap.classList.remove("color-open-active");
    colorPill.classList.remove("color-open");
  }

  if (colorPill) {
    colorPill.addEventListener("click", (e) => {
      const swatch = e.target.closest(".color-swatch");
      if (swatch) {
        applyTheme(swatch.dataset.theme);
        closeColorPicker();
        return;
      }
      // Toggle open/close on every device
      navbarWrap.classList.contains("color-open-active")
        ? closeColorPicker()
        : openColorPicker();
    });

    // Click outside closes picker
    document.addEventListener("click", (e) => {
      if (!colorPill.contains(e.target)) closeColorPicker();
    });
  }
});

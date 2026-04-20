document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".nav-left", {
    x: -120,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    delay: 0.1,
  });
  gsap.from(".nav-right", {
    x: 120,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    delay: 0.25,
  });

  const navbar = document.querySelector(".navbar-wrap");
  let lastScrollY = 0;
  let navbarHidden = false;
  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (
            currentScrollY > lastScrollY &&
            currentScrollY > 80 &&
            !navbarHidden
          ) {
            gsap.to(navbar, {
              y: -80,
              opacity: 0,
              duration: 0.4,
              ease: "power3.in",
            });
            navbarHidden = true;
          } else if (currentScrollY < lastScrollY && navbarHidden) {
            gsap.to(navbar, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
            });
            navbarHidden = false;
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );

  gsap.utils.toArray(".reveal-up").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 70, opacity: 0, immediateRender: false },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      },
    );
  });

  window.addEventListener(
    "load",
    () => {
      ScrollTrigger.refresh();
    },
    { passive: true },
  );

  gsap.utils.toArray(".aboutme, .whatido").forEach((el) => {
    gsap.fromTo(
      el,
      { x: -80, opacity: 0, immediateRender: false },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "play none none reset",
        },
      },
    );
  });

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
    footer.addEventListener(
      "mousemove",
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      },
      { passive: true },
    );

    function animateEyes() {
      eyeDots.forEach((dot, index) => {
        if (!mouseInFooter) {
          dot.style.transform = `translate(0px, 0px)`;
          return;
        }
        const rect = dot.getBoundingClientRect();
        const angle = Math.atan2(
          mouseY - (rect.top + rect.height / 2),
          mouseX - (rect.left + rect.width / 2),
        );
        const targetX = Math.cos(angle) * 8;
        const targetY = Math.sin(angle) * 8;
        const speed = index < 2 ? 0.4 : 0.5;
        eyePositions[index].currentX +=
          (targetX - eyePositions[index].currentX) * speed;
        eyePositions[index].currentY +=
          (targetY - eyePositions[index].currentY) * speed;
        dot.style.transform = `translate(${eyePositions[index].currentX}px, ${eyePositions[index].currentY}px)`;
      });

      if (mouseInFooter && eyeContainer) {
        const rect = eyeContainer.getBoundingClientRect();
        const angle = Math.atan2(
          mouseY - (rect.top + rect.height / 2),
          mouseX - (rect.left + rect.width / 2),
        );
        const targetX = Math.cos(angle) * 4;
        const targetY = Math.sin(angle) * 4;
        mouthPosition.currentX += (targetX - mouthPosition.currentX) * 0.12;
        mouthPosition.currentY += (targetY - mouthPosition.currentY) * 0.12;
        eyeContainer.style.transform = `translate(${mouthPosition.currentX}px, ${mouthPosition.currentY}px)`;
      } else if (eyeContainer) {
        eyeContainer.style.transform = `translate(0px, 0px)`;
      }
      requestAnimationFrame(animateEyes);
    }
    animateEyes();

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
      onComplete: () => {
        Section.style.pointerEvents = "auto";
      },
    });
    menuOpen = false;
  }

  openMenu.addEventListener("click", () => {
    menuOpen ? closeMenuFn() : openMenuFn();
  });
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenuFn);
  });

  const navbarWrap = document.querySelector(".navbar-wrap");
  const colorPill = document.querySelector(".color-pill");

  function applyTheme(theme) {
    document.body.classList.remove("theme-red", "theme-green");
    if (theme !== "default") document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("portfolio-theme", theme);
  }

  function openColorPicker() {
    navbarWrap.classList.add("color-open-active");
    colorPill.classList.add("color-open");
  }
  function closeColorPicker() {
    navbarWrap.classList.remove("color-open-active");
    colorPill.classList.remove("color-open");
  }

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) applyTheme(savedTheme);

  if (colorPill) {
    colorPill.addEventListener("click", (e) => {
      const swatch = e.target.closest(".color-swatch");
      if (swatch) {
        applyTheme(swatch.dataset.theme);
        closeColorPicker();
        return;
      }
      navbarWrap.classList.contains("color-open-active")
        ? closeColorPicker()
        : openColorPicker();
    });

    const closeOnOutside = (e) => {
      if (!colorPill.contains(e.target)) closeColorPicker();
    };
    document.addEventListener("click", closeOnOutside, { passive: true });
    document.addEventListener("touchend", closeOnOutside, { passive: true });
  }

  document.querySelectorAll(".project").forEach((project) => {
    const circle = document.createElement("div");
    circle.className = "project-cursor-circle";
    const text =
      "View Project \u2022 View Project \u2022 View Project \u2022 View Project \u2022 ";
    circle.innerHTML = `<div class="project-cursor-track">${text}${text}</div>`;
    project.appendChild(circle);

    gsap.set(circle, { opacity: 0, scale: 0.7 });

    project.addEventListener("mouseenter", () => {
      gsap.to(circle, {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "back.out(1.4)",
      });
    });

    project.addEventListener(
      "mousemove",
      (e) => {
        const rect = project.getBoundingClientRect();
        gsap.to(circle, {
          x: e.clientX - rect.left - 60,
          y: e.clientY - rect.top - 60,
          duration: 0.25,
          ease: "power2.out",
        });
      },
      { passive: true },
    );

    project.addEventListener("mouseleave", () => {
      gsap.to(circle, {
        opacity: 0,
        scale: 0.7,
        duration: 0.35,
        ease: "power3.in",
      });
    });
  });
});

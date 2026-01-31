document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("contactME");
  if (!footer) return;

  const eyeContainer = footer.querySelector(".eye-container");
  const eyeDots = footer.querySelectorAll(".eye-dot-inner");
  const contactItems = footer.querySelectorAll(".contact-hover");

  let mouseX = 0;
  let mouseY = 0;
  let mouseInFooter = false;

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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  reveals.forEach((el) => observer.observe(el));
});

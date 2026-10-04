/* Spokesmith - interactivity
   1. Hero wheel  2. Mobile menu  3. Active nav link  4. FAQ toggle
   5. Form validation  6. Success modal  7. Footer year */

document.addEventListener("DOMContentLoaded", () => {
  /* 1. Hero wheel: draw 32 spokes */
  const spokes = document.getElementById("spokes");
  if (spokes) {
    const NS = "http://www.w3.org/2000/svg";
    const count = 32;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", 200 + Math.cos(angle) * 22);
      line.setAttribute("y1", 200 + Math.sin(angle) * 22);
      line.setAttribute("x2", 200 + Math.cos(angle) * 168);
      line.setAttribute("y2", 200 + Math.sin(angle) * 168);
      spokes.appendChild(line);
    }
  }

  /* 2. Mobile menu */
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  function setMenu(open) {
    siteNav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  }

  menuToggle.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });
  siteNav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => setMenu(false))
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuToggle.focus();
    }
  });

  /* 3. Highlight the nav link of the section in view */
  const navLinks = siteNav.querySelectorAll('a[href^="#"]:not(.nav-cta)');
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) =>
              link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id)
            );
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));
  }

  /* 4. FAQ toggle (one open at a time) */
  const faqButtons = document.querySelectorAll(".faq-q");
  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const willOpen = btn.getAttribute("aria-expanded") !== "true";
      faqButtons.forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        document.getElementById(other.getAttribute("aria-controls")).hidden = true;
      });
      if (willOpen) {
        btn.setAttribute("aria-expanded", "true");
        document.getElementById(btn.getAttribute("aria-controls")).hidden = false;
      }
    });
  });

  /* 5. Form validation */
  const form = document.getElementById("contactForm");
  const fields = {
    name: {
      el: form.elements.name,
      check: (v) => {
        if (!v.trim()) return "Enter your name.";
        if (v.trim().length < 2) return "Your name needs at least 2 characters.";
        return "";
      },
    },
    email: {
      el: form.elements.email,
      check: (v) => {
        if (!v.trim()) return "Enter your email address.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()))
          return "Enter an email like name@example.com.";
        return "";
      },
    },
    phone: {
      el: form.elements.phone,
      check: (v) => {
        if (!v.trim()) return ""; // optional
        if (!/^\+?[0-9\s\-()]{7,15}$/.test(v.trim()))
          return "Enter 7 to 15 digits. You can use +, spaces and dashes.";
        return "";
      },
    },
    service: {
      el: form.elements.service,
      check: (v) => (v ? "" : "Choose a service."),
    },
    message: {
      el: form.elements.message,
      check: (v) => {
        if (!v.trim()) return "Describe what is wrong with the bike.";
        if (v.trim().length < 10) return "Add a little more detail (at least 10 characters).";
        return "";
      },
    },
  };

  function validateField(key) {
    const { el, check } = fields[key];
    const message = check(el.value);
    const wrapper = el.closest(".field");
    const errorBox = document.getElementById(key + "-error");

    errorBox.textContent = message;
    wrapper.classList.toggle("invalid", Boolean(message));
    wrapper.classList.toggle("valid", !message && el.value.trim() !== "");
    el.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  }

  Object.keys(fields).forEach((key) => {
    const { el } = fields[key];
    el.addEventListener("blur", () => validateField(key));
    el.addEventListener("input", () => {
      // Re-check live only after the field has been flagged once
      if (el.closest(".field").classList.contains("invalid")) validateField(key);
    });
  });

  // Character counter for the message box
  const messageBox = form.elements.message;
  const counter = document.getElementById("message-count");
  messageBox.addEventListener("input", () => {
    counter.textContent = messageBox.value.length + " / 500";
  });

  /* 6. Success modal */
  const modal = document.getElementById("successModal");
  const modalText = document.getElementById("modal-text");
  const modalClose = document.getElementById("modalClose");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstInvalid = null;
    Object.keys(fields).forEach((key) => {
      if (!validateField(key) && !firstInvalid) firstInvalid = fields[key].el;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const firstName = fields.name.el.value.trim().split(" ")[0];
    modalText.textContent =
      "Thanks, " + firstName + ". We will email " + fields.email.el.value.trim() +
      " within 2 hours with a time slot.";

    form.reset();
    counter.textContent = "0 / 500";
    form.querySelectorAll(".field").forEach((f) => f.classList.remove("valid", "invalid"));

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      alert(modalText.textContent); // fallback for very old browsers
    }
  });

  modalClose.addEventListener("click", () => modal.close());
  // Close when clicking the dimmed backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });

  /* 7. Footer year */
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ==========================================================================
   CONCEPT WATER — script.js
   Vanilla JS, sans dépendance externe.
   ========================================================================== */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Année du footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header : fond au scroll ---------- */
  const header = document.getElementById("site-header");
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  const closeMobileNav = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    mobileNav.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const openMobileNav = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fermer le menu");
    mobileNav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMobileNav() : openMobileNav();
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileNav);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileNav();
    });
  }

  /* ---------- Apparition au scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Galerie : filtres ---------- */
  const filterButtons = document.querySelectorAll(".gallery-filters button");
  const galleryItems = document.querySelectorAll(".g-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;

      galleryItems.forEach((item) => {
        const match = filter === "all" || item.dataset.category === filter;
        item.style.display = match ? "" : "none";
      });
    });
  });

  /* ---------- Galerie : lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  const galleryList = Array.from(galleryItems);
  let currentIndex = 0;

  function renderLightbox(index) {
    const item = galleryList[index];
    if (!item || !lightboxContent) return;
    const img = item.querySelector("img");
    const caption = item.dataset.caption || "";
    lightboxContent.innerHTML = img
      ? `<img src="${img.src}" alt="${img.alt || caption}">`
      : `<div style="aspect-ratio:4/3;border-radius:4px;background:linear-gradient(145deg,#0b3555,#1ea6c6);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.75);font-size:.85rem;padding:1.5rem;text-align:center;">[PHOTO À REMPLACER] — ${caption}</div>`;
    lightboxCaption.textContent = caption;
  }

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox(currentIndex);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function showRelative(delta) {
    const visible = galleryList.filter((el) => el.style.display !== "none");
    if (!visible.length) return;
    const visibleIndex = visible.indexOf(galleryList[currentIndex]);
    const nextVisibleIndex = (visibleIndex + delta + visible.length) % visible.length;
    currentIndex = galleryList.indexOf(visible[nextVisibleIndex]);
    renderLightbox(currentIndex);
  }

  galleryList.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", () => showRelative(-1));
  if (lightboxNext) lightboxNext.addEventListener("click", () => showRelative(1));

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showRelative(-1);
    if (e.key === "ArrowRight") showRelative(1);
  });

  /* ---------- Formulaire de contact ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  function setError(fieldId, message) {
    const el = document.getElementById(`err-${fieldId}`);
    if (el) el.textContent = message || "";
  }

  function validateForm(data) {
    let valid = true;
    setError("prenom", "");
    setError("nom", "");
    setError("email", "");
    setError("message", "");
    setError("telephone", "");

    if (!data.prenom.trim()) { setError("prenom", "Merci d'indiquer votre prénom."); valid = false; }
    if (!data.nom.trim()) { setError("nom", "Merci d'indiquer votre nom."); valid = false; }
    if (!data.message.trim()) { setError("message", "Merci de décrire votre besoin."); valid = false; }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim() || !emailPattern.test(data.email)) {
      setError("email", "Merci d'indiquer une adresse e-mail valide.");
      valid = false;
    }

    return valid;
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        prenom: form.prenom.value,
        nom: form.nom.value,
        telephone: form.telephone.value,
        email: form.email.value,
        message: form.message.value,
      };

      if (!validateForm(data)) {
        status.classList.remove("is-visible");
        return;
      }

      // Pas de backend en V1 : préparation d'un envoi par e-mail (mailto).
      // À remplacer par un vrai endpoint / service de formulaire en V2.
      const subject = encodeURIComponent(`Demande de devis — ${data.prenom} ${data.nom}`);
      const body = encodeURIComponent(
        `Nom : ${data.prenom} ${data.nom}\nTéléphone : ${data.telephone || "non renseigné"}\nE-mail : ${data.email}\n\nMessage :\n${data.message}\n\n(Besoin identifié par l'assistant : ${assistantResultLabel || "non renseigné"})`
      );

      status.textContent = "Votre logiciel de messagerie va s'ouvrir pour finaliser l'envoi de votre demande.";
      status.classList.add("is-visible");

      window.location.href = `mailto:contact@concept-water.fr?subject=${subject}&body=${body}`;
      // NOTE : l'adresse contact@concept-water.fr est un espace réservé.
      // Remplacer par l'adresse e-mail réelle de Concept Water avant mise en ligne.
    });
  }

  /* ---------- Assistant de qualification (logique déterministe, sans IA) ---------- */
  const assistantBody = document.getElementById("assistant-body");
  let assistantResultLabel = "";

  const assistantSteps = {
    start: {
      question: "Quel est votre besoin ?",
      options: [
        { label: "Projet piscine", next: "describe", category: "Projet piscine" },
        { label: "Entretien", next: "describe", category: "Entretien" },
        { label: "Dépannage", next: "describe", category: "Dépannage" },
        { label: "Équipement", next: "describe", category: "Équipement" },
        { label: "Spa", next: "describe", category: "Spa" },
      ],
    },
  };

  function renderAssistantStart() {
    if (!assistantBody) return;
    const step = assistantSteps.start;
    assistantBody.innerHTML = `
      <p class="assistant-question">${step.question}</p>
      <div class="assistant-options" id="assistant-options"></div>
    `;
    const optionsWrap = document.getElementById("assistant-options");
    step.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = opt.label;
      btn.addEventListener("click", () => renderAssistantDescribe(opt.category));
      optionsWrap.appendChild(btn);
    });
  }

  function renderAssistantDescribe(category) {
    if (!assistantBody) return;
    assistantBody.innerHTML = `
      <p class="assistant-question">Décrivez rapidement votre besoin.</p>
      <textarea class="assistant-textarea" id="assistant-desc" placeholder="Ex. : je souhaite installer un spa sur ma terrasse..."></textarea>
      <div class="assistant-options">
        <button type="button" id="assistant-submit">Continuer</button>
        <button type="button" id="assistant-back">Retour</button>
      </div>
    `;
    document.getElementById("assistant-back").addEventListener("click", renderAssistantStart);
    document.getElementById("assistant-submit").addEventListener("click", () => {
      const desc = document.getElementById("assistant-desc").value.trim();
      renderAssistantSummary(category, desc);
    });
  }

  function renderAssistantSummary(category, description) {
    if (!assistantBody) return;
    assistantResultLabel = `${category}${description ? " — " + description : ""}`;

    // Pré-remplit le message du formulaire de contact
    const messageField = document.getElementById("message");
    if (messageField && !messageField.value.trim()) {
      messageField.value = `Besoin : ${category}.${description ? " " + description : ""}`;
    }

    assistantBody.innerHTML = `
      <p class="assistant-question">Merci.</p>
      <div class="assistant-summary">Votre demande semble concerner : <strong>${category}</strong>.</div>
      <div class="assistant-options">
        <a href="#contact-form" class="btn btn-primary" id="assistant-cta">Envoyer ma demande</a>
      </div>
      <p class="assistant-restart" id="assistant-restart" role="button" tabindex="0">Recommencer</p>
    `;
    document.getElementById("assistant-cta").addEventListener("click", () => {
      const messageEl = document.getElementById("message");
      if (messageEl) messageEl.focus();
    });
    const restart = document.getElementById("assistant-restart");
    restart.addEventListener("click", renderAssistantStart);
    restart.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") renderAssistantStart();
    });
  }

  renderAssistantStart();

  /* ---------- Barre d'action mobile : masquer si formulaire ouvert au clavier ---------- */
  const actionbar = document.getElementById("mobile-actionbar");
  const contactSection = document.getElementById("contact");

  if (actionbar && contactSection && "IntersectionObserver" in window) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          actionbar.classList.toggle("is-hidden", entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );
    barObserver.observe(contactSection);
  }
})();

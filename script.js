document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');
  burger.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  /* ---------- Hero rain ---------- */
  const rainLayer = document.getElementById('rainLayer');
  const dropCount = window.innerWidth < 700 ? 18 : 34;
  for (let i = 0; i < dropCount; i++) {
    const drop = document.createElement('span');
    const left = Math.random() * 100;
    const duration = 1.6 + Math.random() * 1.8;
    const delay = Math.random() * 4;
    drop.style.left = left + '%';
    drop.style.animationDuration = duration + 's';
    drop.style.animationDelay = delay + 's';
    drop.style.opacity = (0.25 + Math.random() * 0.4).toFixed(2);
    rainLayer.appendChild(drop);
  }

  /* ---------- Foam bubbles ---------- */
  const foamLayer = document.getElementById('foamBubbles');
  const bubbleCount = window.innerWidth < 700 ? 10 : 18;
  for (let i = 0; i < bubbleCount; i++) {
    const b = document.createElement('span');
    const size = 6 + Math.random() * 16;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + '%';
    b.style.animationDuration = (6 + Math.random() * 8) + 's';
    b.style.animationDelay = (Math.random() * 8) + 's';
    foamLayer.appendChild(b);
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.badge-num');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const isYear = target > 1900;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll('.service-card, .why-item, .process-step');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealTargets.forEach(t => revealObserver.observe(t));

  /* ---------- Process line fill ---------- */
  const processFill = document.getElementById('processFill');
  const processTrack = document.querySelector('.process-track');
  if (processTrack) {
    const fillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          processFill.style.width = '100%';
          fillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    fillObserver.observe(processTrack);
  }

  /* ---------- Cursor glow (desktop only) ---------- */
  const glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      glow.classList.add('active');
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    });
    window.addEventListener('mouseleave', () => glow.classList.remove('active'));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
/* ========================================
   IMAGE LIGHTBOX
======================================== */

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image = item.querySelector("img");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


lightboxClose.addEventListener("click", closeLightbox);


lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        closeLightbox();
    }

});


document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
        closeLightbox();
    }

});
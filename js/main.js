// Slider servicios
  const slides = document.querySelectorAll('.svc-slide');
  const dots = document.querySelectorAll('.svc-dot');
  let current = 0;
  let timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() { timer = setInterval(() => goTo(current + 1), 5000); }
  function resetAuto() { clearInterval(timer); startAuto(); }

  document.querySelector('.svc-arrow.next').addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  document.querySelector('.svc-arrow.prev').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));
  startAuto();

  // Blog expand/collapse
  document.querySelectorAll('.blog-read').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.blog-card');
      const expanded = card.classList.toggle('expanded');
      btn.innerHTML = expanded ? 'Leer menos <span class="arrow">↑</span>' : 'Leer más <span class="arrow">→</span>';
    });
  });

  // Nav scroll
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 50 ? 'rgba(11,26,23,1)' : 'rgba(11,26,23,.96)';
  });

  // Hamburguesa
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
// Atualiza o ano automaticamente no footer
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Observer para revelar seções gerais
const sections = document.querySelectorAll('.section');
const revealSections = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
sections.forEach(section => revealSections.observe(section));


const revealElements = document.querySelectorAll('.reveal');
const revealGeneric = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(el => revealGeneric.observe(el));

// Pequeno efeito parallax no scroll (opcional)
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const offset = window.pageYOffset;
  hero.style.backgroundPositionY = offset * 0.5 + 'px';
});



// Carrossel Moderno
const carousel = document.querySelector('.carousel-modern');
if (carousel) {
  const items = carousel.querySelectorAll('.carousel-item');
  const leftBtn = carousel.querySelector('.carousel-arrow.left');
  const rightBtn = carousel.querySelector('.carousel-arrow.right');
  const indicators = carousel.querySelector('.carousel-indicators');
  let current = 0;

  // Cria os indicadores
  items.forEach((_, idx) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Ir para slide ${idx + 1}`);
    if (idx === 0) btn.classList.add('active');
    btn.addEventListener('click', () => show(idx));
    indicators.appendChild(btn);
  });

  function show(idx) {
    items.forEach((item, i) => item.classList.toggle('active', i === idx));
    Array.from(indicators.children).forEach((b, i) => b.classList.toggle('active', i === idx));
    current = idx;
  }

  leftBtn.addEventListener('click', () => {
    show((current === 0) ? items.length - 1 : current - 1);
  });
  rightBtn.addEventListener('click', () => {
    show((current === items.length - 1) ? 0 : current + 1);
  });

  // Swipe para mobile
  let startX = null;
  carousel.querySelector('.carousel-images').addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  carousel.querySelector('.carousel-images').addEventListener('touchend', e => {
    if (startX === null) return;
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 40) leftBtn.click();
    else if (startX - endX > 40) rightBtn.click();
    startX = null;
  });
}
 
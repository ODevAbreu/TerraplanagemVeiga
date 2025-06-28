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

// Observer para elementos com classe .reveal (cards, projetos)
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

// Carrossel de projetos
const slide = document.querySelector('.carousel-slide');
const cards = document.querySelectorAll('.carousel-slide .project-card');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth;
  const containerWidth = slide.parentElement.offsetWidth;
  // Centraliza o card ativo
  const offset = (cardWidth * currentIndex) - ((containerWidth - cardWidth) / 2);
  slide.style.transform = `translateX(-${offset}px)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
  updateCarousel();
});

// Responsivo: atualiza ao redimensionar
window.addEventListener('resize', updateCarousel);

updateCarousel();

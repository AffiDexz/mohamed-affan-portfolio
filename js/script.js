// ===== Theme toggle =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme');
if (storedTheme) root.setAttribute('data-theme', storedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  primaryNav.classList.toggle('open');
  navToggle.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
  });
});

// ===== Header scroll state + progress bar =====
const header = document.getElementById('siteHeader');
const progressBar = document.getElementById('progressBar');
const backToTop = document.getElementById('backToTop');

function onScroll() {
  const scrollTop = window.scrollY;
  header.classList.toggle('scrolled', scrollTop > 10);
  backToTop.classList.toggle('visible', scrollTop > 500);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Active nav link on scroll (scroll-spy) =====
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(section => spyObserver.observe(section));

// ===== Reveal on scroll =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Rotating role text =====
const roles = [
  'Full-Stack Web Developer',
  'Flutter Mobile Developer',
  'Software Engineering Intern',
  'React & Node.js Developer'
];
const rotatingEl = document.getElementById('rotatingRole');
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = false;

function typeLoop() {
  const currentWord = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    if (charIndex > currentWord.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 300);
      return;
    }
  }

  rotatingEl.textContent = currentWord.slice(0, charIndex);
  setTimeout(typeLoop, deleting ? 40 : 65);
}
setTimeout(typeLoop, 1800);

// ===== Animated stat counters =====
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 900;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(step);
}

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

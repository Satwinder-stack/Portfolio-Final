

const items = document.querySelectorAll('.skill-item');
const display = document.querySelector('.skills-display');
const wrapper = document.querySelector('.skills-wrapper');

let activeItem = null;

items.forEach(item => {
  item.addEventListener('click', () => {

    if (window.innerWidth <= 767) {
      const isActive = item.classList.contains('active');

      items.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      item.classList.toggle('active', !isActive);
      return;
    }

    // ── Tablet & Desktop → side panel behavior ──
    const titleEl   = item.querySelector('.skill-header h1');
    const contentEl = item.querySelector('.skill-content');

    const title   = titleEl   ? titleEl.innerText   : '';
    const content = contentEl ? contentEl.innerText : '';

    if (activeItem === item) {
      wrapper.classList.remove('active');
      items.forEach(i => i.classList.remove('active'));
      display.innerHTML = '';
      activeItem = null;
      return;
    }

    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    activeItem = item;

    display.innerHTML = `
      <h2>${title}</h2>
      <p>${content}</p>
    `;

    wrapper.classList.add('active');
  });
});

const revealEls = document.querySelectorAll('.fx-reveal, .fx-rise');

// Toggle reveal on enter/exit without creating inner scroll contexts
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fx-visible');
      } else {
        entry.target.classList.remove('fx-visible');
      }
    });
  },
  {
    root: null,
    rootMargin: '5% 0px -10% 0px',
    threshold: 0,
  }
);

revealEls.forEach((el) => io.observe(el));




















// Select the slider wrapper and all slides
const wrapper1 = document.querySelector(".slider-wrapper");
const slides = wrapper1.querySelectorAll(".slide");

let index = 0; // current slide index

function nextCert() {
    index = (index + 1) % slides.length; // loop to start
    updateSlider();
}

function prevCert() {
    index = (index - 1 + slides.length) % slides.length; // loop to end
    updateSlider();
}

function updateSlider() {
    wrapper1.style.transform = `translateX(-${index * 100}%)`;
}



const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const btnText = themeToggle.querySelector('.mode-text');

const pageWrapper = document.querySelector('.page-wrapper');
const header = document.querySelector('header');

function updateButtonText() {
    if (body.classList.contains('light-theme')) {
        btnText.textContent = 'LIGHT';
    } else {
        btnText.textContent = 'NIGHT';
    }
}


const description = document.querySelector('.description');
const quote = document.querySelector('.quote');

function fadeAndSwap(element, newText) {
    if (!element) return;
    
    element.classList.add('text-fade');

    setTimeout(() => {
        element.textContent = newText;
        element.classList.remove('text-fade');
    }, 300);
}

function updateContent() {
    const isLight = document.body.classList.contains('light-theme');

    // Handle Description
    const descText = isLight 
        ? "Most of my mornings start the same way: a decent cup of coffee and a bit of quiet before the day gets busy. I spend my time building things that actually work, usually by turning messy ideas into something clean and usable."
        : "There's something about the environment being quiet that makes it easier to focus. I usually do my best work at night — just me, a keyboard, and enough coffee to finally figure out a solution.";
    
    fadeAndSwap(description, descText);

    // Handle Quote
    const quoteText = isLight
        ? "“One coffee at a time, one problem solved at a time.”"
        : "“The best ideas usually show up when everyone else is asleep.”";
    
    fadeAndSwap(quote, quoteText);
}





themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    updateContent(); 
    updateButtonText();

    const pageWrapper = document.querySelector('.page-wrapper');
    if (pageWrapper) {
        pageWrapper.classList.remove('animate-trigger');
        void pageWrapper.offsetWidth; 
        pageWrapper.classList.add('animate-trigger');
    }

    // persistence for not reseting yung current mode
    const isLight = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
    }
    
    updateButtonText();
    updateDescription(); 

    const pageWrapper = document.querySelector('.page-wrapper');
    const header = document.querySelector('header');
    if (pageWrapper && header) {
        pageWrapper.classList.add('animate-trigger');
        header.classList.add('animate-trigger');
    }
}

initTheme();
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
scrollToTop();
window.addEventListener('load', scrollToTop);

document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const previews = document.querySelectorAll('.preview-media');
    const detailsPanels = document.querySelectorAll('.project-details');
    const carousel = document.querySelector('.carousel-container');
    const languages = document.querySelectorAll('.language');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    const projectCards = document.querySelectorAll('.project-card');

    let isDown = false;
    let startY;
    let scrollTop;
    let isDragging = false;

    const selectProject = (index) => {
        previews.forEach((vid, i) => {
            if (i === index) {
                vid.classList.add('active');
                const playPromise = vid.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => { /* Silent catch for browser blocks */ });
                }
            } else {
                vid.classList.remove('active');
                vid.pause();
                vid.currentTime = 0;
            }
        });

        // Handle Details & Thumbnails
        detailsPanels.forEach((panel, i) => panel.classList.toggle('active', i === index));
        thumbnails.forEach((t, i) => t.classList.toggle('active', i === index));

        // Center thumbnail in carousel
        const thumb = thumbnails[index];
        if (thumb && carousel) {
            const scrollPos = (thumb.offsetTop - carousel.offsetTop) - (carousel.clientHeight / 2) + (thumb.clientHeight / 2);
            carousel.scrollTo({ top: scrollPos, behavior: 'smooth' });
        }
    };

    // --- 2. CAROUSEL DRAG LOGIC ---
    if (carousel) {
        const startDragging = (e) => {
            isDown = true;
            isDragging = false;
            carousel.classList.add('active-dragging');
            startY = (e.pageY || e.touches[0].pageY) - carousel.offsetTop;
            scrollTop = carousel.scrollTop;
        };

        const stopDragging = () => {
            isDown = false;
            carousel.classList.remove('active-dragging');
        };

        const move = (e) => {
            if (!isDown) return;
            const y = (e.pageY || e.touches[0].pageY) - carousel.offsetTop;
            const walk = (y - startY) * 1.5;
            if (Math.abs(walk) > 5) isDragging = true;
            carousel.scrollTop = scrollTop - walk;
        };

        carousel.addEventListener('mousedown', startDragging);
        carousel.addEventListener('mouseleave', stopDragging);
        carousel.addEventListener('mouseup', stopDragging);
        carousel.addEventListener('mousemove', (e) => { e.preventDefault(); move(e); });
        carousel.addEventListener('touchstart', startDragging, { passive: true });
        carousel.addEventListener('touchend', stopDragging);
        carousel.addEventListener('touchmove', move, { passive: true });
    }

    thumbnails.forEach((thumb, i) => {
        thumb.addEventListener('click', () => {
            if (!isDragging) selectProject(i);
        });
    });

    // --- 3. TECH STACK FILTERING LOGIC ---
    let currentTechIndex = 0;

    const activateTech = (idx) => {
        const selectedTech = languages[idx]?.dataset.tech.toLowerCase();
        
        // Update Icons Style
        languages.forEach((img, i) => {
            const iconParent = img.closest('.tech-icon');
            if (i === idx) {
                iconParent.classList.add('active');
                img.style.transform = 'scale(1.2)';
                img.style.filter = 'brightness(1.35) drop-shadow(0 0 16px rgba(64,196,255,0.85))';
                img.style.opacity = '1';
            } else {
                iconParent.classList.remove('active');
                img.style.transform = 'scale(0.88)';
                img.style.filter = 'blur(2px) brightness(0.55)';
                img.style.opacity = '0.6';
            }
        });

        // Filter Grid Cards
        projectCards.forEach(card => {
            const tags = (card.dataset.tags || '').toLowerCase().split(/\s+/);
            if (tags.includes(selectedTech)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
        currentTechIndex = idx;
    };

    // Arrow Listeners
    if (leftArrow) leftArrow.addEventListener('click', () => {
        currentTechIndex = (currentTechIndex - 1 + languages.length) % languages.length;
        activateTech(currentTechIndex);
    });

    if (rightArrow) rightArrow.addEventListener('click', () => {
        currentTechIndex = (currentTechIndex + 1) % languages.length;
        activateTech(currentTechIndex);
    });

    languages.forEach((img, idx) => {
        img.parentElement.addEventListener('click', () => activateTech(idx));
    });

    // --- INITIALIZATION ---
    if (thumbnails.length > 0) selectProject(0);
    if (languages.length > 0) activateTech(0); 
});
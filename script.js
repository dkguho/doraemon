document.addEventListener('DOMContentLoaded', () => {

    /* ================= CAROUSEL ================= */
    const track = document.getElementById('track');
    if (track) {
        const slides = Array.from(track.children);
        let currentIndex = 0;
        const intervalTime = 3000;

        function updateCarousel() {
            track.style.transform = `translateX(${-100 * currentIndex}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }

        setInterval(nextSlide, intervalTime);
    }


    /* ================= PUBLICATION SLIDER ================= */
    const slider = document.getElementById('pubSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (slider && prevBtn && nextBtn) {
        const cardWidth = slider.querySelector('.pub-card')?.offsetWidth || 0;
        const gap = 30;

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });
    }


    /* ================= FADE IN + COUNTER ================= */
    let hasCounted = false;

    function startCounters() {
        if (hasCounted) return;
        hasCounted = true;

        document.querySelectorAll('.counter').forEach(counter => {
            const target = +counter.dataset.target;
            const increment = target / (2000 / 16);
            let current = 0;

            function update() {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target;
                }
            }
            update();
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.querySelector('.stats-grid')) {
                    startCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.fade-in-up, .stats-wrapper')
        .forEach(el => observer.observe(el));


    /* ================= MOBILE MENU ================= */
    const mobileSidebar = document.getElementById('mobileSidebar');
    document.getElementById('mobileMenuOpen')?.addEventListener('click', () => {
        mobileSidebar?.classList.add('open');
    });

    document.getElementById('mobileMenuClose')?.addEventListener('click', () => {
        mobileSidebar?.classList.remove('open');
    });

    document.querySelectorAll('.sidebar-link, .sidebar-btn-call, .sidebar-btn-login')
        .forEach(link => {
            link.addEventListener('click', () => {
                mobileSidebar?.classList.remove('open');
            });
        });


    /* ================= FILTER BUTTON ================= */
    const filterBtns = document.querySelectorAll('.filter-btn:not(.dropdown-filter)');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });


    /* ================= PAGINATION ================= */
    const list = document.getElementById('paginated-list');
    const controls = document.getElementById('pagination-controls');
    const buttonBox = document.querySelector('.button-box');

    if (list && controls && buttonBox) {
        const cards = Array.from(list.children);
        const perPage = 8;
        const totalPages = Math.ceil(cards.length / perPage);
        let currentPage = 1;

        function showPage(page) {
            currentPage = page;
            const start = (page - 1) * perPage;
            const end = start + perPage;

            cards.forEach((card, i) => {
                card.style.display = (i >= start && i < end) ? 'flex' : 'none';
            });

            renderButtons();
        }

        function renderButtons() {
            buttonBox.innerHTML = "";
            if (totalPages <= 1) return;

            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                btn.style.background = i === currentPage ? '#780A0A' : '#eee';
                btn.style.color = i === currentPage ? '#fff' : '#000';

                btn.onclick = () => {
                    showPage(i);
                    window.scrollTo({ top: list.offsetTop - 100, behavior: 'smooth' });
                };
                buttonBox.appendChild(btn);
            }
        }

        showPage(1);
    }

    console.log("Script loaded successfully!");
});

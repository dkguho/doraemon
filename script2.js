document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('paginated-list');
    const controls = document.getElementById('pagination-controls');

    // Safety check to prevent errors
    if (!list || !controls) {
        console.log("Check HTML: 'paginated-list' or 'pagination-controls' is missing!");
        return;
    }

    const cards = Array.from(list.children);
    const perPage = 8;
    const totalPages = Math.ceil(cards.length / perPage);
    let currentPage = 1;

    function showPage(num) {
        currentPage = num;
        const start = (num - 1) * perPage;
        const end = start + perPage;

        cards.forEach((card, i) => {
            card.style.display = (i >= start && i < end) ? "flex" : "none";
        });

        renderButtons();
    }

    function createButton(text, targetPage, isActive = false, isDisabled = false) {
        const btn = document.createElement("button");
        btn.innerText = text;
        btn.className = "pagination-btn";
        if (isActive) btn.classList.add("active");
        if (isDisabled) btn.disabled = true;

        btn.onclick = () => {
            if (!isDisabled) {
                showPage(targetPage);
                window.scrollTo({ top: list.offsetTop - 100, behavior: 'smooth' });
            }
        };
        return btn;
    }

    function renderButtons() {
        controls.innerHTML = "";
        if (totalPages <= 1) return;

        // Add Previous Arrow (<)
        controls.appendChild(createButton("<", currentPage - 1, false, currentPage === 1));

        // Add Numbered Buttons
        for (let i = 1; i <= totalPages; i++) {
            controls.appendChild(createButton(i, i, i === currentPage));
        }

        // Add Next Arrow (>)
        controls.appendChild(createButton(">", currentPage + 1, false, currentPage === totalPages));
    }

    showPage(1);
});
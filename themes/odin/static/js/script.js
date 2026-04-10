// ── Navbar mobile toggle ─────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('nav-toggle');
    const menu   = document.getElementById('nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const open = menu.classList.toggle('flex');
            menu.classList.toggle('hidden', !open);
            toggle.setAttribute('aria-expanded', String(open));
        });
    }
});

// ── TOC scroll-spy ───────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    const headers = [...document.querySelectorAll('h1[id],h2[id],h3[id],h4[id]')];
    if (!headers.length) return;

    const sectionVisibility = new Map();
    const nav = document.querySelector('.odin-nav');
    const navbarHeight = nav ? nav.offsetHeight : 60;

    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            sectionVisibility.set(entry.target.getAttribute('id'), entry.isIntersecting);
        }
        for (const [sectionId, isVisible] of sectionVisibility) {
            if (isVisible) {
                clearActiveStatesInTableOfContents();
                const anchor = document.querySelector(`nav li a[href="#${sectionId}"]`);
                if (anchor) {
                    anchor.parentElement.classList.add('active');
                    anchor.scrollIntoView({ block: 'nearest' });
                }
                break;
            }
        }
    }, { rootMargin: `-${navbarHeight}px 0px 0px 0px`, threshold: 1.0 });

    headers.forEach(h => {
        sectionVisibility.set(h.getAttribute('id'), false);
        observer.observe(h);
    });
});

function clearActiveStatesInTableOfContents() {
    document.querySelectorAll('nav li').forEach(li => li.classList.remove('active'));
}

// ── Style plain tables ───────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('table').forEach(table => {
        if (table.className === '') table.classList.add('table');
    });
});

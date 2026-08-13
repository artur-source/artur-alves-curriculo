(() => {
    const header = document.querySelector('[data-header]');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('#site-nav');
    const navLinks = [...document.querySelectorAll('.site-nav > a[href^="#"]')];
    const sections = [...document.querySelectorAll('main section[id]')];
    const revealItems = [...document.querySelectorAll('.reveal')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const closeMenu = () => {
        if (!menuToggle || !nav) return;
        menuToggle.classList.remove('is-open');
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);

    menuToggle?.addEventListener('click', () => {
        if (!nav) return;
        const isOpen = nav.classList.toggle('is-open');
        menuToggle.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', (event) => {
        if (!nav || !menuToggle || !nav.classList.contains('is-open')) return;
        const target = event.target;
        if (target instanceof Node && !nav.contains(target) && !menuToggle.contains(target)) closeMenu();
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        window.requestAnimationFrame(() => { syncHeader(); ticking = false; });
        ticking = true;
    }, { passive: true });
    syncHeader();

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: .1, rootMargin: '0px 0px -35px' });
        revealItems.forEach((item) => revealObserver.observe(item));
    }

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
            });
        }, { rootMargin: '-35% 0px -55%', threshold: 0 });
        sections.forEach((section) => sectionObserver.observe(section));
    }
})();

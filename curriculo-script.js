/* ====================================================================
   CURRÍCULO PROFISSIONAL - SCRIPT JAVASCRIPT
   Autor: PortfolioPro | Versão: 1.0.0
   ==================================================================== */

// ====================================================================
// 1. MENU HAMBURGER MOBILE
// ====================================================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});

// ====================================================================
// 2. SCROLL REVEAL - ANIMAÇÕES AO ROLAR A PÁGINA
// ====================================================================

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar aos cards e itens
    const elementsToReveal = document.querySelectorAll(
        '.formacao-card, .timeline-content, .contact-item, .skill-tag'
    );

    elementsToReveal.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Executar ao carregar
document.addEventListener('DOMContentLoaded', initScrollReveal);

// ====================================================================
// 3. INDICADOR DE SEÇÃO ATIVA NA NAVEGAÇÃO
// ====================================================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ====================================================================
// 4. SUPORTE A MODO ESCURO (Preferência do Sistema)
// ====================================================================

function initDarkModeSupport() {
    // Verificar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Aplicar tema baseado na preferência
    function applyTheme(isDark) {
        if (isDark) {
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.style.colorScheme = 'light';
        }
    }

    // Aplicar ao carregar
    applyTheme(prefersDark.matches);

    // Ouvir mudanças na preferência do sistema
    prefersDark.addEventListener('change', (e) => {
        applyTheme(e.matches);
    });
}

document.addEventListener('DOMContentLoaded', initDarkModeSupport);

// ====================================================================
// 5. SMOOTH SCROLL PARA ÂNCORAS (Fallback para navegadores antigos)
// ====================================================================

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // Scroll suave (fallback para navegadores sem suporte nativo)
                if (!CSS.supports('scroll-behavior', 'smooth')) {
                    const targetPosition = target.offsetTop - 80; // Offset para header fixo
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ====================================================================
// 6. PERFORMANCE: Debounce para eventos de scroll
// ====================================================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exemplo de uso com scroll
const handleScroll = debounce(() => {
    // Lógica de scroll aqui
}, 150);

window.addEventListener('scroll', handleScroll);

// ====================================================================
// 7. FEEDBACK VISUAL DE CLIQUE EM BOTÕES
// ====================================================================

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Criar ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            // Remover ripple após animação
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ====================================================================
// 8. ANALYTICS SIMPLES (Opcional)
// ====================================================================

function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
}

// Rastrear quando seções são visualizadas
function trackSectionViews() {
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && typeof gtag !== 'undefined') {
                gtag('event', 'view_section', {
                    section_name: entry.target.id
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
    trackPageView();
    trackSectionViews();
});

// ====================================================================
// 9. CONSOLE LOG DE INICIALIZAÇÃO (Para Debug)
// ====================================================================

console.log('%c🎓 Currículo Profissional Inicializado', 'color: #2563EB; font-size: 14px; font-weight: bold;');
console.log('%cVersão: 1.0.0', 'color: #4B5563; font-size: 12px;');

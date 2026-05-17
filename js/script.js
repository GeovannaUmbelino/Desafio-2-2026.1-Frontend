document.addEventListener('DOMContentLoaded', () => {
    initThemeManager();
    initContactForm();
    initMobileMenu();
});

/* Modo Claro e Modo Escuro*/

function initThemeManager() {
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIconImg = document.getElementById('theme-icon-img');
    const htmlElement = document.documentElement;

    const activeTheme = localStorage.getItem('theme');
    
    const iconSun = 'assets/brilho-e-contraste.png';
    const iconMoon = 'assets/modo-escuro (2).png';

    if (activeTheme === 'dark') {
        htmlElement.classList.add('dark-mode');
        if (themeIconImg) themeIconImg.src = iconSun; 
    } else {
        if (themeIconImg) themeIconImg.src = iconMoon; 
    }

    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        
        htmlElement.classList.toggle('dark-mode');
        
        if (htmlElement.classList.contains('dark-mode')) {
            if (themeIconImg) themeIconImg.src = iconSun; 
            localStorage.setItem('theme', 'dark');
        } else {
            if (themeIconImg) themeIconImg.src = iconMoon; 
            localStorage.setItem('theme', 'light');
        }
    });
}

/*Validação e feedback do formulário de contato*/
function initContactForm() {
    const form = document.getElementById('form-contato');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            assunto: document.getElementById('assunto').value
        };

        setTimeout(() => {
            alert(`Obrigado pelo contato, ${formData.nome}! Sua mensagem sobre "${formData.assunto}" foi recebida com sucesso.`);
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1200);
    });
}

/* Menu móvel */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!btn || !navLinks) return;

    btn.addEventListener('click', (e) => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('show-mobile');
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.classList.contains('show-mobile')) return;
        if (btn.contains(e.target) || navLinks.contains(e.target)) return;
        navLinks.classList.remove('show-mobile');
        btn.setAttribute('aria-expanded', 'false');
    });
}
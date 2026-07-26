(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.lang-toggle');
  const pdfLinks = document.querySelectorAll('.portfolio-download');
  let lang = localStorage.getItem('portfolio-lang') || 'ru';

  function applyLanguage(next) {
    lang = next;
    root.lang = lang;
    document.querySelectorAll('[data-ru][data-en]').forEach((node) => {
      node.textContent = node.dataset[lang];
    });
    toggle.innerHTML = lang === 'ru'
      ? '<span class="lang-active">RU</span><span>/</span><span>EN</span>'
      : '<span>RU</span><span>/</span><span class="lang-active">EN</span>';

    pdfLinks.forEach((link) => {
      link.href = lang === 'ru'
        ? 'Roman_Belysh_Portfolio_RU.pdf'
        : 'Roman_Belysh_Portfolio_EN.pdf';
    });
    document.title = lang === 'ru'
      ? 'Roman Belysh — 3D Product Designer'
      : 'Roman Belysh — 3D Product Designer Portfolio';
    localStorage.setItem('portfolio-lang', lang);
  }

  toggle.addEventListener('click', () => applyLanguage(lang === 'ru' ? 'en' : 'ru'));
  applyLanguage(lang);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const close = () => {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.work-item').forEach((item) => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.image;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', close);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) close();
  });
})();

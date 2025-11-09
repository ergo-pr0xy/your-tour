const app = () => {
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  header.addEventListener('animationend', (event) => {
    if (event.animationName === 'disappear-header') {
      header.classList.remove('header--fixed');
    }
  });

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (window.scrollY > 450) {
      header.classList.add('header--fixed');
      header.classList.add('header--show-fixed');
      header.classList.remove('header--hide-fixed');
    }

    if (currentScrollY < lastScrollY && currentScrollY <= 450) {
      header.classList.remove('header--show-fixed');
      header.classList.add('header--hide-fixed');
    }

    if (currentScrollY < lastScrollY && currentScrollY <= 88) {
      header.classList.remove('header--hide-fixed');
      header.classList.remove('header--fixed');
    }

    lastScrollY = currentScrollY;
  });
};

export default app;

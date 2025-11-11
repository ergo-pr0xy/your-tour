const app = () => {
  const header = document.querySelector('.header');
  const dateInputs = document.querySelectorAll('.field__input-date');
  const selectInput = document.querySelector('.field__select');
  let lastScrollY = window.scrollY;

  const today = new Date().toLocaleDateString('en-CA').slice(0, 10);

  const store = {
    dateFromValue: '',
    dateToValue: '',
  };

  // const submitFormButton = document.querySelector('.tour-creation__button');
  // submitFormButton.addEventListener('click', (e) => {
  //   selectInput.selectedIndex = 0;
  // });

  const setMinDate = (input) => input.setAttribute('min', today);

  const handleInputDate = (input) => {
    input.addEventListener('focus', () => {
      input.setAttribute('type', 'date');
      input.showPicker();
    });

    input.addEventListener('blur', (event) => {
      if (event.target.value === '') {
        input.setAttribute('type', 'text');
      } else {
        input.setAttribute('type', 'date');
      }
    });
  };

  const handleFixedHeader = () => {
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
  };

  const hideFixedHeader = (event) => {
    if (event.animationName === 'disappear-header') {
      header.classList.remove('header--fixed');
    }
  };

  dateInputs.forEach((input) => {
    setMinDate(input);
    handleInputDate(input);
  });

  window.addEventListener('scroll', () => {
    handleFixedHeader();
  });

  header.addEventListener('animationend', (event) => {
    hideFixedHeader(event);
  });
};

export default app;

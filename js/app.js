const app = () => {
  const header = document.querySelector('.header');
  const dateInputs = document.querySelectorAll('.field__input-date');
  const selectInput = document.querySelector('.field__select');
  const clearFormButton = document.querySelector('.tour-creation__clear-button');
  const tourCreationForm = document.querySelector('.tour-creation__form');
  const telInput = document.querySelector('#phonenumber');
  let lastScrollY = window.scrollY;

  const today = new Date().toLocaleDateString('en-CA').slice(0, 10);
  let lastDateInputLength = 0;

  const store = {
    dateFromValue: '',
    dateToValue: '',
  };

  const setMinDate = (input) => input.setAttribute('min', today);

  const clearDateInputs = (inputs) => {
    inputs.forEach((dateInput) => {
      dateInput.setAttribute('type', 'text');
    });
  };

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

  clearFormButton.addEventListener('click', () => {
    tourCreationForm.reset();
    clearDateInputs(dateInputs);
  });

  telInput.addEventListener('input', ({ target }) => {
    const cleanedNumbers = target.value.startsWith('+7') ? target.value.replace(/\D/g, '').slice(1) : target.value.replace(/\D/g, '');
    const maxLength = 10;

    if (cleanedNumbers.length === maxLength) {
      telInput.setAttribute('maxlength', '22');
    } else {
      telInput.setAttribute('maxlength', '30');
    }

    if (cleanedNumbers.length === 0) {
      target.value = '';
    }

    if (cleanedNumbers.length === 1) {
      target.value = `+7 (${cleanedNumbers}_ _ ) _ _ _ - _ _ - _ _`;
      telInput.setSelectionRange(5, 5);
    }

    if (cleanedNumbers.length === 2) {
      target.value = `+7 (${cleanedNumbers}_ ) _ _ _ - _ _ - _ _`;
      telInput.setSelectionRange(6, 6);
    }

    if (cleanedNumbers.length === 3) {
      target.value = `+7 (${cleanedNumbers}) _ _ _ - _ _ - _ _`;

      const cursorPosition = lastDateInputLength <= cleanedNumbers.length ? 9 : 7;
      telInput.setSelectionRange(cursorPosition, cursorPosition);
    }

    if (cleanedNumbers.length === 4) {
      target.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3)}_ _ - _ _ - _ _`;
      telInput.setSelectionRange(10, 10);
    }

    if (cleanedNumbers.length === 5) {
      target.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3)}_ - _ _ - _ _`;
      telInput.setSelectionRange(11, 11);
    }

    if (cleanedNumbers.length === 6) {
      target.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3)} - _ _ - _ _`;

      const cursorPosition = lastDateInputLength <= cleanedNumbers.length ? 15 : 12;
      telInput.setSelectionRange(cursorPosition, cursorPosition);
    }

    if (cleanedNumbers.length === 7) {
      target.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3, 6)} - ${cleanedNumbers.slice(6)}_ - _ _`;
      telInput.setSelectionRange(16, 16);
    }

    if (cleanedNumbers.length === 8) {
      target.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3, 6)} - ${cleanedNumbers.slice(6)} - _ _`;

      const cursorPosition = lastDateInputLength <= cleanedNumbers.length ? 20 : 17;
      telInput.setSelectionRange(cursorPosition, cursorPosition);
    }

    if (cleanedNumbers.length === 9) {
      target.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3, 6)} - ${cleanedNumbers.slice(6, 8)} - ${cleanedNumbers.slice(8)}_`;
      telInput.setSelectionRange(21, 21);
    }

    if (cleanedNumbers.length === 10) {
      target.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3, 6)} - ${cleanedNumbers.slice(6, 8)} - ${cleanedNumbers.slice(8)}`;
      telInput.setSelectionRange(22, 22);
    }

    lastDateInputLength = cleanedNumbers.length;
  });
};

export default app;

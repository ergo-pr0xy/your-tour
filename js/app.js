import validateForm from './validateForm.js';
import addPhoneMask from './addPhoneMask.js';

const app = () => {
  const header = document.querySelector('.header');
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const dateInputs = document.querySelectorAll('.field__input-date');
  const dateFromInput = document.querySelector('#date-from');
  const dateToInput = document.querySelector('#date-to');
  const clearFormButton = document.querySelector('.tour-creation__clear-button');
  const tourCreationForm = document.querySelector('.tour-creation__form');
  const phonenumberInput = document.querySelector('#phonenumber');
  const ageConfirmationYesEl = document.querySelector('#age-confirmation-yes');
  const ageConfirmationNoEl = document.querySelector('#age-confirmation-no');
  const ageConfirmationParentEl = document.querySelector('.tour-creaction__age-confirmation');
  const agreementConfirmationCheckbox = document.querySelector('[name="agreement-confirmation"]');
  const agreementConfirmationParentEl = document.querySelector('.tour-creation__agreement-confirmation');
  const toursSection = document.querySelector('#tours');
  const directionSelect = document.querySelector('select');

  const today = new Date().toLocaleDateString('en-CA').slice(0, 10);
  const fixedHeaderHeightAppearance = 450;
  const defaultHeaderHeight = 88;

  const state = {
    form: {
      fields: {
        name: '',
        direction: '',
        email: '',
        phonenumber: {
          masked: '',
          normalized: '',
        },
        dateFrom: '',
        dateTo: '',
        commentary: '',
        ageConfirmation: null,
        agreement: false,
      },
      errors: {
      },
      errorMessages: {
        emptyInput: 'Данное поле обязательно для заполнения',
        nameLang: 'Имя должно быть написано буквами русского алфавита и не должно содержать цифры',
        emptyAgreement: 'Для продолжения необходимо принять условия договора',
        emptyAge: 'Необходимо подтверждение Вашего возраста',
        prohibitedAge: 'Вы должны быть старше 18 лет для участия в туре',
        incorrectEmail: 'Введите email согласно шаблону example@mail.com',
        phonenumberLength: 'Номер телефона должен состоять из 11 цифр',
      },
      isValid: false,
    },
    uiState: {
      currentScrollY: window.scrollY,
      lastScrollY: window.scrollY,
      lastDateInputLength: 0,
      shouldClearForm: false,
      isDateFromInputFocused: false,
      isDateToInputFocused: false,
      phonenumberLastInputLength: 0,
    },
  };

  const removeElementsWithError = () => {
    const formElementsWithError = document.querySelectorAll('[class*="error--"]');

    formElementsWithError.forEach((element) => {
      element.classList.remove('error--input', 'error--checkbox', 'error--radio');
    });
  };

  const removeErrorMessages = () => {
    const errorMessageElements = document.querySelectorAll('.error');

    errorMessageElements.forEach((element) => {
      element.remove();
    });
  };

  const clearDirectionSelect = () => {
    directionSelect.classList.remove('field__select--color-black');
    directionSelect.classList.add('field__select--color-gray');
  };

  const clearDateInputs = () => {
    dateInputs.forEach((dateInput) => {
      dateInput.setAttribute('type', 'text');
      dateInput.removeAttribute('min');
    });
  };

  const removeErrorElements = () => {
    removeElementsWithError();
    removeErrorMessages();
  };

  const clearFormFields = () => {
    state.form.fields.name = '';
    state.form.fields.email = '';
    state.form.fields.direction = '';
    state.form.fields.dateFrom = '';
    state.form.fields.dateTo = '';
    state.form.fields.ageConfirmation = null;
    state.form.fields.agreement = false;
    state.form.fields.phonenumber.masked = '';
    state.form.fields.phonenumber.normalized = '';
    state.form.fields.commentary = '';
  };

  const renderForm = () => {
    removeErrorElements();

    nameInput.value = state.form.fields.name;
    emailInput.value = state.form.fields.email;
    directionSelect.value = state.form.fields.direction;
    dateFromInput.value = state.form.fields.dateFrom;
    dateToInput.value = state.form.fields.dateTo;
    ageConfirmationYesEl.checked = state.form.fields.ageConfirmation === 'yes';
    ageConfirmationNoEl.checked = state.form.fields.ageConfirmation === 'no';
    agreementConfirmationCheckbox.checked = state.form.fields.agreement;
    phonenumberInput.value = state.form.fields.phonenumber.masked;

    if (state.uiState.shouldClearForm === true) {
      clearDateInputs();
      clearDirectionSelect();
      return;
    }

    const errors = Object.entries(state.form.errors);

    errors.forEach(([key, value]) => {
      const errorElement = document.createElement('p');
      errorElement.classList.add('error');
      errorElement.innerText = state.form.errorMessages[value];

      if (key === 'name') {
        const parentElement = nameInput.parentNode;
        nameInput.classList.add('error--input');
        parentElement.appendChild(errorElement);
      }

      if (key === 'email') {
        const parentElement = emailInput.parentNode;
        emailInput.classList.add('error--input');
        parentElement.appendChild(errorElement);
      }

      if (key === 'direction') {
        const parentElement = directionSelect.parentNode;
        directionSelect.classList.add('error--input');
        parentElement.appendChild(errorElement);
      }

      if (key === 'dateFrom') {
        const parentElement = dateFromInput.parentNode;
        dateFromInput.classList.add('error--input');
        parentElement.appendChild(errorElement);
      }

      if (key === 'dateTo') {
        const parentElement = dateToInput.parentNode;
        dateToInput.classList.add('error--input');
        parentElement.appendChild(errorElement);
      }

      if (key === 'ageConfirmation') {
        const parentElement = ageConfirmationParentEl;
        parentElement.appendChild(errorElement);
      }

      if (key === 'agreement') {
        const parentElement = agreementConfirmationParentEl;
        parentElement.appendChild(errorElement);
      }

      if (key === 'phonenumber') {
        const parentElement = phonenumberInput.parentNode;
        phonenumberInput.classList.add('error--input');
        parentElement.appendChild(errorElement);
      }
    });
  };

  const handleFixedHeader = () => {
    state.uiState.lastScrollY = state.uiState.currentScrollY;
    state.uiState.currentScrollY = window.scrollY;
  };

  const renderHeader = (e) => {
    const { currentScrollY, lastScrollY } = state.uiState;

    if (currentScrollY > fixedHeaderHeightAppearance) {
      header.classList.add('header--fixed');
      header.classList.add('header--show-fixed');
      header.classList.remove('header--hide-fixed');
    }

    if (currentScrollY < lastScrollY && currentScrollY <= fixedHeaderHeightAppearance) {
      header.classList.remove('header--show-fixed');
      header.classList.add('header--hide-fixed');
    }

    if (currentScrollY < lastScrollY && currentScrollY <= defaultHeaderHeight) {
      header.classList.remove('header--hide-fixed');
      header.classList.remove('header--fixed');
    }

    if (e && e.animationName === 'disappear-header') {
      header.classList.remove('header--fixed');
    }
  };

  const handleInput = (field, event) => {
    state.form.fields[field] = event.target.value;
  };

  nameInput.addEventListener('input', (e) => {
    handleInput('name', e);
  });

  emailInput.addEventListener('input', (e) => {
    handleInput('email', e);
  });

  const renderDateInput = (e) => {
    if (e.target.name === 'date-from') {
      if (state.uiState.isDateFromInputFocused) {
        dateFromInput.type = 'date';
        dateFromInput.min = today;
        dateFromInput.showPicker();
      } else if (e.target.value === '') {
        dateFromInput.type = 'text';
      } else {
        dateFromInput.type = 'date';
      }
    }

    if (e.target.name === 'date-to') {
      if (state.uiState.isDateToInputFocused) {
        dateToInput.type = 'date';
        dateToInput.min = today;
        dateToInput.showPicker();
      } else if (e.target.value === '') {
        dateToInput.type = 'text';
      } else {
        dateToInput.type = 'date';
      }
    }
  };

  dateFromInput.addEventListener('focus', (e) => {
    state.uiState.isDateFromInputFocused = true;
    renderDateInput(e);
  });

  dateFromInput.addEventListener('blur', (e) => {
    state.uiState.isDateFromInputFocused = false;
    renderDateInput(e);
  });

  dateToInput.addEventListener('focus', (e) => {
    state.uiState.isDateToInputFocused = true;
    renderDateInput(e);
  });

  dateToInput.addEventListener('blur', (e) => {
    state.uiState.isDateToInputFocused = false;
    renderDateInput(e);
  });

  dateFromInput.addEventListener('input', (e) => {
    handleInput('dateFrom', e);
  });

  dateToInput.addEventListener('input', (e) => {
    handleInput('dateTo', e);
  });

  const renderSelect = (event) => {
    if (state.form.fields.direction === '') {
      event.classList.remove('field__select--color-black');
      event.target.classList.add('field__select--color-gray');
    } else {
      event.target.classList.remove('field__select--color-gray');
      event.target.classList.add('field__select--color-black');
    }
  };

  directionSelect.addEventListener('change', (e) => {
    handleInput('direction', e);
    renderSelect(e);
  });

  tourCreationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedErrors = validateForm(state.form.fields);
    console.log(updatedErrors);
    state.form.errors = { ...updatedErrors };
    state.form.isValid = Object.keys(updatedErrors).length === 0;

    if (state.form.isValid) {
      state.uiState.shouldClearForm = true;
      clearFormFields();
      renderForm();
      state.form.isValid = false;
      state.form.errors = {};
      state.uiState.shouldClearForm = false;
      toursSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    renderForm();
  });

  window.addEventListener('scroll', () => {
    handleFixedHeader();
    renderHeader();
  });

  header.addEventListener('animationend', (e) => {
    handleFixedHeader();
    renderHeader(e);
  });

  ageConfirmationYesEl.addEventListener('change', (e) => {
    if (e.target.checked) {
      state.form.fields.ageConfirmation = e.target.value;
    }
    renderForm();
  });

  ageConfirmationNoEl.addEventListener('change', (e) => {
    if (e.target.checked) {
      state.form.fields.ageConfirmation = e.target.value;
    }
    renderForm();
  });

  agreementConfirmationCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      state.form.fields.agreement = true;
    } else {
      state.form.fields.agreement = false;
    }
    renderForm();
  });

  const normalizeNumbers = (rawNumbers) => {
    let numbers = rawNumbers.replace(/\D/g, '');

    if (numbers.startsWith('7') || numbers.startsWith('8')) {
      numbers = numbers.slice(1);
    }

    return numbers.slice(0, 10);
  };

  const handlePhonenumberCursor = (normalizedNumbers, lastPhoneValueLength) => {
    if (normalizedNumbers.length === 0) {
      phonenumberInput.setSelectionRange(4, 4);
    }

    if (normalizedNumbers.length === 1) {
      phonenumberInput.setSelectionRange(5, 5);
    }

    if (normalizedNumbers.length === 2) {
      phonenumberInput.setSelectionRange(6, 6);
    }

    if (normalizedNumbers.length === 3) {
      const cursorPosition = lastPhoneValueLength < normalizedNumbers.length ? 9 : 7;
      phonenumberInput.setSelectionRange(cursorPosition, cursorPosition);
    }

    if (normalizedNumbers.length === 4) {
      phonenumberInput.setSelectionRange(10, 10);
    }

    if (normalizedNumbers.length === 5) {
      phonenumberInput.setSelectionRange(11, 11);
    }

    if (normalizedNumbers.length === 6) {
      const cursorPosition = lastPhoneValueLength < normalizedNumbers.length ? 15 : 12;
      phonenumberInput.setSelectionRange(cursorPosition, cursorPosition);
    }

    if (normalizedNumbers.length === 7) {
      phonenumberInput.setSelectionRange(16, 16);
    }

    if (normalizedNumbers.length === 8) {
      const cursorPosition = lastPhoneValueLength < normalizedNumbers.length ? 20 : 17;
      phonenumberInput.setSelectionRange(cursorPosition, cursorPosition);
    }

    if (normalizedNumbers.length === 9) {
      phonenumberInput.setSelectionRange(21, 21);
    }

    if (normalizedNumbers.length === 10) {
      phonenumberInput.setSelectionRange(22, 22);
    }
  };

  const renderPhonenumberInput = () => {
    phonenumberInput.value = state.form.fields.phonenumber.masked;
    const normalizedNumbers = state.form.fields.phonenumber.normalized;
    const { phonenumberLastInputLength } = state.uiState;
    handlePhonenumberCursor(normalizedNumbers, phonenumberLastInputLength);
  };

  phonenumberInput.addEventListener('input', (e) => {
    const rawValue = e.target.value;
    const normalizedNumbers = normalizeNumbers(rawValue);
    const maskedNumbers = addPhoneMask(normalizedNumbers);

    state.form.fields.phonenumber.masked = maskedNumbers;
    state.form.fields.phonenumber.normalized = normalizedNumbers;
    renderPhonenumberInput();
    state.uiState.phonenumberLastInputLength = normalizedNumbers.length;
  });

  clearFormButton.addEventListener('click', () => {
    state.uiState.shouldClearForm = true;
    state.form.errors = {};
    clearFormFields();
    renderForm();
    state.uiState.shouldClearForm = false;
  });

  renderHeader();
};

export default app;

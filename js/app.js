import validateForm from './validateForm.js';
import addPhoneMask from './addPhoneMask.js';
import renderForm from './renderForm.js';
import handlePhonenumberCursor from './handlePhonenumberCursor.js';
import renderHeader, { handleFixedHeader } from './header.js';

const app = () => {
  const header = document.querySelector('.header');
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const dateFromInput = document.querySelector('#date-from');
  const dateToInput = document.querySelector('#date-to');
  const clearFormButton = document.querySelector('.tour-creation__clear-button');
  const tourCreationForm = document.querySelector('.tour-creation__form');
  const phonenumberInput = document.querySelector('#phonenumber');
  const ageConfirmationYesEl = document.querySelector('#age-confirmation-yes');
  const ageConfirmationNoEl = document.querySelector('#age-confirmation-no');
  const agreementConfirmationCheckbox = document.querySelector('[name="agreement-confirmation"]');
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

  const handleInput = (field, event) => {
    state.form.fields[field] = event.target.value;
  };

  const normalizeNumbers = (rawNumbers) => {
    let numbers = rawNumbers.replace(/\D/g, '');

    if (numbers.startsWith('7') || numbers.startsWith('8')) {
      numbers = numbers.slice(1);
    }

    return numbers.slice(0, 10);
  };

  const renderPhonenumberInput = () => {
    phonenumberInput.value = state.form.fields.phonenumber.masked;
    const normalizedNumbers = state.form.fields.phonenumber.normalized;
    const { phonenumberLastInputLength } = state.uiState;
    handlePhonenumberCursor(normalizedNumbers, phonenumberLastInputLength, phonenumberInput);
  };

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

  const renderSelect = (event) => {
    if (state.form.fields.direction === '') {
      event.classList.remove('field__select--color-black');
      event.target.classList.add('field__select--color-gray');
    } else {
      event.target.classList.remove('field__select--color-gray');
      event.target.classList.add('field__select--color-black');
    }
  };

  nameInput.addEventListener('input', (e) => {
    handleInput('name', e);
  });

  emailInput.addEventListener('input', (e) => {
    handleInput('email', e);
  });

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

  directionSelect.addEventListener('change', (e) => {
    handleInput('direction', e);
    renderSelect(e);
  });

  tourCreationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedErrors = validateForm(state.form.fields);
    state.form.errors = { ...updatedErrors };
    state.form.isValid = Object.keys(updatedErrors).length === 0;

    if (state.form.isValid) {
      state.uiState.shouldClearForm = true;
      clearFormFields();
      renderForm(tourCreationForm, state);
      state.form.isValid = false;
      state.form.errors = {};
      state.uiState.shouldClearForm = false;
      toursSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    renderForm(tourCreationForm, state);
  });

  window.addEventListener('scroll', (e) => {
    const { lastScrollY, currentScrollY } = handleFixedHeader(state);
    state.uiState.lastScrollY = lastScrollY;
    state.uiState.currentScrollY = currentScrollY;
    renderHeader(state, header, fixedHeaderHeightAppearance, defaultHeaderHeight, e);
  });

  header.addEventListener('animationend', (e) => {
    const { lastScrollY, currentScrollY } = handleFixedHeader(state);
    state.uiState.lastScrollY = lastScrollY;
    state.uiState.currentScrollY = currentScrollY;
    renderHeader(state, header, fixedHeaderHeightAppearance, defaultHeaderHeight, e);
  });

  ageConfirmationYesEl.addEventListener('change', (e) => {
    if (e.target.checked) {
      state.form.fields.ageConfirmation = e.target.value;
    }
    renderForm(tourCreationForm, state);
  });

  ageConfirmationNoEl.addEventListener('change', (e) => {
    if (e.target.checked) {
      state.form.fields.ageConfirmation = e.target.value;
    }
    renderForm(tourCreationForm, state);
  });

  agreementConfirmationCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      state.form.fields.agreement = true;
    } else {
      state.form.fields.agreement = false;
    }
    renderForm(tourCreationForm, state);
  });

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
    renderForm(tourCreationForm, state);
    state.uiState.shouldClearForm = false;
  });

  renderHeader(state, header, fixedHeaderHeightAppearance, defaultHeaderHeight);
};

export default app;

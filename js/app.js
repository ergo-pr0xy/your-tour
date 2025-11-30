import validateForm from './validateForm.js';
import { addPhoneMask, normalizeNumbers } from './phoneMask.js';
import renderHeader, { handleFixedHeader } from './header.js';
import renderForm from './renderForm.js';

const app = () => {
  const fixedHeaderHeightAppearance = 450;
  const defaultHeaderHeight = 88;
  const maxPhonenumberMaskLength = 22;

  const elements = {
    header: document.querySelector('.header'),
    nameInput: document.querySelector('#name'),
    emailInput: document.querySelector('#email'),
    dateFromInput: document.querySelector('#date-from'),
    dateToInput: document.querySelector('#date-to'),
    clearFormButton: document.querySelector('.tour-creation__clear-button'),
    tourCreationForm: document.querySelector('.tour-creation__form'),
    phonenumberInput: document.querySelector('#phonenumber'),
    ageConfirmationYesEl: document.querySelector('#age-confirmation-yes'),
    ageConfirmationNoEl: document.querySelector('#age-confirmation-no'),
    ageConfirmationParentEl: document.querySelector('.tour-creaction__age-confirmation'),
    agreementConfirmationCheckbox: document.querySelector('[name="agreement-confirmation"]'),
    agreementConfirmationParentEl: document.querySelector('.tour-creation__agreement-confirmation'),
    toursSection: document.querySelector('#tours'),
    directionSelect: document.querySelector('select'),
    commentaryInput: document.querySelector('#comment'),
  };

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

  elements.nameInput.addEventListener('input', (e) => {
    handleInput('name', e);
  });

  elements.emailInput.addEventListener('input', (e) => {
    handleInput('email', e);
  });

  elements.dateFromInput.addEventListener('focus', (e) => {
    state.uiState.isDateFromInputFocused = true;
    renderForm(e, elements, state);
  });

  elements.dateFromInput.addEventListener('blur', (e) => {
    state.uiState.isDateFromInputFocused = false;
    renderForm(e, elements, state);
  });

  elements.dateToInput.addEventListener('focus', (e) => {
    state.uiState.isDateToInputFocused = true;
    renderForm(e, elements, state);
  });

  elements.dateToInput.addEventListener('blur', (e) => {
    state.uiState.isDateToInputFocused = false;
    renderForm(e, elements, state);
  });

  elements.dateFromInput.addEventListener('input', (e) => {
    handleInput('dateFrom', e);
  });

  elements.dateToInput.addEventListener('input', (e) => {
    handleInput('dateTo', e);
  });

  elements.directionSelect.addEventListener('change', (e) => {
    handleInput('direction', e);
    renderForm(e, elements, state);
  });

  elements.commentaryInput.addEventListener('input', (e) => {
    handleInput('commantary', e);
  });

  elements.tourCreationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedErrors = validateForm(state.form.fields);
    state.form.errors = { ...updatedErrors };
    state.form.isValid = Object.keys(updatedErrors).length === 0;

    if (state.form.isValid) {
      state.uiState.shouldClearForm = true;
      clearFormFields();
      renderForm(e, elements, state);
      elements.toursSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      state.form.isValid = false;
      state.form.errors = {};
      state.uiState.shouldClearForm = false;
      return;
    }
    renderForm(e, elements, state);
  });

  window.addEventListener('scroll', (e) => {
    const { lastScrollY, currentScrollY } = handleFixedHeader(state);
    state.uiState.lastScrollY = lastScrollY;
    state.uiState.currentScrollY = currentScrollY;
    renderHeader(state, elements.header, fixedHeaderHeightAppearance, defaultHeaderHeight, e);
  });

  elements.header.addEventListener('animationend', (e) => {
    const { lastScrollY, currentScrollY } = handleFixedHeader(state);
    state.uiState.lastScrollY = lastScrollY;
    state.uiState.currentScrollY = currentScrollY;
    renderHeader(state, elements.header, fixedHeaderHeightAppearance, defaultHeaderHeight, e);
  });

  elements.ageConfirmationYesEl.addEventListener('change', (e) => {
    if (e.target.checked) {
      state.form.fields.ageConfirmation = e.target.value;
    }
  });

  elements.ageConfirmationNoEl.addEventListener('change', (e) => {
    if (e.target.checked) {
      state.form.fields.ageConfirmation = e.target.value;
    }
  });

  elements.agreementConfirmationCheckbox.addEventListener('change', (e) => {
    state.form.fields.agreement = e.target.checked;
  });

  elements.phonenumberInput.addEventListener('input', (e) => {
    const rawValue = e.target.value;
    const normalizedNumbers = normalizeNumbers(rawValue.slice(0, maxPhonenumberMaskLength));
    const maskedNumbers = addPhoneMask(normalizedNumbers);

    state.form.fields.phonenumber.masked = maskedNumbers;
    state.form.fields.phonenumber.normalized = normalizedNumbers;
    renderForm(e, elements, state);
    state.uiState.phonenumberLastInputLength = normalizedNumbers.length;
  });

  elements.clearFormButton.addEventListener('click', (e) => {
    state.uiState.shouldClearForm = true;
    state.form.errors = {};
    clearFormFields();
    renderForm(e, elements, state);
    state.uiState.shouldClearForm = false;
  });

  renderHeader(state, elements.header, fixedHeaderHeightAppearance, defaultHeaderHeight);
};

export default app;

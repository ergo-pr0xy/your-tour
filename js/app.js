import addPhoneMask from './addPhoneMask.js';

const app = () => {
  const header = document.querySelector('.header');
  const dateInputs = document.querySelectorAll('.field__input-date');
  const clearFormButton = document.querySelector('.tour-creation__clear-button');
  const tourCreationForm = document.querySelector('.tour-creation__form');
  const telInput = document.querySelector('#phonenumber');
  const toursSection = document.querySelector('#tours');
  const select = document.querySelector('select');

  const today = new Date().toLocaleDateString('en-CA').slice(0, 10);
  const fixedHeaderHeightAppearance = 450;
  const defaultHeaderHeight = 88;
  const phonenumberLength = 11;
  let lastScrollY = window.scrollY;
  let lastDateInputLength = 0;
  let isAgeErrorShowed = false;

  const errors = {
    emptyInput: 'Данное поле обязательно для заполнения',
    nameLang: 'Имя должно быть написано буквами русского алфавита',
    emptyAgreement: 'Для продолжения необходимо принять условия договора',
    emptyAge: 'Необходимо подтверждение Вашего возраста',
    prohibitedAge: 'Вы должны быть старше 18 лет для участия в туре',
    incorrectEmail: 'Введите email согласно шаблону example@mail.com',
    phonenumberLength: 'Номер телефона должен состоять из 11 цифр',
  };

  const setMinDate = (input) => input.setAttribute('min', today);

  const clearDateInputs = () => {
    dateInputs.forEach((dateInput) => {
      dateInput.setAttribute('type', 'text');
    });
  };

  const clearSelect = () => {
    select.classList.remove('field__select--color-black');
    select.classList.add('field__select--color-gray');
  };

  const removeElementsWithError = () => {
    const formElementsWithError = document.querySelectorAll('[class*="error--"]');

    formElementsWithError.forEach((element) => {
      element.classList.remove('error--input', 'error--checkbox', 'error--radio');
    });
  };

  const removeErrorMessages = () => {
    const errorMessageElements = document.querySelectorAll('.error');
    isAgeErrorShowed = false;

    errorMessageElements.forEach((element) => {
      element.remove();
    });
  };

  const clearErrors = () => {
    removeElementsWithError();
    removeErrorMessages();
    isAgeErrorShowed = false;
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

    if (window.scrollY > fixedHeaderHeightAppearance) {
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

    lastScrollY = currentScrollY;
  };

  const hideFixedHeader = (event) => {
    if (event.animationName === 'disappear-header') {
      header.classList.remove('header--fixed');
    }
  };

  const handleSelect = (event) => {
    if (event.value === '') {
      event.target.classList.remove('field__select--color-black');
      event.target.classList.add('field__select--color-gray');
    } else {
      event.target.classList.remove('field__select--color-gray');
      event.target.classList.add('field__select--color-black');
    }
  };

  const showError = (element, errorType) => {
    let parentElement = element.parentNode;
    const errorElement = document.createElement('p');
    errorElement.classList.add('error');

    if (errorType === 'emptyInput') {
      errorElement.innerText = errors[errorType];
      parentElement.appendChild(errorElement);
      element.classList.add('error--input');
    }

    if (errorType === 'nameLang') {
      errorElement.innerText = errors[errorType];
      parentElement.appendChild(errorElement);
      element.classList.add('error--input');
    }

    if (errorType === 'incorrectEmail') {
      errorElement.innerText = errors[errorType];
      parentElement.appendChild(errorElement);
      element.classList.add('error--input');
    }

    if (errorType === 'emptyAgreement') {
      parentElement = document.querySelector('.tour-creation__agreement-confirmation');
      errorElement.innerText = errors[errorType];
      parentElement.appendChild(errorElement);
    }

    if (errorType === 'emptyAge') {
      parentElement = document.querySelector('.tour-creaction__age-confirmation');
      errorElement.innerText = errors[errorType];
      parentElement.appendChild(errorElement);
    }

    if (errorType === 'prohibitedAge') {
      parentElement = document.querySelector('.tour-creaction__age-confirmation');
      errorElement.innerText = errors[errorType];
      parentElement.appendChild(errorElement);
    }

    if (errorType === 'phonenumberLength') {
      errorElement.innerText = errors[errorType];
      parentElement.appendChild(errorElement);
      element.classList.add('error--input');
    }
  };

  const isAgeAgreementChecked = () => {
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    const checkedRadioInputs = Array.from(radioInputs).filter((item) => item.checked);
    const result = (checkedRadioInputs.length > 0);
    return result;
  };

  const validate = () => {
    let isValid = true;
    let errorType = '';
    removeElementsWithError();
    removeErrorMessages();

    const formElements = document.querySelectorAll('input, select');
    formElements.forEach((element) => {
      if (element.dataset.required) {
        if (!element.value) {
          errorType = 'emptyInput';
          showError(element, errorType);
          isValid = false;
          return;
        }

        if (element.type === 'radio') {
          if (!isAgeAgreementChecked() && !isAgeErrorShowed) {
            errorType = 'emptyAge';
            showError(element, errorType);
            isValid = false;
            isAgeErrorShowed = true;
            return;
          }

          if (element.checked && element.value === 'no') {
            errorType = 'prohibitedAge';
            showError(element, errorType);
            isValid = false;
          }
        }

        if (element.type === 'checkbox' && !element.checked) {
          errorType = 'emptyAgreement';
          showError(element, errorType);
          isValid = false;
        }
      }

      if (element.dataset.should === 'true') {
        const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailValidationPattern.test(element.value);
        if (!isValidEmail) {
          errorType = 'incorrectEmail';
          showError(element, errorType);
          isValid = false;
        }
      }

      if (element.dataset.nameLang === 'rus') {
        const rusLettersPattern = /^[а-яё]+$/i;
        const isCorrectNameLang = rusLettersPattern.test(element.value.trim());
        if (!isCorrectNameLang) {
          errorType = 'nameLang';
          showError(element, errorType);
          isValid = false;
        }
      }

      if (element.dataset.minLength === 'true') {
        const normalizedPhonenumber = element.value.replace(/\D/g, '');
        if (normalizedPhonenumber.length !== phonenumberLength) {
          errorType = 'phonenumberLength';
          showError(element, errorType);
        }
      }
    });

    return isValid;
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

  select.addEventListener('change', (event) => {
    handleSelect(event);
  });

  clearFormButton.addEventListener('click', () => {
    tourCreationForm.reset();
    clearDateInputs();
    clearSelect();
    clearErrors();
  });

  telInput.addEventListener('input', ({ target }) => {
    const cleanedNumbers = target.value.startsWith('+7') ? target.value.replace(/\D/g, '').slice(1) : target.value.replace(/\D/g, '');
    addPhoneMask(target, cleanedNumbers, lastDateInputLength);
    lastDateInputLength = cleanedNumbers.length;
  });

  tourCreationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validate()) {
      tourCreationForm.reset();
      clearDateInputs();
      clearSelect();
      toursSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
};

export default app;

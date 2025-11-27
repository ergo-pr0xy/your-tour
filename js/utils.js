export const removeElementsWithError = (form) => {
  const formElementsWithError = form.querySelectorAll('[class*="error--"]');

  formElementsWithError.forEach((element) => {
    element.classList.remove('error--input', 'error--checkbox', 'error--radio');
  });
};

export const removeErrorMessages = (form) => {
  const errorMessageElements = form.querySelectorAll('.error');

  errorMessageElements.forEach((element) => {
    element.remove();
  });
};

export const removeErrorElements = (form) => {
  removeElementsWithError(form);
  removeErrorMessages(form);
};

export const clearDirectionSelect = (directionSelect) => {
  directionSelect.classList.remove('field__select--color-black');
  directionSelect.classList.add('field__select--color-gray');
};

export const clearDateInputs = (form) => {
  const dateInputs = form.querySelectorAll('.field__input-date');

  dateInputs.forEach((dateInput) => {
    dateInput.setAttribute('type', 'text');
    dateInput.removeAttribute('min');
  });
};

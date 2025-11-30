import renderFormFullState from './renderFormFullState.js';
import { handlePhonenumberCursor } from './phoneMask.js';

const today = new Date().toLocaleDateString('en-CA').slice(0, 10);

const renderDateInput = (e, elements, state) => {
  const { dateFromInput, dateToInput } = elements;

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

const renderSelect = (e, state) => {
  if (state.form.fields.direction === '') {
    e.target.classList.remove('field__select--color-black');
    e.target.classList.add('field__select--color-gray');
  } else {
    e.target.classList.remove('field__select--color-gray');
    e.target.classList.add('field__select--color-black');
  }
};

const renderPhonenumberInput = (elements, state) => {
  const { phonenumberInput } = elements;
  phonenumberInput.value = state.form.fields.phonenumber.masked;
  const normalizedNumbers = state.form.fields.phonenumber.normalized;
  const { phonenumberLastInputLength } = state.uiState;
  handlePhonenumberCursor(
    normalizedNumbers,
    phonenumberLastInputLength,
    phonenumberInput,
  );
};

const renderForm = (e, elements, state) => {
  switch (e.target.name) {
    case ('date-from'): {
      renderDateInput(e, elements, state);
      return;
    }
    case ('date-to'): {
      renderDateInput(e, elements, state);
      return;
    }
    case ('direction'): {
      renderSelect(e, state);
      return;
    }
    case ('phonenumber'): {
      renderPhonenumberInput(elements, state);
      return;
    }
    default: renderFormFullState(elements, state);
  }
};

export default renderForm;

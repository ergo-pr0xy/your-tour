import {
  clearDirectionSelect,
  clearDateInputs,
  removeErrorElements,
} from './utils.js';

const renderForm = (formEl, state) => {
  removeErrorElements(formEl);

  const nameInput = formEl.querySelector('#name');
  const emailInput = formEl.querySelector('#email');
  const dateFromInput = formEl.querySelector('#date-from');
  const dateToInput = formEl.querySelector('#date-to');
  const phonenumberInput = formEl.querySelector('#phonenumber');
  const ageConfirmationYesEl = formEl.querySelector('#age-confirmation-yes');
  const ageConfirmationNoEl = formEl.querySelector('#age-confirmation-no');
  const ageConfirmationParentEl = formEl.querySelector('.tour-creaction__age-confirmation');
  const agreementConfirmationCheckbox = formEl.querySelector('[name="agreement-confirmation"]');
  const agreementConfirmationParentEl = formEl.querySelector('.tour-creation__agreement-confirmation');
  const directionSelect = formEl.querySelector('select');

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
    clearDateInputs(formEl);
    clearDirectionSelect(directionSelect);
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

export default renderForm;

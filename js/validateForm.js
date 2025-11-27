const validateForm = (fields) => {
  const formFieldsEntries = Object.entries(fields);

  const errors = formFieldsEntries.reduce((errorsAcc, [key, value]) => {
    const newErrors = { ...errorsAcc };

    if (key === 'name') {
      const nameValidationPattern = /^[а-яё\s]+$/i;

      if (value === '') {
        newErrors.name = 'emptyInput';
      } else if (!nameValidationPattern.test(value)) {
        newErrors.name = 'nameLang';
      }
    }

    if (key === 'email') {
      const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (value === '') {
        newErrors.email = 'emptyInput';
      } else if (!emailValidationPattern.test(value)) {
        newErrors.email = 'incorrectEmail';
      }
    }

    if (key === 'direction') {
      if (value === '') {
        newErrors.direction = 'emptyInput';
      }
    }

    if (key === 'dateFrom') {
      if (value === '') {
        newErrors.dateFrom = 'emptyInput';
      }
    }

    if (key === 'dateTo') {
      if (value === '') {
        newErrors.dateTo = 'emptyInput';
      }
    }

    if (key === 'ageConfirmation') {
      if (value === null) {
        newErrors.ageConfirmation = 'emptyAge';
      }

      if (value === 'no') {
        newErrors.ageConfirmation = 'prohibitedAge';
      }
    }

    if (key === 'agreement') {
      if (value === false) {
        newErrors.agreement = 'emptyAgreement';
      }
    }

    if (key === 'phonenumber') {
      if (value.masked === '') {
        console.log(value);
        newErrors.phonenumber = 'emptyInput';
      }

      if (!(value.masked === '') && value.normalized.length < 10) {
        newErrors.phonenumber = 'phonenumberLength';
      }
    }
    return newErrors;
  }, {});

  return errors;
};

export default validateForm;

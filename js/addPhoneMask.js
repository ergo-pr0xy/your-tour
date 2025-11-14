const addPhoneMask = (input, cleanedNumbers, lastInputLength) => {
  const maxLength = 10;

  if (cleanedNumbers.length === 0) {
    input.value = '';
  }

  if (cleanedNumbers.length === 1) {
    input.value = `+7 (${cleanedNumbers}_ _ ) _ _ _ - _ _ - _ _`;
    input.setSelectionRange(5, 5);
  }

  if (cleanedNumbers.length === 2) {
    input.value = `+7 (${cleanedNumbers}_ ) _ _ _ - _ _ - _ _`;
    input.setSelectionRange(6, 6);
  }

  if (cleanedNumbers.length === 3) {
    input.value = `+7 (${cleanedNumbers}) _ _ _ - _ _ - _ _`;
    const cursorPosition = lastInputLength < cleanedNumbers.length ? 9 : 7;
    input.setSelectionRange(cursorPosition, cursorPosition);
  }

  if (cleanedNumbers.length === 4) {
    input.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3)}_ _ - _ _ - _ _`;
    input.setSelectionRange(10, 10);
  }

  if (cleanedNumbers.length === 5) {
    input.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3)}_ - _ _ - _ _`;
    input.setSelectionRange(11, 11);
  }

  if (cleanedNumbers.length === 6) {
    input.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3)} - _ _ - _ _`;

    const cursorPosition = lastInputLength < cleanedNumbers.length ? 15 : 12;
    input.setSelectionRange(cursorPosition, cursorPosition);
  }

  if (cleanedNumbers.length === 7) {
    input.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3, 6)} - ${cleanedNumbers.slice(6)}_ - _ _`;
    input.setSelectionRange(16, 16);
  }

  if (cleanedNumbers.length === 8) {
    input.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3, 6)} - ${cleanedNumbers.slice(6)} - _ _`;

    const cursorPosition = lastInputLength < cleanedNumbers.length ? 20 : 17;
    input.setSelectionRange(cursorPosition, cursorPosition);
  }

  if (cleanedNumbers.length === 9) {
    input.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3, 6)} - ${cleanedNumbers.slice(6, 8)} - ${cleanedNumbers.slice(8)}_`;
    input.setSelectionRange(21, 21);
  }

  if (cleanedNumbers.length === maxLength) {
    input.setAttribute('maxlength', '22');
    input.value = `+7 (${cleanedNumbers.slice(0, 3)}) ${cleanedNumbers.slice(3, 6)} - ${cleanedNumbers.slice(6, 8)} - ${cleanedNumbers.slice(8)}`;
    input.setSelectionRange(22, 22);
  } else {
    input.setAttribute('maxlength', '30');
  }
};

export default addPhoneMask;

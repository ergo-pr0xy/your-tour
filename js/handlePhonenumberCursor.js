const handlePhonenumberCursor = (normalizedNumbers, lastPhoneValueLength, phonenumberInput) => {
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

export default handlePhonenumberCursor;

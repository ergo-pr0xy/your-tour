export const addPhoneMask = (numbers) => {
  switch (numbers.length) {
    case 0: return '+7 (_ _ _) _ _ _ - _ _ - _ _';
    case 1: return `+7 (${numbers}__) _ _ _ - _ _ - _ _`;
    case 2: return `+7 (${numbers}_) _ _ _ - _ _ - _ _`;
    case 3: return `+7 (${numbers}) _ _ _ - _ _ - _ _`;
    case 4: return `+7 (${numbers.slice(0, 3)}) ${numbers[3]}__ - _ _ - _ _`;
    case 5: return `+7 (${numbers.slice(0, 3)}) ${numbers.slice(3, 5)}_ - _ _ - _ _`;
    case 6: return `+7 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)} - _ _ - _ _`;
    case 7: return `+7 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)} - ${numbers[6]}_ - _ _`;
    case 8: return `+7 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)} - ${numbers.slice(6, 8)} - __`;
    case 9: return `+7 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)} - ${numbers.slice(6, 8)} - ${numbers[8]}_`;
    default: return `+7 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)} - ${numbers.slice(6, 8)} - ${numbers.slice(8, 10)}`;
  }
};

export const handlePhonenumberCursor = (
  normalizedNumbers,
  lastPhoneValueLength,
  phonenumberInput,
) => {
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

export const normalizeNumbers = (rawNumbers) => {
  let numbers = rawNumbers.replace(/\D/g, '');

  if (numbers.startsWith('7') || numbers.startsWith('8')) {
    numbers = numbers.slice(1);
  }

  return numbers;
};

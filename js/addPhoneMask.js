const addPhoneMask = (numbers) => {
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

export default addPhoneMask;

export const generateRandomPhoneNumbers = (
  min: number = 900,
  max: number = 1200
): string[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const phoneNumbers: string[] = [];

  for (let i = 0; i < count; i++) {
    const number = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    phoneNumbers.push(number);
  }

  return phoneNumbers;
};

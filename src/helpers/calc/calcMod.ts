const calcMod10 = (number: string): number => {
  let i;
  let mult = 2;
  let sum = 0;
  let s = '';

  for (i = number.length - 1; i >= 0; i--) {
    s = mult * parseInt(number.charAt(i)) + s;
    if (--mult < 1) {
      mult = 2;
    }
  }
  for (i = 0; i < s.length; i++) {
    sum = sum + parseInt(s.charAt(i));
  }
  sum = sum % 10;
  if (sum != 0) {
    sum = 10 - sum;
  }
  return sum;
};

const calcMod11 = (number: string): number => {
  const sequence = [4, 3, 2, 9, 8, 7, 6, 5];
  let digit = 0;
  let j = 0;
  let DAC = 0;

  for (let i = 0; i < number.length; i++) {
    const mult = sequence[j];
    j++;
    j %= sequence.length;
    digit += mult * parseInt(number.charAt(i));
  }

  DAC = digit % 11;

  if (DAC == 0 || DAC == 1) return 0;
  if (DAC == 10) return 1;

  return 11 - DAC;
};

export { calcMod10, calcMod11 };

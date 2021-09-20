import { calcMod10, calcMod11 } from './calcMod';

const calcValidatorDigit = (barCode: string, codePos: number, mod: number): number | undefined => {
  let cleanBarCode = barCode.replace(/[^0-9]/g, '');

  let codeSplit = [];

  codeSplit = barCode.split('');
  codeSplit.splice(codePos, 1);
  cleanBarCode = codeSplit.join('');

  if (mod === 10) {
    return calcMod10(cleanBarCode);
  } else if (mod === 11) {
    return calcMod11(cleanBarCode);
  }
};

export default calcValidatorDigit;

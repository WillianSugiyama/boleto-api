import { BarCodeType } from '../enums/barCodeType';
import { BoletoType } from '../enums/boletoType';
import getBoletoType from './getBoletoType';
import { calcMod10, calcMod11 } from './calc/calcMod';
import { isEqual } from 'lodash';
import getReference from './getReference';
import calcValidatorDigit from './calc/calcValidatorDigit';

const validateBarCodeWithValidatioDigit = (barCode: string, barCodeType: BarCodeType): boolean => {
  const cleanBarCode = barCode.replace(/[^0-9]/g, '');
  let boletoType;
  let result;
  const barCodeBlock = [];

  if (barCodeType === BarCodeType.DIGITABLE_LINE) {
    boletoType = getBoletoType(cleanBarCode);

    if (boletoType === BoletoType.BANK || BoletoType.CREDIT_CARD) {
      barCodeBlock.push(+cleanBarCode.substr(0, 9), +calcMod10(cleanBarCode.substr(0, 9)));
      barCodeBlock.push(+cleanBarCode.substr(10, 10), +calcMod10(cleanBarCode.substr(10, 10)));
      barCodeBlock.push(+cleanBarCode.substr(21, 10), +calcMod10(cleanBarCode.substr(21, 10)));
      barCodeBlock.push(+cleanBarCode.substr(32, 1));
      barCodeBlock.push(+cleanBarCode.substr(33));

      result = barCodeBlock.reduce((prev, curr) => prev + curr).toString();
    } else {
      const getValueOrReference = getReference(cleanBarCode);

      if (getValueOrReference?.mod === 10) {
        barCodeBlock.push(+cleanBarCode.substr(0, 11), +calcMod10(cleanBarCode.substr(0, 11)));
        barCodeBlock.push(+cleanBarCode.substr(12, 11), +calcMod10(cleanBarCode.substr(12, 11)));
        barCodeBlock.push(+cleanBarCode.substr(24, 11), +calcMod10(cleanBarCode.substr(24, 11)));
        barCodeBlock.push(+cleanBarCode.substr(36, 11), +calcMod10(cleanBarCode.substr(36, 11)));
      } else if (getValueOrReference?.mod === 11) {
        const digitValidators = [];
        barCodeBlock.push(+cleanBarCode.substr(0, 11));
        barCodeBlock.push(+cleanBarCode.substr(12, 11));
        barCodeBlock.push(+cleanBarCode.substr(24, 11));
        barCodeBlock.push(+cleanBarCode.substr(36, 11));

        digitValidators.push(parseInt(cleanBarCode.substr(11, 1)));
        digitValidators.push(parseInt(cleanBarCode.substr(23, 1)));
        digitValidators.push(parseInt(cleanBarCode.substr(35, 1)));
        digitValidators.push(parseInt(cleanBarCode.substr(47, 1)));

        const barCodeCalculed = barCodeBlock.map((barCode) => {
          calcMod11(barCode.toString());
        });

        return isEqual(barCodeCalculed, digitValidators);
      }

      result = barCodeBlock.reduce((prev, curr) => prev + curr).toString();
    }
  } else if (barCodeType === BarCodeType.BARCODE) {
    boletoType = getBoletoType(cleanBarCode);

    if (boletoType === BoletoType.BANK || BoletoType.CREDIT_CARD) {
      const validatorDigit = calcValidatorDigit(cleanBarCode, 4, 11);
      result = cleanBarCode.substr(0, 4) + validatorDigit + cleanBarCode.substr(5);
    } else {
      const getValueOrReference = getReference(cleanBarCode);

      const finalResult = cleanBarCode.split('').splice(3, 1).join('');

      if (getValueOrReference) {
        const validatorDigit = calcValidatorDigit(cleanBarCode, 3, getValueOrReference.mod);
        result = finalResult.substr(0, 3) + validatorDigit + finalResult.substr(3);
      }
    }
  }

  return result === cleanBarCode;
};

export default validateBarCodeWithValidatioDigit;

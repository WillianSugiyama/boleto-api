import { BarCodeType } from '../enums/barCodeType';
import { BoletoType } from '../enums/boletoType';
import getBarCodeCollectionValue from './getBarCodeCollectionValue';
import getBoletoType from './getBoletoType';
import substringReplace from './strings/substringReplace';

const getValue = (barCode: string, barCodeType: BarCodeType): number => {
  const boletoType = getBoletoType(barCode);

  let boletoValue = '';
  let finalValue;

  if (barCodeType === BarCodeType.BARCODE) {
    if (boletoType === BoletoType.BANK || boletoType === BoletoType.CREDIT_CARD) {
      boletoValue = barCode.substr(9, 10);
      finalValue = boletoValue.substr(0, 8) + '.' + boletoValue.substr(8, 2);

      let char = finalValue.substr(1, 1);
      while (char === '0') {
        finalValue = substringReplace(finalValue, '', 0, 1);
        char = finalValue.substr(1, 1);
      }
    } else {
      finalValue = getBarCodeCollectionValue(barCode, BarCodeType.BARCODE);
    }
  } else if (barCodeType === BarCodeType.DIGITABLE_LINE) {
    if (boletoType === BoletoType.BANK || boletoType === BoletoType.CREDIT_CARD) {
      boletoValue = barCode.substr(37);
      finalValue = boletoValue.substr(0, 8) + '.' + boletoValue.substr(8, 2);

      let char = finalValue.substr(1, 1);
      while (char === '0') {
        finalValue = substringReplace(finalValue, '', 0, 1);
        char = finalValue.substr(1, 1);
      }
    } else {
      finalValue = getBarCodeCollectionValue(barCode, BarCodeType.DIGITABLE_LINE);
    }
  } else {
    return 0.0;
  }

  return parseFloat(finalValue);
};

export default getValue;

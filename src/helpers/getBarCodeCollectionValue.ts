import { BarCodeType } from '../enums/barCodeType';
import substringReplace from './strings/substringReplace';
import GetReference from './getReference';

const getBarCodeCollectionValue = (barCode: string, barCodeType: BarCodeType): string => {
  const cleanBarCode = barCode.replace(/[^0-9]/g, '');
  const reference = GetReference(barCode);

  let boletoValue: string | string[] = '';
  let finalValue;

  if (reference?.effective !== undefined) {
    if (barCodeType === BarCodeType.DIGITABLE_LINE) {
      boletoValue = cleanBarCode.substr(4, 14);
      boletoValue = cleanBarCode.split('');
      boletoValue.splice(11, 1);
      boletoValue = boletoValue.join('');
      boletoValue = boletoValue.substr(4, 11);
    } else if (barCodeType === BarCodeType.BARCODE) {
      boletoValue = cleanBarCode.substr(4, 11);
    }

    finalValue = boletoValue.substr(0, 9) + '. ' + boletoValue.substr(9, 2);

    let char = finalValue.substr(1, 1);

    while (char === '0') {
      finalValue = substringReplace(finalValue, '', 0, 1);
      char = finalValue.substr(1, 1);
    }
  } else {
    finalValue = '0';
  }

  return finalValue;
};

export default getBarCodeCollectionValue;

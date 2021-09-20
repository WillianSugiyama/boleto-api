import { BarCodeType } from '../enums/barCodeType';

const getBarCodeType = (barCode: string): BarCodeType => {
  const cleanBarCode = barCode.replace(/[^0-9]/g, '');

  if (cleanBarCode.length === 44) {
    return BarCodeType.BARCODE;
  }
  if (cleanBarCode.length === 46 || cleanBarCode.length === 47 || cleanBarCode.length === 48) {
    return BarCodeType.DIGITABLE_LINE;
  } else {
    return BarCodeType.INCORRECT_BARCODE;
  }
};

export default getBarCodeType;

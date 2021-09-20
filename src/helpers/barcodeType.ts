import { BarCodeType } from '../enums/barcodeType';

const getBarCodeType = (code: string): BarCodeType => {
  const cleanBarCode = code.replace(/[^0-9]/g, '');

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

import getBarCodeType from '../helpers/getBarCodeType';
import getBoletoDate from '../helpers/getBoletoDate';
import getValue from '../helpers/getValue';
import validateBarCodeWithValidatioDigit from '../helpers/validateCodeWithDigit';

interface Result {
  statusCode: number;
  message: string;
  success: boolean;
  barCode?: string;
  date?: Date;
  value?: number;
}

const validateBoleto = (barCode: string): Result => {
  const cleanBarCode = barCode.replace(/[^0-9]/g, '');
  const barCodeType = getBarCodeType(cleanBarCode);

  let barCodePlusDigits = cleanBarCode;

  if (cleanBarCode.length === 36) {
    barCodePlusDigits = barCodePlusDigits + '00000000000';
  } else if (cleanBarCode.length === 36) {
    barCodePlusDigits = barCodePlusDigits + '0';
  }

  if (
    barCodePlusDigits.length != 44 &&
    barCodePlusDigits.length != 46 &&
    barCodePlusDigits.length != 47 &&
    barCodePlusDigits.length != 48
  ) {
    return {
      message: 'Number of characters are invalid',
      statusCode: 400,
      success: false,
    };
  } else if (
    (barCodePlusDigits.substr(0, 1) === '8' && barCodePlusDigits.length === 46) ||
    (barCodePlusDigits.substr(0, 1) === '8' && barCodePlusDigits.length === 47)
  ) {
    return {
      message: 'Number of characters are invalid',
      statusCode: 400,
      success: false,
    };
  } else if (!validateBarCodeWithValidatioDigit(barCodePlusDigits, barCodeType)) {
    return {
      message: 'Validation digit error',
      statusCode: 400,
      success: false,
    };
  } else {
    return {
      barCode: barCodePlusDigits,
      date: getBoletoDate(barCode, barCodeType),
      message: 'Boleta are valid!',
      statusCode: 200,
      success: true,
      value: getValue(barCode, barCodeType),
    };
  }
};

export default validateBoleto;

import GetBoletoType from './getBoletoType';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { BoletoType } from '../enums/boletoType';
import { BarCodeType } from '../enums/barCodeType';

dayjs.extend(utc);
dayjs.extend(timezone);

const getBoletoDate = (barCode: string, barCodeType: BarCodeType): Date => {
  const cleanBarCode = barCode.replace(/[^0-9]/g, '');
  const boletoType = GetBoletoType(cleanBarCode);

  let dateFactor = '';
  const boletoDate = dayjs.tz('1997-10-07 20:54:59.000', 'America/Sao_Paulo');

  if (barCodeType === BarCodeType.DIGITABLE_LINE) {
    if (boletoType === BoletoType.BANK || boletoType === BoletoType.CREDIT_CARD) {
      dateFactor = cleanBarCode.substr(33, 4);
    } else {
      dateFactor = '0';
    }
  } else if (barCodeType === BarCodeType.BARCODE) {
    if (boletoType === BoletoType.BANK || boletoType === BoletoType.CREDIT_CARD) {
      dateFactor = cleanBarCode.substr(5, 4);
    } else {
      dateFactor = '0';
    }
  }

  const boletoDatePlusDays = boletoDate.add(Number(dateFactor), 'days');

  return boletoDatePlusDays.toDate();
};

export default getBoletoDate;

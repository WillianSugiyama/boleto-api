import { BoletoType } from '../enums/boletoType';

const getBoletoType = (barCode: string): BoletoType | undefined => {
  const cleanBarCode = barCode.replace(/[^0-9]/g, '');

  if (cleanBarCode.substr(-14) == '00000000000000' || cleanBarCode.substr(5, 14) == '00000000000000') {
    return BoletoType.CREDIT_CARD;
  } else if (cleanBarCode.substr(0, 1) == '8') {
    if (cleanBarCode.substr(1, 1) == '1') {
      return BoletoType.COLLECTION_TOWN_HALL;
    } else if (cleanBarCode.substr(1, 1) == '2') {
      return BoletoType.COVENANT_SANITATION;
    } else if (cleanBarCode.substr(1, 1) == '3') {
      return BoletoType.COVENANT_ELECTRICITY_AND_GAS;
    } else if (cleanBarCode.substr(1, 1) == '4') {
      return BoletoType.COVENANT_SANITATION;
    } else if (cleanBarCode.substr(1, 1) == '5') {
      return BoletoType.COLLECTION_GOVERNMENT_AGENCIES;
    } else if (cleanBarCode.substr(1, 1) == '6' || cleanBarCode.substr(1, 1) == '9') {
      return BoletoType.OTHERS;
    } else if (cleanBarCode.substr(1, 1) == '7') {
      return BoletoType.COLLECTION_TRANSIT_FEE;
    }
  } else {
    return BoletoType.BANK;
  }
};

export default getBoletoType;

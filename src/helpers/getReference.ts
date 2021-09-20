interface Reference {
  mod: number;
  effective: boolean;
}

const getReference = (barCode: string): Reference | undefined => {
  const cleanBarCode = barCode.replace(/[^0-9]/g, '');
  const reference = cleanBarCode.substr(2, 1);

  switch (reference) {
    case '6':
      return {
        effective: true,
        mod: 10,
      };
    case '7':
      return {
        effective: false,
        mod: 10,
      };
    case '8':
      return {
        effective: true,
        mod: 11,
      };
    case '9':
      return {
        effective: false,
        mod: 11,
      };
    default:
      break;
  }
};

export default getReference;

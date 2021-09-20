import { Request, Response } from 'express';
import validateBoleto from '../services/boleto.service';

const validateBoletoRequest = (req: Request, res: Response): Response => {
  const { barCode } = req.params;
  const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;

  if (!regex.test(req.params.barCode)) {
    return res.status(400).json({
      message: 'Invalid barcode, send without special characters',
    });
  }

  const validateBoletoService = validateBoleto(barCode);

  return res.status(validateBoletoService.statusCode).send(validateBoletoService);
};

export default validateBoletoRequest;

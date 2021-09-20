import express from 'express';
import validateBoletoRequest from '../controllers/boleto.controller';

const router = express.Router();

router.get('/boleto/:barCode', validateBoletoRequest);

export default router;

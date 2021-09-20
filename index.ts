import express, { Application, Request, Response } from 'express';
import boletoRoute from './src/routes/boleto.routes';

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: 'Hello World!',
  });
});

app.use('/', boletoRoute);

app.listen(port, (): void => {
  // eslint-disable-next-line no-console
  console.log(`Connected successfully on port ${port}`);
});

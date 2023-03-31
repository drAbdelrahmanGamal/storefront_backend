import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import usersRouter from './handlers/users';
import productsRouter from './handlers/products';
import ordersRouter from './handlers/orders';

const app: express.Application = express();
const port: number = 3000;

const corsOptions: CorsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 || 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

usersRouter(app);
productsRouter(app);
ordersRouter(app);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

export default app;

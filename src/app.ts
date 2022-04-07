import * as dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import { loggerMiddleware, errorHandlerMiddleware } from './middlewares';
import connect from './db/connect';
import routes from './routes';
import Logger from '../utils/logger';
import { authStrategy } from './middlewares/auth.middleware';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors({ origin: '*' })); /* NEW */

app.use(loggerMiddleware);

if (!process.env.PORT) {
  process.exit(0);
}

authStrategy(passport);

app.use(express.json());
app.use('/api/v1', routes);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  Logger.info(`Server started running on port ${process.env.PORT}`);
  connect();
});

import * as dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import cors from 'cors';
import { errorHandler } from './utils/middlewares/error-handler';
import { signUpRouter } from './routes/sign-up';

const app = express();

app.use(cors());
app.use(json());

app.use('/api/v1/auth', signUpRouter);

app.use(errorHandler);

export { app };

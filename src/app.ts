import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env.development' });
import express, { json } from 'express';
import cors from 'cors';
import { errorHandler, decodeAuthHeader } from './utils/middlewares';
import { updateProfileRouter, signInRouter, signUpRouter } from './routes';

const app = express();

app.use(cors());
app.use(json());

app.use('/api/v1/auth', [signInRouter, signUpRouter]);
app.use('/api/v1/user', decodeAuthHeader, [updateProfileRouter]);

app.use(errorHandler);

export { app };

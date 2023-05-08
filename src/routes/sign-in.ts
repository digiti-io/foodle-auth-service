import { Router } from 'express';
import { validateEmail } from '../utils/sign-in';
import signIn from '../handlers/sign-in';

const router = Router();

router.post('/sign-in', [validateEmail], signIn);

export { router as signInRouter };

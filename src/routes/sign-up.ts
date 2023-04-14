import { Router } from 'express';
import { validateEmail, validatePassword } from '../utils/sign-up';
import signUp from '../handlers/sign-up';

const router = Router();

router.post('/signup', [validateEmail, validatePassword], signUp);

export { router as signUpRouter };

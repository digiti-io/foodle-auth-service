import { Router } from 'express';
import updateProfile from '../handlers/update-profile';

const router = Router();

router.post('/update-profile', updateProfile);

export { router as updateProfileRouter };

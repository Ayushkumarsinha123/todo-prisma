import { Router } from 'express';
import { signup } from '../controllers/user.controller.js';
import { validate } from '../middleware/validate.js';
import { SignupSchema } from '../schema/index.js';

const router = Router();


router.post('/signup', validate(SignupSchema), signup);

export default router;
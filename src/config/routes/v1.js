import { Router } from 'express';
import authRoute from '../../api/user/routes/routes.auth';

const router = Router();

router.use('/auth', authRoute);

export default router;

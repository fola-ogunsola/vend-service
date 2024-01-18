import { Router } from 'express';
import vendRoute from '../../src/api/user/routes/routes.auth'

const router = Router();

router.use('/vend', vendRoute)



export default router;
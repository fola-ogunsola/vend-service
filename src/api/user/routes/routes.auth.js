import { Router } from 'express';
import Model from '../middlewares/middlewares.model';
import Schema  from '../../../lib/schema/lib.schema.vend';
import * as AuthMiddleware from '../middlewares/index';

const router = Router();

router.post('/service', 
  Model(Schema.processVending, 'payload'),
  AuthMiddleware.checkSecurityCode,
  AuthMiddleware.checkUniqueRefNum,
  AuthMiddleware.validateVendRequest
);

export default router;

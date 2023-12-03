import { Router } from 'express';
import { createUser, findAllUser } from './users.service';

const router = Router();

router.post('/', createUser);
router.get('/', findAllUser);

export default router;
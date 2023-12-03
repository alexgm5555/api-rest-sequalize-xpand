import { Router } from 'express';
import {
  createNote,
  deleteOneNote,
  findNote,
  updateOneNote
} from './notes.service';

const router = Router();

router.post('/', createNote);
router.get('/', findNote);
router.delete('/', deleteOneNote);
router.patch('/', updateOneNote);

export default router;
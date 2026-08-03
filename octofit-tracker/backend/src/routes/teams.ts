import { Router } from 'express';
import { Team } from '../models/Team';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const teams = await Team.find().populate('captain', 'username displayName').populate('members', 'username displayName').sort({ name: 1 }).lean();
    res.json({ teams });
  } catch (error) {
    next(error);
  }
});

export default router;
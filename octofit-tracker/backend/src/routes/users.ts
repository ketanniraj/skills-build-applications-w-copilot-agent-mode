import { Router } from 'express';
import { User } from '../models/User';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ displayName: 1 }).lean();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

export default router;
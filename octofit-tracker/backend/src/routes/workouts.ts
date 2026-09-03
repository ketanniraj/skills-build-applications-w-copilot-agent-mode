import { Router } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().populate('recommendedFor', 'username displayName').sort({ difficulty: 1, title: 1 }).lean();
    res.json({ workouts });
  } catch (error) {
    next(error);
  }
});

export default router;
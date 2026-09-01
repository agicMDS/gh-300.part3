import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

/**
 * GET /api/workouts - Fetch all workouts
 */
router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('user');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

/**
 * GET /api/workouts/:id - Fetch a specific workout
 */
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('user');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

/**
 * POST /api/workouts - Create a new workout
 */
router.post('/', async (req, res) => {
  try {
    const { user, name, description, exercises, difficulty, duration } = req.body;

    if (!user || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newWorkout = new Workout({
      _id: new (require('mongoose')).Types.ObjectId(),
      user,
      name,
      description,
      exercises,
      difficulty: difficulty || 'beginner',
      duration,
    });

    const savedWorkout = await newWorkout.save();
    const populatedWorkout = await savedWorkout.populate('user');
    res.status(201).json(populatedWorkout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

export default router;

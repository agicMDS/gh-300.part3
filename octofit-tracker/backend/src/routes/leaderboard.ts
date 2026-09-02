import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

/**
 * GET /api/leaderboard - Fetch leaderboard sorted by rank
 */
router.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user')
      .populate('team')
      .sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

/**
 * GET /api/leaderboard/:id - Fetch a specific leaderboard entry
 */
router.get('/:id', async (req, res) => {
  try {
    const entry = await Leaderboard.findById(req.params.id)
      .populate('user')
      .populate('team');
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

/**
 * GET /api/leaderboard/team/:teamId - Fetch leaderboard for a specific team
 */
router.get('/team/:teamId', async (req, res) => {
  try {
    const entries = await Leaderboard.find({ team: req.params.teamId })
      .populate('user')
      .sort({ rank: 1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

export default router;

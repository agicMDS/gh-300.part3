import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

/**
 * GET /api/teams - Fetch all teams
 */
router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('leader').populate('members');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

/**
 * GET /api/teams/:id - Fetch a specific team
 */
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('leader').populate('members');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

/**
 * POST /api/teams - Create a new team
 */
router.post('/', async (req, res) => {
  try {
    const { name, description, leader } = req.body;

    if (!name || !leader) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTeam = new Team({
      _id: new (require('mongoose')).Types.ObjectId(),
      name,
      description,
      leader,
      members: [leader],
    });

    const savedTeam = await newTeam.save();
    const doc = await Team.findById(savedTeam._id).populate('leader').populate('members');
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
});

export default router;

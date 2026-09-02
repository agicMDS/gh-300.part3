"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
/**
 * GET /api/teams - Fetch all teams
 */
router.get('/', async (_req, res) => {
    try {
        const teams = await Team_1.default.find().populate('leader').populate('members');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
/**
 * GET /api/teams/:id - Fetch a specific team
 */
router.get('/:id', async (req, res) => {
    try {
        const team = await Team_1.default.findById(req.params.id).populate('leader').populate('members');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    }
    catch (error) {
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
        const newTeam = new Team_1.default({
            _id: new (require('mongoose')).Types.ObjectId(),
            name,
            description,
            leader,
            members: [leader],
        });
        const savedTeam = await newTeam.save();
        const doc = await Team_1.default.findById(savedTeam._id).populate('leader').populate('members');
        res.status(201).json(doc);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create team' });
    }
});
exports.default = router;

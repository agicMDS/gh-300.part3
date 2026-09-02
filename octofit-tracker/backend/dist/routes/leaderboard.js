"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
/**
 * GET /api/leaderboard - Fetch leaderboard sorted by rank
 */
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find()
            .populate('user')
            .populate('team')
            .sort({ rank: 1 });
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
/**
 * GET /api/leaderboard/:id - Fetch a specific leaderboard entry
 */
router.get('/:id', async (req, res) => {
    try {
        const entry = await Leaderboard_1.default.findById(req.params.id)
            .populate('user')
            .populate('team');
        if (!entry) {
            return res.status(404).json({ error: 'Leaderboard entry not found' });
        }
        res.json(entry);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
    }
});
/**
 * GET /api/leaderboard/team/:teamId - Fetch leaderboard for a specific team
 */
router.get('/team/:teamId', async (req, res) => {
    try {
        const entries = await Leaderboard_1.default.find({ team: req.params.teamId })
            .populate('user')
            .sort({ rank: 1 });
        res.json(entries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
exports.default = router;

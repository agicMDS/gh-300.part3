"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
/**
 * GET /api/activities - Fetch all activities
 */
router.get('/', async (_req, res) => {
    try {
        const activities = await Activity_1.default.find().populate('user');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
/**
 * GET /api/activities/:id - Fetch a specific activity
 */
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.default.findById(req.params.id).populate('user');
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});
/**
 * POST /api/activities - Create a new activity
 */
router.post('/', async (req, res) => {
    try {
        const { user, type, duration, distance, calories, date } = req.body;
        if (!user || !type || !duration) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newActivity = new Activity_1.default({
            _id: new (require('mongoose')).Types.ObjectId(),
            user,
            type,
            duration,
            distance,
            calories,
            date: date || new Date(),
        });
        const savedActivity = await newActivity.save();
        const populatedActivity = await savedActivity.populate('user');
        res.status(201).json(populatedActivity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create activity' });
    }
});
exports.default = router;

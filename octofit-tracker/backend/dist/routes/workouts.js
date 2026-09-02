"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
/**
 * GET /api/workouts - Fetch all workouts
 */
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout_1.default.find().populate('user');
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
/**
 * GET /api/workouts/:id - Fetch a specific workout
 */
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.default.findById(req.params.id).populate('user');
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json(workout);
    }
    catch (error) {
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
        const newWorkout = new Workout_1.default({
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create workout' });
    }
});
exports.default = router;

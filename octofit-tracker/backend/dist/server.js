"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const apiInfo_1 = require("./utils/apiInfo");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const User_1 = __importDefault(require("./models/User"));
const Team_1 = __importDefault(require("./models/Team"));
const Activity_1 = __importDefault(require("./models/Activity"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const Workout_1 = __importDefault(require("./models/Workout"));
const app = (0, express_1.default)();
const PORT = 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS middleware for Codespaces
app.use((req, res, next) => {
    const codespaceName = process.env.CODESPACE_NAME;
    const allowedOrigin = codespaceName
        ? `https://${codespaceName}-5173.app.github.dev`
        : 'http://localhost:5173';
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
// Health check endpoint
app.get('/api/health', (_req, res) => {
    const baseUrl = (0, apiInfo_1.getApiBaseUrl)();
    res.json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        timestamp: new Date().toISOString(),
        baseUrl,
    });
});
// Route handlers
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Database stats endpoint
app.get('/api/db-stats', async (_req, res) => {
    try {
        const userCount = await User_1.default.countDocuments();
        const teamCount = await Team_1.default.countDocuments();
        const activityCount = await Activity_1.default.countDocuments();
        const leaderboardCount = await Leaderboard_1.default.countDocuments();
        const workoutCount = await Workout_1.default.countDocuments();
        res.json({
            database: 'octofit_db',
            collections: {
                users: userCount,
                teams: teamCount,
                activities: activityCount,
                leaderboard: leaderboardCount,
                workouts: workoutCount,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch database stats' });
    }
});
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
    });
});
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB at', MONGODB_URI);
        app.listen(PORT, '0.0.0.0', () => {
            (0, apiInfo_1.logApiInfo)();
        });
    }
    catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};
startServer();

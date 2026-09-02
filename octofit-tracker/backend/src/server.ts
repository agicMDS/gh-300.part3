import express from 'express';
import mongoose from 'mongoose';
import { getApiBaseUrl, logApiInfo } from './utils/apiInfo';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
import User from './models/User';
import Team from './models/Team';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Workout from './models/Workout';

const app = express();
const PORT = 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
function blab(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
}
const API_BASE_URL = blab();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    timestamp: new Date().toISOString(),
    baseUrl: API_BASE_URL,
  });
});

// Route handlers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Database stats endpoint
app.get('/api/db-stats', async (_req, res) => {
  try {
    const userCount = await User.countDocuments();
    const teamCount = await Team.countDocuments();
    const activityCount = await Activity.countDocuments();
    const leaderboardCount = await Leaderboard.countDocuments();
    const workoutCount = await Workout.countDocuments();

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
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch database stats' });
  }
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
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
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB at', MONGODB_URI);

    app.listen(PORT, '0.0.0.0', () => {
      logApiInfo(API_BASE_URL);
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

startServer();

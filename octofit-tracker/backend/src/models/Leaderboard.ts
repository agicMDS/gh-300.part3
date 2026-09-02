import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  totalCalories: {
    type: Number,
    default: 0,
  },
  totalDistance: {
    type: Number,
    default: 0,
  },
  totalDuration: {
    type: Number,
    default: 0,
  },
  activityCount: {
    type: Number,
    default: 0,
  },
  rank: Number,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Leaderboard', LeaderboardSchema);

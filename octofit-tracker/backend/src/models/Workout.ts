import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      weight: Number,
    },
  ],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  duration: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Workout', WorkoutSchema);

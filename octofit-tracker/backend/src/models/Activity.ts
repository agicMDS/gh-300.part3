import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['running', 'cycling', 'swimming', 'gym', 'yoga', 'hiking'],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  distance: Number,
  calories: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Activity', ActivitySchema);

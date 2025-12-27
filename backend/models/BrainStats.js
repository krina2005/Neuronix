import mongoose from 'mongoose';

const brainStatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  focusLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  logicPower: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  bugCount: {
    type: Number,
    required: true,
    min: 0,
  },
  coffeeDependency: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  brainRamUsage: {
    type: Number,
    required: true,
    min: 0,
    max: 4,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BrainStats = mongoose.model('BrainStats', brainStatsSchema);

export default BrainStats;
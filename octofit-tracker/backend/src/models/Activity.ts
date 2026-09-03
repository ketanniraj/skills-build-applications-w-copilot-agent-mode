import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, required: true, enum: ['run', 'ride', 'strength', 'yoga', 'swim', 'hike'] },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceMiles: { type: Number, default: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Activity = model('Activity', activitySchema);
import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['cardio', 'strength', 'mobility', 'recovery'] },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true },
    targetGoal: { type: String, required: true, trim: true },
    exercises: [{ type: String, required: true, trim: true }],
    recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Workout = model('Workout', workoutSchema);
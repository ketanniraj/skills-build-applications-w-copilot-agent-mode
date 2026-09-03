import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    role: { type: String, required: true, enum: ['member', 'coach', 'captain'], default: 'member' },
    profile: {
      age: { type: Number, required: true },
      fitnessGoal: { type: String, required: true },
      experienceLevel: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
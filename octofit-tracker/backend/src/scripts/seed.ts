import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const userIds = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];
const teamIds = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}), LeaderboardEntry.deleteMany({}), Workout.deleteMany({})]);

    await User.insertMany([
      {
        _id: userIds[0],
        username: 'alex-runner',
        displayName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        role: 'captain',
        profile: { age: 29, fitnessGoal: 'Build half-marathon endurance', experienceLevel: 'advanced' },
      },
      {
        _id: userIds[1],
        username: 'sam-strength',
        displayName: 'Sam Rivera',
        email: 'sam.rivera@example.com',
        role: 'coach',
        profile: { age: 34, fitnessGoal: 'Improve functional strength', experienceLevel: 'advanced' },
      },
      {
        _id: userIds[2],
        username: 'jordan-fit',
        displayName: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        role: 'member',
        profile: { age: 26, fitnessGoal: 'Create a consistent weekly routine', experienceLevel: 'intermediate' },
      },
      {
        _id: userIds[3],
        username: 'priya-move',
        displayName: 'Priya Shah',
        email: 'priya.shah@example.com',
        role: 'member',
        profile: { age: 31, fitnessGoal: 'Increase mobility and recovery', experienceLevel: 'beginner' },
      },
    ]);

    await Team.insertMany([
      {
        _id: teamIds[0],
        name: 'Trail Blazers',
        city: 'Seattle',
        focus: 'Outdoor endurance challenges',
        captain: userIds[0],
        members: [userIds[0], userIds[2]],
      },
      {
        _id: teamIds[1],
        name: 'Core Crushers',
        city: 'Austin',
        focus: 'Strength circuits and mobility',
        captain: userIds[1],
        members: [userIds[1], userIds[3]],
      },
    ]);

    await Activity.insertMany([
      { user: userIds[0], team: teamIds[0], type: 'run', durationMinutes: 48, caloriesBurned: 520, distanceMiles: 5.8, completedAt: new Date('2026-07-29T12:00:00Z') },
      { user: userIds[1], team: teamIds[1], type: 'strength', durationMinutes: 42, caloriesBurned: 410, completedAt: new Date('2026-07-30T14:30:00Z') },
      { user: userIds[2], team: teamIds[0], type: 'hike', durationMinutes: 95, caloriesBurned: 680, distanceMiles: 4.7, completedAt: new Date('2026-08-01T16:15:00Z') },
      { user: userIds[3], team: teamIds[1], type: 'yoga', durationMinutes: 35, caloriesBurned: 160, completedAt: new Date('2026-08-02T10:00:00Z') },
    ]);

    await LeaderboardEntry.insertMany([
      { user: userIds[0], team: teamIds[0], points: 2480, rank: 1, streakDays: 18 },
      { user: userIds[1], team: teamIds[1], points: 2310, rank: 2, streakDays: 14 },
      { user: userIds[2], team: teamIds[0], points: 1865, rank: 3, streakDays: 9 },
      { user: userIds[3], team: teamIds[1], points: 1220, rank: 4, streakDays: 5 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run Builder',
        category: 'cardio',
        difficulty: 'advanced',
        durationMinutes: 45,
        targetGoal: 'Improve sustained running pace',
        exercises: ['10 minute warmup jog', '4 x 6 minute tempo intervals', '5 minute cooldown'],
        recommendedFor: [userIds[0]],
      },
      {
        title: 'Total Body Strength Circuit',
        category: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 38,
        targetGoal: 'Build full-body muscular endurance',
        exercises: ['Goblet squats', 'Pushups', 'Bent-over rows', 'Plank holds'],
        recommendedFor: [userIds[1], userIds[2]],
      },
      {
        title: 'Foundational Mobility Flow',
        category: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 25,
        targetGoal: 'Increase range of motion and recovery quality',
        exercises: ['Cat-cow stretches', 'World greatest stretch', 'Hip openers', 'Thoracic rotations'],
        recommendedFor: [userIds[3]],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

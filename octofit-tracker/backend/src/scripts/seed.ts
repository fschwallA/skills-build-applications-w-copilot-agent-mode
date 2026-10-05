import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const existingCounts = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Leaderboard.countDocuments(),
      Workout.countDocuments(),
    ]);

    if (existingCounts.some((count) => count > 0)) {
      console.log('Seed skipped: octofit_db already contains data.');
      return;
    }

    const users = await User.insertMany([
      { displayName: 'Sofia Chen', email: 'sofia.chen@mergington.example' },
      { displayName: 'Mateo Rivera', email: 'mateo.rivera@mergington.example' },
      { displayName: 'Jordan Brooks', email: 'jordan.brooks@mergington.example' },
      { displayName: 'Aaliyah Patel', email: 'aaliyah.patel@mergington.example' },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trailblazers',
        description: 'Outdoor miles and steady progress.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Pulse Crew',
        description: 'Strength, stamina, and team spirit.',
        memberIds: [users[2]._id, users[3]._id],
      },
    ]);

    const daysAgo = (days: number) => {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return date;
    };

    const periodStart = new Date();
    periodStart.setDate(periodStart.getDate() - periodStart.getDay());
    periodStart.setHours(0, 0, 0, 0);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        activityType: 'running',
        durationMinutes: 32,
        distanceKm: 4.2,
        points: 84,
        occurredAt: daysAgo(0),
      },
      {
        userId: users[1]._id,
        activityType: 'walking',
        durationMinutes: 45,
        distanceKm: 3.1,
        points: 68,
        occurredAt: daysAgo(1),
      },
      {
        userId: users[2]._id,
        activityType: 'strength',
        durationMinutes: 38,
        points: 92,
        occurredAt: daysAgo(2),
      },
      {
        userId: users[3]._id,
        activityType: 'running',
        durationMinutes: 26,
        distanceKm: 3.4,
        points: 72,
        occurredAt: daysAgo(1),
      },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id, teamId: teams[0]._id, points: 184, periodStart },
      { userId: users[1]._id, teamId: teams[0]._id, points: 168, periodStart },
      { userId: users[2]._id, teamId: teams[1]._id, points: 192, periodStart },
      { userId: users[3]._id, teamId: teams[1]._id, points: 172, periodStart },
    ]);

    await Workout.insertMany([
      {
        title: 'Easy Run',
        description: 'A relaxed run at a pace that still lets you talk.',
        activityType: 'running',
        intensity: 'beginner',
        durationMinutes: 20,
      },
      {
        title: 'Neighborhood Walk',
        description: 'A brisk walk with a few short faster intervals.',
        activityType: 'walking',
        intensity: 'beginner',
        durationMinutes: 25,
      },
      {
        title: 'Bodyweight Circuit',
        description: 'Alternate squats, push-ups, and rest at a steady pace.',
        activityType: 'strength',
        intensity: 'intermediate',
        durationMinutes: 30,
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts.');
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();

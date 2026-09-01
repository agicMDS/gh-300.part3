import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    // Create sample users
    const users = await User.insertMany([
      {
        _id: new mongoose.Types.ObjectId(),
        username: 'alex_runner',
        email: 'alex@octofit.com',
        password: 'hashed_password_1',
        profile: {
          firstName: 'Alex',
          lastName: 'Runner',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        },
      },
      {
        _id: new mongoose.Types.ObjectId(),
        username: 'jordan_cyclist',
        email: 'jordan@octofit.com',
        password: 'hashed_password_2',
        profile: {
          firstName: 'Jordan',
          lastName: 'Cyclist',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
        },
      },
      {
        _id: new mongoose.Types.ObjectId(),
        username: 'sam_swimmer',
        email: 'sam@octofit.com',
        password: 'hashed_password_3',
        profile: {
          firstName: 'Sam',
          lastName: 'Swimmer',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam',
        },
      },
      {
        _id: new mongoose.Types.ObjectId(),
        username: 'taylor_trainer',
        email: 'taylor@octofit.com',
        password: 'hashed_password_4',
        profile: {
          firstName: 'Taylor',
          lastName: 'Trainer',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=taylor',
        },
      },
    ]);

    console.log(`✓ Created ${users.length} users`);

    // Create sample teams
    const teams = await Team.insertMany([
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Morning Movers',
        description: 'Early birds who love running and cycling',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Water Warriors',
        description: 'Swimming and triathlon enthusiasts',
        leader: users[2]._id,
        members: [users[2]._id, users[3]._id],
      },
    ]);

    console.log(`✓ Created ${teams.length} teams`);

    // Create sample activities
    const activities = await Activity.insertMany([
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 8.5,
        calories: 650,
        date: new Date('2026-08-31'),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[0]._id,
        type: 'running',
        duration: 60,
        distance: 10.2,
        calories: 800,
        date: new Date('2026-08-30'),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[1]._id,
        type: 'cycling',
        duration: 90,
        distance: 45.3,
        calories: 1200,
        date: new Date('2026-08-31'),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[1]._id,
        type: 'cycling',
        duration: 75,
        distance: 38.5,
        calories: 950,
        date: new Date('2026-08-29'),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[2]._id,
        type: 'swimming',
        duration: 60,
        distance: 2.5,
        calories: 700,
        date: new Date('2026-08-31'),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[3]._id,
        type: 'gym',
        duration: 120,
        distance: 0,
        calories: 500,
        date: new Date('2026-08-30'),
      },
    ]);

    console.log(`✓ Created ${activities.length} activities`);

    // Create sample leaderboard entries
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[0]._id,
        team: teams[0]._id,
        totalCalories: 1450,
        totalDistance: 18.7,
        totalDuration: 105,
        activityCount: 2,
        rank: 1,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[1]._id,
        team: teams[0]._id,
        totalCalories: 2150,
        totalDistance: 83.8,
        totalDuration: 165,
        activityCount: 2,
        rank: 2,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[2]._id,
        team: teams[1]._id,
        totalCalories: 700,
        totalDistance: 2.5,
        totalDuration: 60,
        activityCount: 1,
        rank: 3,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[3]._id,
        team: teams[1]._id,
        totalCalories: 500,
        totalDistance: 0,
        totalDuration: 120,
        activityCount: 1,
        rank: 4,
      },
    ]);

    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);

    // Create sample workouts
    const workouts = await Workout.insertMany([
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[0]._id,
        name: 'Morning Run Prep',
        description: 'Stretching and warm-up routine',
        exercises: [
          { name: 'Leg Stretches', sets: 3, reps: 10, weight: 0 },
          { name: 'Arm Circles', sets: 2, reps: 15, weight: 0 },
        ],
        difficulty: 'beginner',
        duration: 15,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[3]._id,
        name: 'Full Body Strength',
        description: 'Comprehensive strength training session',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 80 },
          { name: 'Squats', sets: 4, reps: 10, weight: 100 },
          { name: 'Deadlifts', sets: 3, reps: 6, weight: 120 },
        ],
        difficulty: 'advanced',
        duration: 90,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        user: users[2]._id,
        name: 'Swimming Drills',
        description: 'Technique improvement drills',
        exercises: [
          { name: 'Freestyle Laps', sets: 10, reps: 1, weight: 0 },
          { name: 'Backstroke Drills', sets: 5, reps: 2, weight: 0 },
        ],
        difficulty: 'intermediate',
        duration: 60,
      },
    ]);

    console.log(`✓ Created ${workouts.length} workouts`);

    console.log('\n✅ Database seeding complete!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

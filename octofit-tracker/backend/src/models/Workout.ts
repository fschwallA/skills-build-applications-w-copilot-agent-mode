import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: {
      type: String,
      enum: ['running', 'walking', 'strength'],
      required: true,
    },
    intensity: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, min: 1, required: true },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);
import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: {
      type: String,
      enum: ['running', 'walking', 'strength'],
      required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, min: 0, default: 0 },
    occurredAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);
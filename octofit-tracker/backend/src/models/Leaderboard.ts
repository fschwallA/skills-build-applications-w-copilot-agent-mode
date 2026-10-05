import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, min: 0, required: true, default: 0 },
    periodStart: { type: Date, required: true },
  },
  { timestamps: true },
);

leaderboardSchema.index({ periodStart: 1, points: -1 });

export const Leaderboard = model('Leaderboard', leaderboardSchema);
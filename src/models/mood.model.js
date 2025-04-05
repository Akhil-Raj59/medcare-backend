import mongoose from 'mongoose'

const moodSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    mood: {
      type: String,
      enum: ["Happy", "Sad", "Angry", "Excited", "Anxious", "Neutral"],
      required: true,
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;

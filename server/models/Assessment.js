import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true
  },
  sleep: {
    type: String,
    required: true
  },
  energy: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Assessment = mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);

export default Assessment;

import mongoose from 'mongoose';

const pillarSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  icon: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Pillar = mongoose.models.Pillar || mongoose.model('Pillar', pillarSchema);

export default Pillar;

import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    required: true,
    default: 5
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  avatarInitials: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;

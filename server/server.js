import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Pillar from './models/Pillar.js';
import Testimonial from './models/Testimonial.js';
import Consultation from './models/Consultation.js';
import Subscription from './models/Subscription.js';
import Assessment from './models/Assessment.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// IN-MEMORY MOCK STORE (Fallback when database is offline)
const mockDB = {
  pillars: [
    {
      id: "diet-nutrition",
      title: "Diet & Nutrition",
      summary: "Eat Right. Live Right. Feel Your Best.",
      details: "No extreme diets or unrealistic restrictions. We focus on clear, realistic, daily-life based nutrition plans backed by health fundamentals and tailored for standard Indian lifestyles.",
      features: [
        "Indian lifestyle-fit food structures",
        "No-starvation metabolic boosts",
        "Practical grocery guides for city realities",
        "Simple, high-protein local recipes"
      ],
      icon: "salad"
    },
    {
      id: "mental-wellbeing",
      title: "Mental Wellbeing",
      summary: "Because Your Mind Deserves Care.",
      details: "Emotional resilience is foundational to physical health. Get matched with local wellness specialists and access simple guided breathing and stress checks that fit into modern calendars.",
      features: [
        "Guided breathing & Hatha integrations",
        "1-on-1 counseling coordinator matches",
        "Everyday stress management tools",
        "Sleep hygiene & night routine builders"
      ],
      icon: "brain"
    },
    {
      id: "exercise-home",
      title: "Exercise at Home",
      summary: "Fit Body. Strong Core. Confident You.",
      details: "Zero equipment, no complexity—only practical implementation. Home-friendly, short mobility and core strength routines designed for students, parents, and working professionals.",
      features: [
        "Zero-equipment bodyweight flows",
        "Desk postural decompression clinics",
        "Cardiovascular wellness checks",
        "Flexible, home-friendly timetables"
      ],
      icon: "yoga"
    }
  ],
  testimonials: [
    {
      index: 0,
      rating: 5,
      text: "Finally a place that does not push extreme diets or trends. The focus on regular Indian foods and daily routines made the habits sustainable.",
      author: "Anya Sen",
      role: "Surat, Gujarat (Parent)",
      avatarInitials: "AS"
    },
    {
      index: 1,
      rating: 5,
      text: "The home workout routines are extremely practical. I needed zero equipment, and the guides fit perfectly around my busy corporate working hours.",
      author: "Rohan Malhotra",
      role: "Software Engineer",
      avatarInitials: "RM"
    },
    {
      index: 2,
      rating: 5,
      text: "As a medical practitioner, I appreciate that Health Matters focuses on habit change and basic principles rather than quick trendy fixes.",
      author: "Dr. Vikram K.",
      role: "Surat City Consultant",
      avatarInitials: "VK"
    }
  ],
  consultations: [],
  subscriptions: [],
  assessments: []
};

// DATABASE SEEDING
const seedDatabase = async () => {
  if (global.isDatabaseOffline) return;
  try {
    // Seed pillars
    const pillarCount = await Pillar.countDocuments();
    if (pillarCount === 0) {
      await Pillar.create(mockDB.pillars);
      console.log('[Database] Seeded default wellness pillars.');
    }

    // Seed testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.create(mockDB.testimonials);
      console.log('[Database] Seeded default testimonials.');
    }
  } catch (err) {
    console.error(`[Database] Seeding failed: ${err.message}`);
  }
};

// ==========================================
// API ENDPOINTS
// ==========================================

// GET PILLARS
app.get('/api/pillars', async (req, res) => {
  if (global.isDatabaseOffline) {
    return res.json(mockDB.pillars);
  }
  try {
    const pillars = await Pillar.find({});
    res.json(pillars.length > 0 ? pillars : mockDB.pillars);
  } catch (err) {
    res.status(500).json({ error: err.message, fallback: mockDB.pillars });
  }
});

// GET TESTIMONIALS
app.get('/api/testimonials', async (req, res) => {
  if (global.isDatabaseOffline) {
    return res.json(mockDB.testimonials);
  }
  try {
    const testimonials = await Testimonial.find({}).sort({ index: 1 });
    res.json(testimonials.length > 0 ? testimonials : mockDB.testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message, fallback: mockDB.testimonials });
  }
});

// POST ASSESSMENT (Wellness Score Calculator)
app.post('/api/assessments', async (req, res) => {
  const { goal, sleep, energy } = req.body;
  if (!goal || !sleep || !energy) {
    return res.status(400).json({ error: "Goal, sleep, and energy rates are required." });
  }

  // Computational scoring formula
  let baseScore = 75;

  if (goal === 'Stress Relief') baseScore += 2;
  if (goal === 'Weight Management') baseScore += 5;
  if (goal === 'Better Sleep') baseScore -= 5;
  if (goal === 'Flexibility') baseScore += 3;

  if (sleep === 'less-6') baseScore -= 20;
  if (sleep === '6-8') baseScore += 5;
  if (sleep === 'more-8') baseScore += 10;

  if (energy === 'low') baseScore -= 15;
  if (energy === 'moderate') baseScore += 5;
  if (energy === 'high') baseScore += 15;

  const score = Math.max(10, Math.min(100, baseScore));

  // Determine feedback descriptions based on data goals
  let headline = '';
  let description = '';
  let recHeader = '';
  let recBody = '';

  if (goal === 'Stress Relief') {
    headline = score < 65 ? 'High Emotional Load' : 'Moderate Stress Response';
    description = `Your score of ${score}/100 indicates that cognitive tension and sleep gaps are placing stress on your body. Reducing focus on extreme routines will protect metabolic health.`;
    recHeader = 'Suggested Action: Mental Wellbeing Program';
    recBody = 'Learn local, accessible breathing integrations under our Mental Wellbeing pillar, or book a session to talk through stressful daily routine blocks.';
  } else if (goal === 'Weight Management') {
    headline = score < 65 ? 'Metabolic Congestion' : 'Active Metabolic Horizon';
    description = `Your score of ${score}/100 shows baseline energy fatigue. Extreme starvation blocks cellular regeneration; our experts suggest focusing on Indian lifestyle-fit metabolic foods.`;
    recHeader = 'Suggested Action: Diet & Nutrition Integration';
    recBody = 'Coordinate with our Surat-based nutritional guides to balance daily home-cooked foods without cutting carbs or feeling starved.';
  } else if (goal === 'Better Sleep') {
    headline = score < 65 ? 'Circadian Rhythm Disruption' : 'Developing Sleep Architecture';
    description = `Your score of ${score}/100 shows sleep debt. Sleep gaps under 6 hours disrupt focus, trigger afternoon cravings, and increase adrenaline blocks.`;
    recHeader = 'Suggested Action: Circadian Routine Tuning';
    recBody = 'Focus on morning sunlight exposure and dark hours after sunset. Review local, simple habit adjustments under our Mental Wellbeing sessions.';
  } else { // Flexibility
    headline = score < 65 ? 'Postural Fatigue Alert' : 'Adaptive Structural Mobility';
    description = `Your score of ${score}/100 suggests desk-bound joint stiffness. Restoring structural flexibility will improve metabolic blood flow.`;
    recHeader = 'Suggested Action: Exercise at Home Flows';
    recBody = 'Integrate short 10-minute postural decompression clips. Focus on joint alignment flows from our Exercise at Home modules.';
  }

  const resultData = { score, headline, description, recHeader, recBody };

  // Save submission
  if (global.isDatabaseOffline) {
    mockDB.assessments.push({ goal, sleep, energy, score, createdAt: new Date() });
  } else {
    try {
      await Assessment.create({ goal, sleep, energy, score });
    } catch (err) {
      console.error(`[Database] Failed to save assessment log: ${err.message}`);
    }
  }

  res.status(201).json(resultData);
});

// POST CONSULTATION (Coordinator Booking)
app.post('/api/consultations', async (req, res) => {
  const { name, email, focus } = req.body;
  if (!name || !email || !focus) {
    return res.status(400).json({ error: "Name, email, and focus area are required." });
  }

  if (global.isDatabaseOffline) {
    mockDB.consultations.push({ name, email, focus, createdAt: new Date() });
    console.log(`[Offline] Booked coordinator call for ${name} (${email}) - Focus: ${focus}`);
  } else {
    try {
      await Consultation.create({ name, email, focus });
      console.log(`[Database] Consultation scheduled for ${name}`);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(201).json({ success: true, message: "Consultation booked! A coordinator will email you within 24 hours." });
});

// POST SUBSCRIPTION (Newsletter)
app.post('/api/subscriptions', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email address is required." });
  }

  if (global.isDatabaseOffline) {
    mockDB.subscriptions.push({ email, createdAt: new Date() });
    console.log(`[Offline] Registered newsletter subscriber: ${email}`);
  } else {
    try {
      await Subscription.create({ email });
      console.log(`[Database] Registered subscriber: ${email}`);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(201).json({ success: true, message: `Subscribed successfully with ${email}!` });
});

// BOOTSTRAP EXPRESS SERVER
const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`\n==================================================================`);
    console.log(`[Server] Health Matters MERN Backend listening on Port: ${PORT}`);
    console.log(`[Server] API base URI: http://localhost:${PORT}/api`);
    console.log(`==================================================================\n`);
  });
};

startServer();

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const YOGA_POSES = [
  { name: 'Tadasana (Mountain Pose)', level: 'Beginner', focus: 'Posture & Balance', benefits: 'Improves body alignment, strengthens thighs, abdomen, and buttocks, and reduces flat feet.', instruction: 'Stand tall with feet slightly apart. Ground your weight evenly. Inhale, raise your arms overhead, and look upward, lengthening your spine.' },
  { name: 'Balasana (Child\'s Pose)', level: 'Beginner', focus: 'Stress Relief & Rest', benefits: 'Decompresses the spine, releases muscle tension in the back, neck, and shoulders, and calms the mind.', instruction: 'Kneel on the floor, touch your big toes together, sit on your heels, then fold forward, extending your arms in front and resting your forehead down.' },
  { name: 'Vrikshasana (Tree Pose)', level: 'Intermediate', focus: 'Balance & Focus', benefits: 'Strengthens thighs, calves, ankles, and spine. Expands chest, improves poise, and builds concentration.', instruction: 'Shift weight to your left leg. Place the sole of your right foot high on the inner left thigh. Bring hands into prayer position and find a focal point.' },
  { name: 'Adho Mukha Svanasana (Downward Dog)', level: 'Beginner', focus: 'Mobility & Hamstrings', benefits: 'Stretches shoulders, hamstrings, and calves. Energizes the body, strengthens arms, and relieves back pain.', instruction: 'Start on hands and knees. Tuck toes, lift hips high and back, pushing chest toward thighs. Form an inverted "V" shape with your body.' },
  { name: 'Bhujangasana (Cobra Pose)', level: 'Beginner', focus: 'Back Strength', benefits: 'Strengthens the spine, stretches chest, lungs, shoulders, and abdomen. Firms the buttocks and relieves stress.', instruction: 'Lie face down. Place hands under shoulders. Inhale and lift your chest off the floor, keeping elbows close to your torso.' },
];

const SYMPTOMS = [
  { keyword: 'bloating', topic: 'Diet & Nutrition', pathway: 'diet', desc: 'Indigestion, fatty liver, thyroid support, or general dietary discomfort' },
  { keyword: 'sadness', topic: 'Mental Wellbeing', pathway: 'mental', desc: 'Prolonged low mood, exam/study stress, or work-life imbalance' },
  { keyword: 'stiff back', topic: 'Yoga & Mindfulness', pathway: 'yoga', desc: 'Back pain, neck tension, desk posture stiffness, or body inflexibility' },
  { keyword: 'anxiety', topic: 'Mental Wellbeing', pathway: 'mental', desc: 'Racing thoughts, stress panic, study pressure, or emotional burnout' },
  { keyword: 'panic', topic: 'Mental Wellbeing', pathway: 'mental', desc: 'Sudden intense worry, palpitations, or stress overload' },
  { keyword: 'focus reset', topic: 'Mental Wellbeing', pathway: 'mental', desc: 'Brain fog, digital screen fatigue, and mental reset via sound healing' },
  { keyword: 'strength', topic: 'Exercise at Home', pathway: 'fitness', desc: 'Core strength decline, zero-equipment training, and basic toning' },
  { keyword: 'stamina', topic: 'Exercise at Home', pathway: 'fitness', desc: 'General fitness, post-pregnancy recovery, or senior mobility balance' },
  { keyword: 'cravings', topic: 'Diet & Nutrition', pathway: 'diet', desc: 'PCOS hormonal diet queries, fat loss, or BMI weight gain meal tracking' },
  { keyword: 'fatigue', topic: 'Yoga & Mindfulness', pathway: 'yoga', desc: 'Sleep improvement yoga, relaxation, or senior citizen BP/flexibility flows' }
];

export default function ToolboxPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('breathing');

  // 1. Guided Breathing States
  const [breathState, setBreathState] = useState('Inhale'); // Inhale, Hold, Exhale
  const [breathCount, setBreathCount] = useState(4);
  const breathTimer = useRef(null);

  useEffect(() => {
    if (activeTab === 'breathing') {
      breathTimer.current = setInterval(() => {
        setBreathCount((prev) => {
          if (prev <= 1) {
            setBreathState((state) => {
              if (state === 'Inhale') return 'Hold';
              if (state === 'Hold') return 'Exhale';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(breathTimer.current);
    }
    return () => clearInterval(breathTimer.current);
  }, [activeTab]);

  // 2. Calorie & Macro Calculator States
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('female');
  const [activity, setActivity] = useState('1.375'); // sedentary (1.2), light (1.375), mod (1.55), active (1.725)
  const [goal, setGoal] = useState('maintain'); // lose, maintain, gain
  const [calcResult, setCalcResult] = useState(null);

  const calculateMacros = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (!w || !h || !a) return;

    // Mifflin-St Jeor Formula
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdee = bmr * parseFloat(activity);

    let calories = tdee;
    let carbsPct = 50, proteinPct = 20, fatPct = 30; // split ratios

    if (goal === 'lose') {
      calories = tdee - 500;
      carbsPct = 40; proteinPct = 30; fatPct = 30;
    } else if (goal === 'gain') {
      calories = tdee + 300;
      carbsPct = 40; proteinPct = 25; fatPct = 35;
    }

    // Convert Pcts to Grams (Carbs/Prot = 4 kcal/g, Fat = 9 kcal/g)
    const carbsGrams = Math.round((calories * (carbsPct / 100)) / 4);
    const proteinGrams = Math.round((calories * (proteinPct / 100)) / 4);
    const fatGrams = Math.round((calories * (fatPct / 100)) / 9);

    setCalcResult({
      calories: Math.round(calories),
      bmr: Math.round(bmr),
      carbs: carbsGrams,
      protein: proteinGrams,
      fat: fatGrams,
      carbsPct,
      proteinPct,
      fatPct,
    });
  };

  // Mood tracker removed. Using standard clinical self-care utilities.

  // 4. Symptom Directory Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length > 1) {
      const filtered = SYMPTOMS.filter(
        (s) =>
          s.keyword.toLowerCase().includes(q.toLowerCase()) ||
          s.topic.toLowerCase().includes(q.toLowerCase()) ||
          s.desc.toLowerCase().includes(q.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const selectSymptomTopic = (s) => {
    navigate('/pathways', { state: { activePillar: s.pathway } });
  };

  // Set up reveal observer
  useEffect(() => {
    const els = document.querySelectorAll(
      '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip-y, .reveal-line-x'
    );
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); } }),
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [activeTab, calcResult]);

  return (
    <div className="page-container toolbox-page">
      <section style={{ paddingTop: '120px', paddingBottom: '100px' }}>
        <div className="container">
          <div className="preview-header">
            <span className="overline">Wellness Toolbox</span>
            <h2>Interactive <em>Self-Care Utilities.</em></h2>
            <p className="preview-subtitle" style={{ textAlign: 'justify' }}>Discover simple, certified tools to manage your breathing, compute your nutrition, explore mobility exercises, and lookup symptoms.</p>
          </div>

          {/* Toolbox Navigation */}
          <div className="toolbox-nav" style={{ display: 'flex', gap: 'var(--space-xs)', marginBottom: '40px', flexWrap: 'wrap', borderBottom: 'var(--border)', paddingBottom: '1rem' }}>
            {[
              { id: 'breathing', label: '🌬️ Breathing Guide' },
              { id: 'calculator', label: '⚖️ Calorie/Macro Calculator' },
              { id: 'yoga', label: '🧘 Yoga Pose Library' },
              { id: 'symptom', label: '🔍 Symptom Directory' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`btn ${activeTab === t.id ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ─────────────────────────────────────────────────────
              TAB 1: BREATHING GUIDE
             ───────────────────────────────────────────────────── */}
          {activeTab === 'breathing' && (
            <div className="toolbox-content-card reveal-scale" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)', alignItems: 'center', background: 'var(--paper-warm)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', border: 'var(--border)' }}>
              <div style={{ textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '320px' }}>
                {/* Outer Breathing Circle */}
                <div
                  className={`breathing-circle-outer ${breathState.toLowerCase()}`}
                  style={{
                    width: breathState === 'Inhale' ? '280px' : breathState === 'Hold' ? '280px' : '120px',
                    height: breathState === 'Inhale' ? '280px' : breathState === 'Hold' ? '280px' : '120px',
                    borderRadius: '50%',
                    border: '1.5px solid var(--ink)',
                    background: breathState === 'Inhale' ? 'rgba(74, 124, 89, 0.08)' : breathState === 'Hold' ? 'rgba(200, 155, 60, 0.08)' : 'rgba(123, 111, 168, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'absolute',
                  }}
                >
                  <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--ink)' }}>{breathState}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink-muted)', marginTop: '0.5rem' }}>{breathCount}s</span>
                </div>
              </div>

              <div>
                <span className="overline">Stress Reduction</span>
                <h3>The Box Breathing Cycle</h3>
                <p style={{ marginTop: '1rem', color: 'var(--ink-soft)', textAlign: 'justify' }}>
                  A certified technique used to reduce baseline stress hormones, reset the autonomic nervous system, and immediately ground racing thoughts. Focus your attention entirely on the circle.
                </p>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong style={{ color: 'var(--accent-sage)', width: '80px' }}>Inhale:</strong>
                    <span>Deep stomach inhale expanding the ribs (4 seconds).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong style={{ color: 'var(--accent-gold)', width: '80px' }}>Hold:</strong>
                    <span>Hold your breath quietly, relaxing shoulders (4 seconds).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong style={{ color: 'var(--accent-dusk)', width: '80px' }}>Exhale:</strong>
                    <span>Slow, complete release emptying lungs (4 seconds).</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────
              TAB 2: CALORIE & MACRO CALCULATOR
             ───────────────────────────────────────────────────── */}
          {activeTab === 'calculator' && (
            <div className="toolbox-content-card" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'var(--space-2xl)', background: 'var(--paper-warm)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', border: 'var(--border)' }}>
              {/* Input Form */}
              <div className="reveal-left">
                <span className="overline">Dietary Structuring</span>
                <h3 style={{ marginBottom: '1.5rem' }}>BMR & Calorie Calculator</h3>
                <form onSubmit={calculateMacros} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input type="number" placeholder="e.g. 68" value={weight} onChange={(e) => setWeight(e.target.value)} required style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: 'var(--border)', background: 'var(--paper)', fontFamily: 'inherit' }} />
                  </div>
                  <div className="form-group">
                    <label>Height (cm)</label>
                    <input type="number" placeholder="e.g. 165" value={height} onChange={(e) => setHeight(e.target.value)} required style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: 'var(--border)', background: 'var(--paper)', fontFamily: 'inherit' }} />
                  </div>
                  <div className="form-group">
                    <label>Age (years)</label>
                    <input type="number" placeholder="e.g. 28" value={age} onChange={(e) => setAge(e.target.value)} required style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: 'var(--border)', background: 'var(--paper)', fontFamily: 'inherit' }} />
                  </div>
                  <div className="form-group">
                    <label>Biological Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: 'var(--border)', background: 'var(--paper)', fontFamily: 'inherit' }}>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Weekly Activity Level</label>
                    <select value={activity} onChange={(e) => setActivity(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: 'var(--border)', background: 'var(--paper)', fontFamily: 'inherit' }}>
                      <option value="1.2">Sedentary (Little to no exercise)</option>
                      <option value="1.375">Lightly Active (Light exercise 1-3 days/week)</option>
                      <option value="1.55">Moderately Active (Moderate exercise 3-5 days/week)</option>
                      <option value="1.725">Very Active (Hard exercise 6-7 days/week)</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Primary Weight Goal</label>
                    <select value={goal} onChange={(e) => setGoal(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: 'var(--border)', background: 'var(--paper)', fontFamily: 'inherit' }}>
                      <option value="lose">Caloric Deficit (Fat Loss)</option>
                      <option value="maintain">Maintain Current Weight</option>
                      <option value="gain">Caloric Surplus (Lean Muscle Gain)</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2', justifyContent: 'center', marginTop: '1rem' }}>
                    Calculate Dietary Breakdown
                  </button>
                </form>
              </div>

              {/* Output Results */}
              <div className="reveal-right reveal-delay-2" style={{ borderLeft: 'var(--border)', paddingLeft: 'var(--space-2xl)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {calcResult ? (
                  <div className="calc-result-board">
                    <span className="overline" style={{ color: 'var(--accent-gold)' }}>Your Plan</span>
                    <h3 style={{ fontSize: '3rem', marginBlock: '0.5rem 1rem' }}>
                      {calcResult.calories} <span style={{ fontSize: '1.2rem', color: 'var(--ink-muted)' }}>kcal / day</span>
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '1.5rem', textAlign: 'justify' }}>
                      Your calculated Basal Metabolic Rate (BMR) is <strong>{calcResult.bmr} kcal</strong>. To achieve your goal, focus on the following macro splits:
                    </p>

                    <div className="macro-progress-bars" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {[
                        { label: 'Protein (Muscle & Repair)', grams: calcResult.protein, pct: calcResult.proteinPct, color: 'var(--accent-sage)' },
                        { label: 'Carbohydrates (Energy)', grams: calcResult.carbs, pct: calcResult.carbsPct, color: 'var(--accent-gold)' },
                        { label: 'Fats (Hormonal Balance)', grams: calcResult.fat, pct: calcResult.fatPct, color: 'var(--accent-clay)' },
                      ].map((m, idx) => (
                        <div key={idx}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                            <span>{m.label}</span>
                            <span>{m.grams}g ({m.pct}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', borderRadius: 'var(--radius-full)', background: 'var(--paper-deep)', overflow: 'hidden' }}>
                            <div style={{ width: `${m.pct}%`, height: '100%', background: m.color, borderRadius: 'inherit' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--ink-muted)', paddingBlock: '2rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>⚖️</span>
                    <p style={{ marginTop: '1rem', fontSize: '0.92rem', textAlign: 'justify' }}>Submit the calculator parameters to generate your personalized BMR calories and macro guidelines.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────
              TAB 3: YOGA POSE LIBRARY (Mood tracker removed)
             ───────────────────────────────────────────────────── */}
          {activeTab === 'yoga' && (
            <div className="yoga-library-grid reveal-scale" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-md)' }}>
              {YOGA_POSES.map((pose) => (
                <div key={pose.name} className="subtopic-card" style={{ cursor: 'default', background: 'var(--paper-warm)' }}>
                  <div className="subtopic-card-inner" style={{ padding: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span className="overline" style={{ marginBottom: 0, color: 'var(--accent-sage)' }}>{pose.focus}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'var(--paper-deep)', color: 'var(--ink-muted)' }}>{pose.level}</span>
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 500, marginBottom: '0.5rem' }}>{pose.name}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: '1rem', textAlign: 'justify' }}>{pose.benefits}</p>
                    <div style={{ background: 'var(--paper)', border: 'var(--border)', padding: '0.8rem', borderRadius: 'var(--radius-sm)' }}>
                      <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '0.2rem' }}>How to do it:</strong>
                      <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.4, textAlign: 'justify' }}>{pose.instruction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────
              TAB 5: SYMPTOM SEARCH DIRECTORY
             ───────────────────────────────────────────────────── */}
          {activeTab === 'symptom' && (
            <div className="toolbox-content-card reveal-scale" style={{ background: 'var(--paper-warm)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', border: 'var(--border)', minHeight: '380px' }}>
              <div style={{ maxWidth: '600px', marginInline: 'auto', textAlign: 'center', marginBottom: '40px' }}>
                <span className="overline">Clinical Matching</span>
                <h3>Search Directory</h3>
                <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--ink-muted)', fontSize: '0.92rem', textAlign: 'justify' }}>
                  Input standard symptoms (e.g. "bloating", "sadness", "anxiety", "stiff back") to see details, matched pathways, and matched therapists.
                </p>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search symptoms, e.g. bloating, anxiety, fatigue..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: 'var(--radius-full)', border: 'var(--border-dark)', background: 'var(--paper)', fontSize: '1rem', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
                  />
                </div>
              </div>

              {searchQuery.trim().length > 1 ? (
                <div className="search-results-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
                  {searchResults.length > 0 ? (
                    searchResults.map((s) => (
                      <div
                        key={s.keyword}
                        className="subtopic-card active"
                        onClick={() => selectSymptomTopic(s)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="subtopic-card-inner">
                          <span className="overline" style={{ color: 'var(--paper)', opacity: 0.8 }}>Matched Topic</span>
                          <h4 style={{ color: 'var(--paper)', fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>{s.topic}</h4>
                          <p style={{ color: 'rgba(246,240,228,0.7)', fontSize: '0.85rem', textAlign: 'justify' }}>{s.desc}</p>
                          <div className="subtopic-card-cta" style={{ color: 'var(--paper)', marginTop: 'auto', paddingTop: '1rem' }}>
                            View Guidance & Specialists
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ gridColumn: 'span 3', textAlign: 'center', paddingBlock: '2rem', color: 'var(--ink-muted)' }}>
                      No symptoms matched your keyword. Try "bloating", "sadness", "anxiety", "stiff back", or "fatigue".
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', maxWidth: '600px', marginInline: 'auto' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-muted)', alignSelf: 'center' }}>Popular lookups:</span>
                  {['bloating', 'sadness', 'anxiety', 'stiff back', 'fatigue', 'panic'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSearch({ target: { value: tag } })}
                      style={{ border: 'var(--border)', background: 'var(--paper)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', color: 'var(--ink-soft)', cursor: 'pointer' }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

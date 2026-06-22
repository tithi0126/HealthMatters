import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PRACTITIONERS = [
  { 
    name: 'Mr. Rahul Sharma', 
    initials: 'RS', 
    role: 'Founder - Wellness & Fitness Specialist', 
    exp: 'Established Platform', 
    spec: 'Habit Formation & Movement Integration', 
    bio: 'Rahul founded Health Matters to make wellbeing clear, practical, and doable in daily life. He believes progress is about small, consistent, habit-driven actions rather than extreme or flashy fixes.' 
  },
  { 
    name: 'Ms. Manvi Shah', 
    initials: 'MS', 
    role: 'Psychologist | Therapist | Counsellor', 
    exp: '2+ Years', 
    spec: 'Child, Adolescent & Emotional Wellbeing', 
    bio: 'Guided by empathy and clinical awareness, Manvi is dedicated to helping minds heal and grow, offering structured therapy for child, adolescent, and general emotional wellbeing.' 
  },
  { 
    name: 'Mrs. Anjali Krishnani', 
    initials: 'AK', 
    role: 'Sound Healer & Manifestation Coach', 
    exp: '3+ Years', 
    spec: 'Holistic Transformation & Sound Meditations', 
    bio: 'Founder of Angelic Bliss and honored with the Nari Tu Narayani Award, Anjali has successfully healed 7500+ individuals, facilitating high-impact transformation experiences.' 
  },
  { 
    name: 'Dr. Mala Patel', 
    initials: 'MP', 
    role: 'MD Pathologist & Nutritionist', 
    exp: '25+ Yrs Pathologist | 5+ Yrs Nutritionist', 
    spec: 'Early Detection of Lifestyle Diseases & Food Therapy', 
    bio: 'Dr. Mala helps people live a medicine-free life by correcting food patterns and everyday habits, bringing a wealth of clinical experience.' 
  }
];

export default function AboutPage() {
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
  }, []);

  return (
    <div className="page-container about-page">
      {/* ── ABOUT HERO ── */}
      <section className="about-hero" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container">
          <span className="overline reveal-left">About Health Matters</span>
          <h1 className="hero-animate" style={{ marginBottom: '1.5rem', color: '#000' }}>
            Health is personal.<br />
            <em>Solutions should be too.</em>
          </h1>
          <p className="reveal reveal-delay-2" style={{ maxWidth: '680px', fontSize: '1.15rem', lineHeight: 1.8 }}>
            Health Matters is a local wellness platform based out of Surat that helps people form lasting, science-backed habits for better health. We focus on usable plans, simple follow-through, and real support — not trendy or flashy fixes. Our approach is practical, affordable, and designed for city realities.
          </p>
        </div>
      </section>

      {/* ── ABOUT WORK & VALUES ── */}
      <section className="about-values" style={{ paddingBlock: '60px', background: 'var(--paper-warm)' }}>
        <div className="container">
          <div className="about-inner">
            <div className="about-left reveal-left">
              <span className="overline" style={{ color: 'var(--accent-sage)' }}>OUR CORE VALUES</span>
              <h2 style={{ color: '#000' }}>How we practice <em>wellness.</em></h2>
              <p style={{ marginTop: '1.25rem', lineHeight: 1.75, color: '#000' }}>
                Health Matters was created to bring balanced health closer to everyday lifestyle. Every program is designed to remove confusion and bring practical health into your daily routine. We focus on:
              </p>
              <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Simplicity & Clarity', 'Sustainability in Routines', 'Personal Attention & Support', 'Trust & Transparency', 'Practical City-Reality Adaptation'].map((val, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--accent-sage)', fontWeight: 'bold' }}>✓</span> {val}
                  </li>
                ))}
              </ul>
            </div>

            <div  className="about-right">
              {[
                { icon: '🌱', title: 'Sustainable Habits', desc: 'Practical methods that work in daily routines — not extreme diets or unrealistic advice.' },
                { icon: '🏡', title: 'Zero Equipment', desc: 'Home-friendly exercises and yoga requiring zero complexity or gear.' },
                { icon: '🇮🇳', title: 'Indian Lifestyle Fit', desc: 'Food and routine patterns designed specifically for Indian households.' },
                { icon: '👥', title: 'Real Personal Support', desc: 'No generic templates. Daily check-ins, WhatsApp follow-ups, and custom trackers.' },
              ].map((f, i) => (
                <div key={i} className={`about-feature reveal-right reveal-delay-${i + 1}`}>
                  <div className="about-feature-icon">{f.icon}</div>
                  <div className="about-feature-text">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="about-mission" style={{ paddingBlock: '80px', borderBottom: 'var(--border)' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="overline">What Inspires Us</span>
          <h2>Our Mission & Vision</h2>
          <p className="preview-subtitle" style={{ maxWidth: '600px', marginInline: 'auto', marginTop: '10px' }}>Guided by standard clinical integrity, we strive to build a healthier society through small, consistent, daily habits.</p>
        </div>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)' }}>
          <div className="reveal-left" style={{ background: 'var(--paper-warm)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: 'var(--border)' }}>
            <span className="overline" style={{ color: 'var(--accent-sage)' }}>Our Vision</span>
            <p style={{ fontSize: '1.3rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1.6, marginTop: '0.5rem', textAlign: 'justify' }}>
              To make practical & sustainable health accessible to every household, ensuring wellness is never a privilege.
            </p>
          </div>
          <div className="reveal-right" style={{ background: 'var(--paper-warm)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: 'var(--border)' }}>
            <span className="overline" style={{ color: 'var(--accent-sage)' }}>Our Mission</span>
            <p style={{ fontSize: '1.3rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1.6, marginTop: '0.5rem', textAlign: 'justify' }}>
              To empower individuals with personalized health guidance focusing on habits, holistic well-being & real-life transformation.
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE WORK ── */}
      <section className="about-work" style={{ paddingBlock: '80px', background: 'var(--paper-warm)', borderBottom: 'var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="overline">How We Operate</span>
            <h2>About The Work</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)', alignItems: 'center' }}>
            <div className="reveal-left">
              <p style={{ fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.8, marginBottom: '1.5rem', textAlign: 'justify' }}>
                At Health Matters, we don't believe in quick fixes, aggressive workout regimens, or expensive synthetic supplements. Instead, our clinical collective works collaboratively to diagnose and restructure lifestyle habits. We take a holistic approach that integrates pathological screening, personalized food guides, somatic breathing exercises, and expert-led psychotherapy.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.8, textAlign: 'justify' }}>
                Whether you are managing chronic stress, adapting to desk work, or balancing hormonal indicators like PCOS and Thyroid, we provide daily custom check-ins, direct WhatsApp support, and open local community chats to ensure you have the guidance to succeed.
              </p>
            </div>
            <div className="reveal-right" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {[
                { title: 'Personalized Coaching', val: 'Daily accountability, progress audits, and custom trackers' },
                { title: 'Clinical Integration', val: 'Pathology checks combined with tailored meal plans' },
                { title: 'Somatic Focus', val: 'Joint decompressions, breathing triggers, and sound therapy' },
                { title: 'Community-Driven', val: 'Free resources, local groups, and active workshops' }
              ].map((card, idx) => (
                <div key={idx} style={{ background: 'var(--paper)', border: 'var(--border)', padding: '20px', borderRadius: 'var(--radius-lg)' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '6px', color: 'var(--ink)' }}>{card.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.4 }}>{card.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY ── */}
      <section className="about-journey" style={{ paddingBlock: '80px', borderBottom: 'var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="overline">Milestones & Growth</span>
            <h2>Our Journey</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px', marginInline: 'auto' }}>
            {[
              { year: '2021', title: 'The Foundation', desc: 'Health Matters was founded by Rahul Sharma in Surat during the post-pandemic phase, addressing a significant lack of practical, local, and zero-equipment habit solutions.' },
              { year: '2022', title: 'Pathological & Sound Integration', desc: 'We welcomed Dr. Mala Patel to incorporate pathology reviews and Mrs. Anjali Krishnani to introduce sound healing mind resets, establishing a clinical and sensory wellness foundation.' },
              { year: '2023', title: 'Emotional & Psychological Support', desc: 'Ms. Manvi Shah joined the collective, introducing structured therapy for adolescent, child, and general emotional wellbeing to anchor the Mental health pillar.' },
              { year: 'Present', title: 'Community Impact', desc: 'Empowered over 1,200+ individuals in Surat through personalized consultation plans, local WhatsApp groups, and corporate chair yoga workshops.' }
            ].map((j, idx) => (
              <div key={idx} className="reveal-up" style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, color: 'var(--accent-sage)', borderRight: '2px solid var(--accent-sage)', paddingRight: '20px', minWidth: '120px', textAlign: 'right' }}>
                  {j.year}
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, marginBottom: '6px', color: 'var(--ink)' }}>{j.title}</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', lineHeight: 1.6, textAlign: 'justify' }}>{j.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALIST GRID ── */}
      <section className="about-team" style={{ paddingBlock: '80px 100px' }}>
        <div className="container">
          <div className="team-header" style={{ marginBottom: '50px' }}>
            <span className="overline">The Founders & Specialists</span>
            <h2>Meet the <em>Clinical Collective.</em></h2>
            <p style={{ maxWidth: '500px', marginTop: '10px' }}>
              We collaborate to provide step-by-step guidance, expert-backed programs, and habits that fit real schedules.
            </p>
          </div>

          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-lg)' }}>
            {PRACTITIONERS.map((p, i) => (
              <div key={p.name} className={`team-card reveal-scale reveal-delay-${(i % 4) + 1}`}>
                <div className="team-card-inner">
                  <div className="team-avatar">{p.initials}</div>
                  <h4 className="team-name">{p.name}</h4>
                  <div className="team-role">{p.role}</div>
                  <div className="team-spec">
                    <strong>Focus:</strong> {p.spec}
                  </div>
                  <p className="team-bio">{p.bio}</p>
                  <div className="team-exp">Experience: {p.exp}</div>
                  <Link to="/book" state={{ bookingFocus: `${p.name} Session` }} className="team-book-btn">
                    Schedule with {p.name.split(' ')[2] || p.name.split(' ')[1]}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

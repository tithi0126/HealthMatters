import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedCount from '../components/AnimatedCount';

const TESTIMONIALS = [
  { id: 1, text: "The Chair Yoga and desk mobility workshop conducted at our office in Surat was incredibly useful. The quick stretches and posture corrections make daily screen time much easier.", author: 'Consulting Staff', role: 'Commerce & IT Consultancy, Surat', initials: 'CS' },
  { id: 2, text: "I joined the 3-week Stress & Anxiety program. Guided by Ms. Manvi's empathy, I learned real-life habit adjustments that helped me overcome study stress.", author: 'Aditya S.', role: 'Student, Surat', initials: 'AS' },
  { id: 3, text: "Dr. Mala's pathological review combined with lifestyle diet changes literally changed my life. I went back to a medicine-free life and feel extremely active.", author: 'Rajesh P.', role: 'Business Owner, Surat', initials: 'RP' },
  { id: 4, text: "The Buddha Purnima Sound Healing session was a deep emotional reset. The sound vibrations combined with Mrs. Anjali's meditation created a calm I hadn't felt in years.", author: 'Neha J.', role: 'Homemaker, Surat', initials: 'NJ' },
  { id: 5, text: "Health Matters focuses on what actually works in a daily Indian routine. No expensive supplements or unachievable workouts. Just simple, daily habits.", author: 'Amit K.', role: 'Software Professional, Surat', initials: 'AK' }
];

export default function HomePage({ showToast }) {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const carouselRef = useRef(null);

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

  const handleNewsletter = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      setNewsletterEmail('');
      showToast('Subscribed successfully!');
    } catch {
      showToast('Subscription failed. Please try again.');
    }
  };

  const scrollCarousel = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector('.testimonial-card');
    const w = card ? card.getBoundingClientRect().width + 20 : 300;
    const next = dir === 'next'
      ? Math.min(carouselIndex + 1, TESTIMONIALS.length - 1)
      : Math.max(carouselIndex - 1, 0);
    el.scrollTo({ left: next * w, behavior: 'smooth' });
    setCarouselIndex(next);
  };

  const selectPillar = (pillarId) => {
    navigate('/pathways', { state: { activePillar: pillarId } });
  };

  return (
    <div className="home-page-container">
      {/* ── REDESIGNED HERO SECTION ── */}
      <section id="hero" className="hero-editorial">
        <div className="hero-bg-pattern" />
        <div className="container">
          <div className="hero-grid">
            {/* Left: Text & Actions */}
            <div className="hero-left-column">
              <div className="hero-brand-heading hero-animate">
                <span className="hero-brand-name">The Health Matters</span>
                <span className="hero-brand-divider" />
                <span className="hero-brand-tagline">Your Wellness. Your Journey.</span>
              </div>
              <span className="hero-kicker reveal-left">Surat • Est. 2021 • Holistic Wellness</span>
              <h1 className="hero-headline-large">
                <span className="line-wrapper"><span className="animated-line">Quiet the mind.</span></span>
                <span className="line-wrapper"><span className="animated-line delay-1">Heal the <em>body.</em></span></span>
                <span className="line-wrapper"><span className="animated-line delay-2">Live in balance.</span></span>
              </h1>
              <p className="hero-subtext reveal reveal-delay-3">
                Expert-backed, personalized guidance across Diet, Mental Wellbeing, Yoga, and Home Exercise — designed for real Indian routines and sustainable habit transformation.
              </p>
              <div className="hero-actions-new reveal reveal-delay-4">
                <Link to="/pathways" className="btn btn-primary">
                  Explore Pathways
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link to="/self-check" className="btn btn-outline">
                  Wellness Self-Check
                </Link>
              </div>
            </div>

            {/* Right: Visual Editorial Collage */}
            <div className="hero-right-column reveal-scale reveal-delay-2">
              <div className="hero-editorial-visual">
                <div className="hero-image-wrapper">
                  <div className="hero-image-border" />
                  <img src="/hero.png" alt="Holistic Wellness Landscape" className="hero-img" />
                </div>

                {/* Layered Glassmorphic Card */}
                <div className="hero-floating-card">
                  <span className="card-quote">"Health is personal. Solutions should be too."</span>
                  <span className="card-author">— Health Matters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Staggered Numerical Counters */}
          <div className="hero-stats-row reveal-up reveal-delay-5">
            {[
              { val: 1200, suffix: '+', desc: 'People guided across Surat' },
              { val: 3, suffix: '', desc: 'Core wellness pillars' },
              { val: 100, suffix: '%', desc: 'Free first consultation' },
            ].map((s, i) => (
              <div className="hero-stat-card" key={i}>
                <span className="stat-number">
                  <AnimatedCount end={s.val} suffix={s.suffix} />
                </span>
                <span className="stat-desc">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PATHWAYS PREVIEW ── */}
      <section className="pathways-preview-section">
        <div className="container">
          <div className="preview-header">
            <span className="overline">Our Pathways</span>
            <h2>Three roads to <em>wellbeing.</em></h2>
            <p className="preview-subtitle">Click on a pathway below to view interactive topics, specialized tools, and connect with clinical practitioners.</p>
          </div>

          <div className="preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)' }}>
            {[
              { id: 'diet', num: '01', title: 'Diet & Nutrition', desc: 'Customizable meal structures using local Indian ingredients. Focus on lifestyle diseases, fatty liver, thyroid, and PCOS.', color: 'var(--accent-sage)', tag: 'Nutrition' },
              { id: 'mental', num: '02', title: 'Mental Wellbeing', desc: 'Practical stress and anxiety relief programs, mindfulness, and sound meditation resets.', color: 'var(--accent-dusk)', tag: 'Mindset' },
              { id: 'fitness', num: '03', title: 'Yoga & Exercise', desc: 'Desk mobility, chair yoga, senior citizen flexibility, and home exercise routines requiring zero equipment.', color: 'var(--accent-gold)', tag: 'Movement' },
            ].map((p, i) => (
              <div className={`preview-card reveal-scale reveal-delay-${i + 1}`} key={p.id} onClick={() => selectPillar(p.id)}>
                <div className="preview-card-bg" style={{ '--accent-glow': p.color }} />
                <span className="preview-num">{p.num}</span>
                <span className="preview-tag" style={{ color: p.color }}>{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="preview-arrow">
                  Explore {p.title.split(' ')[0]}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK ABOUT TEASER ── */}
      <section className="about-teaser-section">
        <div className="container">
          <div className="about-teaser-inner reveal-scale">
            <div className="about-teaser-text">
              <span className="overline">About Us</span>
              <h2>Rooted in <em>Surat.</em> Built for real people.</h2>
              <p>We are a local wellness platform operating out of Surat with one shared goal: to make professional wellness guidance honest, affordable, and accessible to every household.</p>
              <Link to="/about" className="btn btn-outline">Meet the Specialists</Link>
            </div>
            <div className="about-teaser-graphic">
              <img src="/about.png" alt="Wellness and Healing" className="teaser-img" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WELLNESS WORKSHOPS SECTION ── */}
      <section className="workshops-section" style={{ paddingBlock: '80px', background: 'var(--paper-deep)', borderTop: 'var(--border)' }}>
        <div className="container">
          <div className="preview-header" style={{ marginBottom: '50px', textAlign: 'center' }}>
            <span className="overline">Interactive Sessions</span>
            <h2>Wellness Workshops We Conduct</h2>
            <p className="preview-subtitle" style={{ maxWidth: '600px', marginInline: 'auto' }}>We deliver high-impact wellness sessions for corporate offices, apartment communities, and local groups to build simple daily health habits.</p>
          </div>

          <div className="workshops-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
            {[
              {
                icon: '🪑',
                title: 'Corporate Chair Yoga & Desk Mobility',
                desc: 'Quick, active sequences that reduce back pain, alleviate shoulder strain, and restore mental focus directly at office desks without changing clothes or requiring gear.'
              },
              {
                icon: '🍎',
                title: 'Lifestyle Nutrition & Meal Re-Structuring',
                desc: 'Practical sessions showing how to design balanced meals using local Indian groceries. Focuses on reversing fatty liver, managing thyroid, and regulating blood sugar.'
              },
              {
                icon: '💆',
                title: 'Stress Reset & Emotional Resilience',
                desc: 'Certified mindfulness checks, box breathing tools, and sound frequency decompressions designed to reduce chronic fatigue and calm the baseline nervous system.'
              }
            ].map((w, idx) => (
              <div key={idx} className="workshop-card reveal-scale" style={{ background: 'var(--paper-warm)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-lg)', border: 'var(--border)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{w.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.75rem', color: 'var(--ink)' }}>{w.title}</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', lineHeight: 1.6, textAlign: 'justify' }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials">
        <div className="container">
          <div className="testimonials-header reveal-up">
            <div>
              <span className="overline">Stories from our community</span>
              <h2>Real people, <em style={{ fontStyle: 'italic', color: 'var(--ink-muted)' }}>real results.</em></h2>
            </div>
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={() => scrollCarousel('prev')} aria-label="Previous">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button className="carousel-btn" onClick={() => scrollCarousel('next')} aria-label="Next">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>

          <div className="testimonials-track" ref={carouselRef}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.id} className={`testimonial-card reveal-scale reveal-delay-${(i % 3) + 1}`}>
                <div className="testimonial-quote-mark">"</div>
                <div className="testimonial-text">{t.text}</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials[0]}</div>
                  <div>
                    <div className="testimonial-author-name">{t.author}</div>
                    <div className="testimonial-author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${carouselIndex === i ? 'active' : ''}`}
                onClick={() => { setCarouselIndex(i); const el = carouselRef.current; const card = el?.querySelector('.testimonial-card'); if (el && card) el.scrollTo({ left: i * (card.getBoundingClientRect().width + 20), behavior: 'smooth' }); }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section id="newsletter">
        <div className="container newsletter-inner">
          <div className="reveal-left">
            <span className="overline" style={{ color: 'rgba(246,240,228,0.5)' }}>Stay informed</span>
            <h2>Weekly wellness, <em>delivered.</em></h2>
            <p style={{ color: 'rgba(246,240,228,0.6)', marginTop: '0.75rem' }}>No spam. Just thoughtful guidance, expert tips, and community stories — every week.</p>
          </div>
          <form onSubmit={handleNewsletter} className="reveal-right">
            <div className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder="your@email.com"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit">Subscribe</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

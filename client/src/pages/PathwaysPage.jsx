import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PILLARS } from '../data/pillars';

export default function PathwaysPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  // Default to location state activePillar if navigated from home, else default to 'diet'
  const [activePillar, setActivePillar] = useState('diet');
  const [activeTopic, setActiveTopic] = useState(null);

  useEffect(() => {
    if (location.state && location.state.activePillar) {
      setActivePillar(location.state.activePillar);
      setActiveTopic(null);
    }
  }, [location.state]);

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
  }, [activePillar, activeTopic]);

  const pillar = PILLARS.find(p => p.id === activePillar);
  const topic = pillar?.topics.find(t => t.id === activeTopic);

  const switchPillar = (id) => {
    setActivePillar(id);
    setActiveTopic(null);
  };

  const selectTopic = (id) => {
    const same = activeTopic === id;
    setActiveTopic(same ? null : id);
    if (!same) {
      setTimeout(() => {
        drawerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const navigateToBooking = (focusTitle) => {
    navigate('/book', { state: { bookingFocus: focusTitle } });
  };

  return (
    <div className="page-container pathways-page">
      <section id="pillars" style={{ background: 'transparent', paddingTop: '120px' }}>
        <div className="container">
          {/* Section header */}
          <div className="pillars-header">
            <div className="pillars-title-group reveal-left">
              <span className="overline">Our three pathways</span>
              <h2>Where would you<br /><em style={{ fontStyle: 'italic', color: 'var(--ink-muted)' }}>like to begin?</em></h2>
            </div>
            <p className="reveal-right" style={{ maxWidth: '360px', textAlign: 'right' }}>
              Select a pillar below. Each one unfolds into specific topics, symptoms, guidance, and a matched specialist.
            </p>
          </div>

          {/* Pillar selector */}
          <div className="pillar-selector reveal-scale">
            {PILLARS.map(p => (
              <button
                key={p.id}
                id={`pillar-btn-${p.id}`}
                className={`pillar-btn ${activePillar === p.id ? 'active' : ''}`}
                onClick={() => switchPillar(p.id)}
              >
                <div className="pillar-btn-content">
                  <span className="pillar-btn-num">{p.number}</span>
                  <span className="pillar-btn-title">{p.title.replace('\n', '\u00A0')}</span>
                  <span className="pillar-btn-sub">{p.tag}</span>
                </div>
                <div className="pillar-btn-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Pillar detail panel */}
          {pillar && (
            <div className="pillar-detail-panel" key={pillar.id}>
              {/* Intro */}
              <div className="pillar-intro">
                <div className="reveal-left">
                  <p className="pillar-intro-quote">
                    "{pillar.quote}<br /><span>{pillar.quoteAccent}</span>"
                  </p>
                </div>
                <div className="pillar-intro-right reveal-right">
                  <p className="pillar-intro-body">{pillar.description}</p>
                  <button className="btn btn-sage" onClick={() => navigateToBooking(`${pillar.title.replace('\n', ' ')} Guidance`)}>
                    Book a Free Session
                  </button>
                </div>
              </div>

              {/* Sub-topics heading */}
              <div className="subtopics-label reveal-line-x">
                <span className="overline">Choose a topic</span>
              </div>

              {/* Topic cards */}
              <div className="subtopics-grid">
                {pillar.topics.map((t, i) => (
                  <div
                    key={t.id}
                    id={`topic-card-${t.id}`}
                    className={`subtopic-card reveal-scale reveal-delay-${i + 1} ${activeTopic === t.id ? 'active' : ''}`}
                    onClick={() => selectTopic(t.id)}
                  >
                    <div className="subtopic-card-inner">
                      <div className="subtopic-icon">{t.icon}</div>
                      <h4>{t.title}</h4>
                      <p>{t.brief}</p>
                      <div className="subtopic-card-cta">
                        {activeTopic === t.id ? 'Close' : 'View Details'}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          style={{
                            transform: activeTopic === t.id ? 'rotate(90deg)' : 'none',
                            transition: 'transform 0.3s',
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail Drawer */}
              {topic && (
                <div className="detail-drawer" ref={drawerRef} id="detail-drawer">
                  {/* Drawer header */}
                  <div className="drawer-top reveal-clip-y">
                    <div>
                      <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(246,240,228,0.45)', marginBottom: '0.5rem' }}>
                        Diagnosis & Guidance
                      </span>
                      <div className="drawer-top-title">
                        {topic.title}<br />
                        <em>Support System</em>
                      </div>
                    </div>
                    <button
                      className="drawer-close-btn"
                      onClick={() => setActiveTopic(null)}
                      aria-label="Close detail drawer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  {/* Body: symptoms + guidelines */}
                  <div className="drawer-body">
                    {/* Symptoms */}
                    <div className="drawer-section reveal-left">
                      <div className="drawer-section-label">How we identify it</div>
                      <div className="symptoms-list">
                        {topic.symptoms.map((s, i) => (
                          <div key={i} className="symptom-item">
                            <span className="symptom-dot" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Do's & Don'ts */}
                    <div className="drawer-section reveal-right">
                      <div className="drawer-section-label">Daily Guidelines</div>
                      <div className="dos-donts-grid">
                        <div className="dos-col">
                          <h5>Do's</h5>
                          <div className="guidelines-list">
                            {topic.dos.map((d, i) => (
                              <div key={i} className="guideline-item">
                                <span className="guideline-marker">✓</span>
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="donts-col">
                          <h5>Don'ts</h5>
                          <div className="guidelines-list">
                            {topic.donts.map((d, i) => (
                              <div key={i} className="guideline-item">
                                <span className="guideline-marker">✕</span>
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Specialist bio & CTA */}
                  <div className="drawer-therapist reveal-up">
                    <div className="therapist-avatar">{topic.therapist.initials}</div>
                    <div className="therapist-info">
                      <span className="overline" style={{ marginBottom: 0 }}>Matched Specialist</span>
                      <div className="therapist-name">{topic.therapist.name}</div>
                      <div className="therapist-role">{topic.therapist.role} · {topic.therapist.exp} · {topic.therapist.spec}</div>
                      <div className="therapist-bio">{topic.therapist.bio}</div>
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ flexShrink: 0 }}
                      onClick={() => navigateToBooking(topic.title)}
                    >
                      Book Free Session
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCount from '../components/AnimatedCount';
import { ASSESSMENTS } from '../data/assessments';

const OPTIONS = [
  { text: 'Strongly Disagree', value: 0 },
  { text: 'Disagree', value: 1 },
  { text: 'Sometimes', value: 2 },
  { text: 'Agree', value: 3 },
  { text: 'Strongly Agree', value: 4 },
];

export default function SelfCheckPage({ showToast }) {
  const navigate = useNavigate();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Quiz State Machine
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [introStep, setIntroStep] = useState(true);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  // Intersection reveal observer
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
  }, [activeAssessment, currentQuestionIdx, quizResult, introStep]);

  // Reset all states
  const resetQuiz = () => {
    setActiveAssessment(null);
    setIntroStep(true);
    setCurrentQuestionIdx(0);
    setAnswers({});
    setQuizResult(null);
  };

  const startAssessment = (assessment) => {
    setActiveAssessment(assessment);
    setIntroStep(true);
    setCurrentQuestionIdx(0);
    setAnswers({});
    setQuizResult(null);
  };

  const handleOptionSelect = (val) => {
    setAnswers({
      ...answers,
      [currentQuestionIdx]: val,
    });
  };

  const handleNext = () => {
    const isLast = currentQuestionIdx === activeAssessment.questions.length - 1;
    if (isLast) {
      calculateResult();
    } else {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const calculateResult = () => {
    // Sum total points
    const totalPoints = Object.values(answers).reduce((sum, v) => sum + v, 0);

    const rules = activeAssessment.scoring;
    let matchingRange = rules.ranges[rules.ranges.length - 1]; // fallback to last

    for (const range of rules.ranges) {
      if (totalPoints >= range.min && totalPoints <= range.max) {
        matchingRange = range;
        break;
      }
    }

    let therapistName = null;
    if (rules.type === 'clinical' && rules.therapist) {
      if (totalPoints >= 15) {
        therapistName = rules.therapist.severe;
      } else if (totalPoints >= 10) {
        therapistName = rules.therapist.moderate;
      }
    }

    setQuizResult({
      score: totalPoints,
      maxScore: activeAssessment.questions.length * 4,
      label: matchingRange.label,
      summary: matchingRange.summary,
      recommendations: matchingRange.recommendations,
      therapist: therapistName,
    });

    showToast('Your personal wellness report is ready!');
  };

  const navigateToBooking = (focusText) => {
    navigate('/book', { state: { bookingFocus: focusText } });
  };

  // Filter assessments based on search input
  const filteredAssessments = ASSESSMENTS.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container self-check-page">
      <section style={{ paddingTop: '120px', paddingBottom: '100px' }}>
        <div className="container">

          {/* ─────────────────────────────────────────────────────
              STATE A: DISCOVER/LIST VIEW (CATALOG)
             ───────────────────────────────────────────────────── */}
          {!activeAssessment && !quizResult && (
            <div className="assessment-catalog-view">
              <div className="preview-header">
                <span className="overline">Wellness Catalog</span>
                <h2>Assessments</h2>
                <p className="preview-subtitle">Check your wellness indicators, track digital FOMO, spot burnout, or identify stress thresholds with certified diagnostics.</p>
              </div>

              {/* Search input bar */}
              <div className="search-bar-wrapper" style={{ marginBlock: '30px', maxWidth: '400px' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="assessment-search"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1.2rem 0.8rem 2.8rem',
                      borderRadius: 'var(--radius-full)',
                      border: 'var(--border)',
                      background: 'rgba(74, 124, 89, 0.05)',
                      fontFamily: 'inherit',
                      fontSize: '0.92rem',
                      backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%237a6f5e\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Ccircle cx=\'11\' cy=\'11\' r=\'8\'/%3E%3Cline x1=\'21\' y1=\'21\' x2=\'16.65\' y2=\'16.65\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '1rem center',
                      backgroundSize: '1.2em'
                    }}
                  />
                </div>
              </div>

              {/* Assessment Card Grid */}
              <div className="assessment-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
                {filteredAssessments.length > 0 ? (
                  filteredAssessments.map((a, i) => (
                    <div
                      key={a.id}
                      className={`assessment-card-custom reveal-scale reveal-delay-${(i % 3) + 1}`}
                      onClick={() => startAssessment(a)}
                      style={{
                        background: 'var(--paper-warm)',
                        border: 'var(--border)',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out), border-color var(--duration-base) var(--ease-out)'
                      }}
                    >
                      {/* Card Cover image */}
                      <div className="assessment-card-cover" style={{ width: '100%', height: '140px', overflow: 'hidden', borderBottom: 'var(--border)' }}>
                        <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      
                      <div className="assessment-card-body" style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--ink)' }}>
                          {a.title}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                          {a.description}
                        </p>
                        
                        {/* Badges footer */}
                        <div className="assessment-card-footer" style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '3px 8px', borderRadius: 'var(--radius-full)', background: 'rgba(74, 124, 89, 0.1)', color: 'var(--accent-sage)' }}>
                            {a.duration}
                          </span>
                          <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '3px 8px', borderRadius: 'var(--radius-full)', background: 'var(--paper-deep)', color: 'var(--ink-muted)' }}>
                            {a.questionsCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: 'span 3', textAlign: 'center', paddingBlock: '3rem', color: 'var(--ink-muted)' }}>
                    No assessments matched your query. Try "Anxiety", "burnout", "FOMO", or "Self Care".
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────
              STATE B: STEP-BY-STEP QUIZ WIZARD VIEW
             ───────────────────────────────────────────────────── */}
          {activeAssessment && !quizResult && (
            <div className="quiz-wizard-view" style={{ maxWidth: '650px', marginInline: 'auto' }}>
              {/* If we are on the Intro step, display details, symptoms, dos, and donts */}
              {introStep ? (
                <div style={{ background: 'var(--paper-warm)', border: 'var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', padding: 'var(--space-lg)', boxShadow: 'var(--shadow-sm)' }}>
                  {/* Back button and title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '20px' }}>
                    <button
                      onClick={resetQuiz}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(74, 124, 89, 0.1)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--accent-sage)'
                      }}
                      aria-label="Back to catalog"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 500, color: 'var(--ink)' }}>
                      {activeAssessment.title}
                    </h3>
                  </div>

                  {/* Assessment cover image (Banner) */}
                  {activeAssessment.image && (
                    <div className="quiz-cover-image" style={{ width: '100%', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '24px', border: 'var(--border)' }}>
                      <img src={activeAssessment.image} alt={activeAssessment.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  {/* Overview details */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 500, marginBottom: '10px', color: 'var(--ink)' }}>Overview</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.6, textAlign: 'justify' }}>
                      {activeAssessment.details || activeAssessment.description}
                    </p>
                  </div>

                  {/* Symptoms & Indicators */}
                  {activeAssessment.symptoms && activeAssessment.symptoms.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 500, marginBottom: '10px', color: 'var(--ink)' }}>Common Indicators & Symptoms</h4>
                      <ul style={{ paddingLeft: '20px', fontSize: '0.92rem', color: 'var(--ink-soft)', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {activeAssessment.symptoms.map((s, idx) => (
                          <li key={idx} style={{ listStyleType: 'disc' }}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Do's & Don'ts */}
                  {activeAssessment.dos && activeAssessment.donts && (
                    <div className="dos-donts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                      <div className="dos-col" style={{ background: 'rgba(74, 124, 89, 0.04)', padding: '15px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(74, 124, 89, 0.1)' }}>
                        <h5 style={{ color: 'var(--accent-sage)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '1.1rem' }}>✓</span> Do's
                        </h5>
                        <ul style={{ paddingLeft: '15px', fontSize: '0.88rem', color: 'var(--ink-soft)', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          {activeAssessment.dos.map((d, idx) => (
                            <li key={idx} style={{ listStyleType: 'circle' }}>{d}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="donts-col" style={{ background: 'rgba(189, 61, 38, 0.04)', padding: '15px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(189, 61, 38, 0.1)' }}>
                        <h5 style={{ color: '#8a3120', fontWeight: 600, fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '1.1rem' }}>✗</span> Don'ts
                        </h5>
                        <ul style={{ paddingLeft: '15px', fontSize: '0.88rem', color: '#8a3120', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          {activeAssessment.donts.map((d, idx) => (
                            <li key={idx} style={{ listStyleType: 'circle' }}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Start Button */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button
                      type="button"
                      onClick={() => setIntroStep(false)}
                      className="btn btn-sage"
                      style={{ padding: '0.9rem 3rem', fontSize: '1rem', width: '100%', justifyContent: 'center' }}
                    >
                      Start Assessment ({activeAssessment.questionsCount})
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Back button to return to intro step */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '20px' }}>
                    <button
                      onClick={() => setIntroStep(true)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(74, 124, 89, 0.1)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--accent-sage)'
                      }}
                      aria-label="Back to assessment info"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 500, color: 'var(--ink)' }}>
                      {activeAssessment.title}
                    </h3>
                  </div>

                  {/* Assessment cover image (Banner) inside quiz taking screen */}
                  {activeAssessment.image && (
                    <div className="quiz-cover-image" style={{ width: '100%', height: '140px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '24px', border: 'var(--border)' }}>
                      <img src={activeAssessment.image} alt={activeAssessment.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  {/* Progress Bar (Green Line) */}
                  <div style={{ width: '100%', height: '4px', background: 'var(--paper-deep)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: '35px' }}>
                    <div
                      style={{
                        width: `${((currentQuestionIdx) / activeAssessment.questions.length) * 100}%`,
                        height: '100%',
                        background: 'var(--accent-sage)',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>

                  {/* Question area */}
                  <div className="quiz-question-box" style={{ marginBottom: '30px' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      {/* Green numbered circle */}
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: 'var(--accent-sage)',
                          color: 'var(--paper)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          flexShrink: 0,
                          marginTop: '2px'
                        }}
                      >
                        {activeAssessment.questions[currentQuestionIdx].circleNum}
                      </div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.4, color: 'var(--ink)' }}>
                        {activeAssessment.questions[currentQuestionIdx].text}
                      </h4>
                    </div>
                  </div>

                  {/* Vertical Choice Buttons */}
                  <div className="quiz-options-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '40px' }}>
                    {OPTIONS.map((option) => {
                      const isSelected = answers[currentQuestionIdx] === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleOptionSelect(option.value)}
                          className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                          style={{
                            padding: '0.9rem 1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            justifyContent: 'center',
                            fontSize: '0.92rem',
                            border: isSelected ? '1.5px solid var(--ink)' : '1px solid rgba(26,18,8,0.12)',
                            background: isSelected ? 'var(--ink)' : 'var(--paper-warm)',
                            color: isSelected ? 'var(--paper)' : 'var(--ink-soft)'
                          }}
                        >
                          {option.text}
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Next green pill button */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      type="button"
                      disabled={answers[currentQuestionIdx] === undefined}
                      onClick={handleNext}
                      className="btn btn-sage"
                      style={{
                        padding: '0.8rem 2.8rem',
                        fontSize: '0.85rem',
                        opacity: answers[currentQuestionIdx] === undefined ? 0.45 : 1,
                        pointerEvents: answers[currentQuestionIdx] === undefined ? 'none' : 'auto'
                      }}
                    >
                      {currentQuestionIdx === activeAssessment.questions.length - 1 ? 'Finish Assessment' : 'Next'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────
              STATE C: SCORING RESULTS VIEW
             ───────────────────────────────────────────────────── */}
          {quizResult && (
            <div className="quiz-result-view" style={{ maxWidth: '580px', marginInline: 'auto' }}>
              <div className="assessment-result" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)' }}>
                <span className="overline" style={{ color: 'var(--accent-gold)' }}>Assessment Report</span>
                
                <div className="result-score" style={{ color: 'var(--paper)', fontSize: '4.5rem', fontFamily: 'var(--font-display)', fontWeight: 500, display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginBlock: '0.5rem 1rem' }}>
                  <AnimatedCount end={quizResult.score} />
                  <span style={{ fontSize: '1.25rem', color: 'rgba(246,240,228,0.5)' }}> / {quizResult.maxScore}</span>
                </div>
                
                <div className="result-label" style={{ color: 'var(--paper)', fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 500, marginBottom: '0.5rem' }}>
                  {quizResult.label}
                </div>
                
                <p style={{ color: 'rgba(246,240,228,0.65)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {quizResult.summary}
                </p>

                <div className="result-recs" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {quizResult.recommendations.map((r, i) => (
                    <div key={i} className="result-rec-item" style={{ background: 'rgba(246,240,228,0.06)', borderLeft: '3px solid var(--accent-gold)', color: 'var(--paper)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}>
                      {r}
                    </div>
                  ))}
                </div>

                <div className="result-actions" style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: '2.5rem' }}>
                  <button
                    className="btn btn-outline"
                    style={{ borderColor: 'rgba(246,240,228,0.3)', color: 'var(--paper)', flex: 1, justifyContent: 'center' }}
                    onClick={resetQuiz}
                  >
                    Back to Catalog
                  </button>
                  <button
                    className="btn btn-sage"
                    style={{ flex: 2, justifyContent: 'center' }}
                    onClick={() => navigateToBooking(quizResult.therapist ? `${activeAssessment.title} consultation matched with ${quizResult.therapist}` : `${activeAssessment.title} consultation`)}
                  >
                    {quizResult.therapist ? `Book session with ${quizResult.therapist.split(' ')[1]}` : 'Book Free Consultation'}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

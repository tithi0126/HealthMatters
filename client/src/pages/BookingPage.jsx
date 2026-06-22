import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PILLARS } from '../data/pillars';

export default function BookingPage({ showToast }) {
  const location = useLocation();

  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingFocus, setBookingFocus] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (location.state && location.state.bookingFocus) {
      setBookingFocus(location.state.bookingFocus);
    }
  }, [location.state]);

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

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: bookingName, email: bookingEmail, focus: bookingFocus }),
      });
      const data = await res.json();
      setSubmitted(true);
      showToast(data.message || 'Consultation booked! We\'ll be in touch.');
    } catch {
      showToast('Booking failed. Please try again.');
    }
  };

  return (
    <div className="page-container booking-page">
      <section style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="booking-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)', alignItems: 'center' }}>
            {/* Left: Info */}
            <div className="reveal-left">
              <span className="overline">Book a Free Session</span>
              <h2>Let's talk about<br /><em style={{ color: 'var(--ink-muted)', fontStyle: 'italic' }}>your wellbeing.</em></h2>
              <p style={{ marginTop: '1rem', color: 'var(--ink-soft)' }}>
                Your first 30-minute consultation is completely pro-bono. We'll map out your current state, answer any pressing questions, and connect you with the appropriate specialist or guidance routine.
              </p>
              
              <div className="booking-perks" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {[
                  '30-minute private 1-on-1 session',
                  'Matched local clinical experts in Surat',
                  'Actionable initial roadmaps, no commitment required'
                ].map((perk, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-sage)' }} />
                    <span style={{ fontSize: '0.92rem', color: 'var(--ink-soft)' }}>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="reveal-right reveal-delay-2">
              {!submitted ? (
                <div className="booking-form-card" style={{ background: 'var(--paper-warm)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: 'var(--border)' }}>
                  <h4 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500 }}>
                    Consultation Request
                  </h4>
                  <form onSubmit={handleBooking}>
                    <div className="form-group">
                      <label htmlFor="booking-name">Your name</label>
                      <input
                        id="booking-name"
                        type="text"
                        placeholder="Full name"
                        value={bookingName}
                        onChange={e => setBookingName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: 'var(--border)', background: 'var(--paper)', fontFamily: 'inherit' }}
                      />
                    </div>
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label htmlFor="booking-email">Email address</label>
                      <input
                        id="booking-email"
                        type="email"
                        placeholder="your@email.com"
                        value={bookingEmail}
                        onChange={e => setBookingEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: 'var(--border)', background: 'var(--paper)', fontFamily: 'inherit' }}
                      />
                    </div>
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label htmlFor="booking-focus">Area of focus</label>
                      <select
                        id="booking-focus"
                        value={bookingFocus}
                        onChange={e => setBookingFocus(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: 'var(--border)', background: 'var(--paper)', fontFamily: 'inherit', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%237a6f5e\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                      >
                        <option value="">Select a focus area…</option>
                        {PILLARS.flatMap(p => p.topics.map(t => (
                          <option key={t.id} value={t.title}>{t.title}</option>
                        )))}

                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
                      Request Free Consultation
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="booking-success-card" style={{ background: 'var(--paper-warm)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', border: 'var(--border)', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, marginBottom: '1rem' }}>Consultation Requested</h4>
                  <p style={{ color: 'var(--ink-soft)' }}>
                    Thank you. We have received your request. A clinical coordinator will reach out to you at <strong>{bookingEmail}</strong> within 24 hours to schedule your session.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, X, Check, Calendar, Clock } from 'lucide-react';
import { ARTISTS } from '../data/artists';
import { useStore } from '../store/useStore';
import type { Artist, Appointment } from '../types';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

export const ArtistsPage: React.FC = () => {
  const { addAppointment, appointments } = useStore();

  const [selected, setSelected] = useState<Artist | null>(null);
  const [chosenDate, setChosenDate] = useState<string | null>(null);
  const [chosenTime, setChosenTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleBook = () => {
    if (!selected || !chosenDate || !chosenTime) return;
    const appt: Appointment = {
      id: `appt-${Date.now()}`,
      artistId: selected.id,
      artistName: selected.name,
      date: chosenDate,
      time: chosenTime,
      service: `${selected.specialty} Consultation`,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
    };
    addAppointment(appt);
    setConfirmed(true);
  };

  const closeModal = () => {
    setSelected(null);
    setChosenDate(null);
    setChosenTime(null);
    setConfirmed(false);
  };

  return (
    <div className="page-enter" style={{ padding: '40px 24px 100px', maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div className="eyebrow-terracotta" style={{ marginBottom: 6 }}>Book an Artist</div>
        <h1 className="font-display" style={{ fontSize: 34, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.15 }}>
          Artist Portfolios
        </h1>
        <p style={{ fontSize: 14, color: 'var(--taupe)', marginTop: 6 }}>
          Curated artists matched to your style — book directly from their availability.
        </p>
      </div>

      {/* Upcoming Appointments */}
      {appointments.filter((a) => a.status === 'confirmed').length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Upcoming Appointments</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {appointments.filter((a) => a.status === 'confirmed').map((a) => (
              <div
                key={a.id}
                className="card"
                style={{
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  background: 'rgba(138,154,126,0.08)',
                  borderColor: 'rgba(138,154,126,0.30)',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'rgba(138,154,126,0.20)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={18} color="#5A6E52" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--espresso)' }}>
                    {a.service} with {a.artistName}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--taupe)', marginTop: 2 }}>
                    {formatDate(a.date)} at {a.time}
                  </div>
                </div>
                <span className="badge badge-sage">Confirmed</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Artist Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 20 }}>
        {ARTISTS.map((artist, i) => (
          <motion.div
            key={artist.id}
            className="card card-hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.28 }}
            style={{ padding: '22px', cursor: 'pointer' }}
            onClick={() => { setSelected(artist); setConfirmed(false); }}
          >
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              {/* Avatar placeholder */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: artist.avatarGradient,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 500,
                }}
              >
                {artist.name.split(' ').map((n) => n[0]).join('')}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <h3 className="font-display" style={{ fontSize: 17, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.2 }}>
                      {artist.name}
                    </h3>
                    <div className="badge badge-terracotta" style={{ marginTop: 4 }}>
                      {artist.specialty}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                      <Star size={12} color="#C15B4A" fill="#C15B4A" />
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--espresso)' }}>{artist.rating}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--taupe)' }}>{artist.reviewCount} reviews</div>
                  </div>
                </div>

                <p style={{ fontSize: 13, color: 'var(--taupe)', lineHeight: 1.5, marginTop: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {artist.bio}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--espresso)' }}>
                    From £{artist.priceFrom}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--terracotta)', fontSize: 13, fontWeight: 600 }}>
                    Book Now <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(43,29,24,0.55)',
              backdropFilter: 'blur(4px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="card"
              style={{ maxWidth: 460, width: '100%', padding: '28px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  border: '1px solid var(--taupe-light)',
                  background: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={16} color="var(--espresso)" />
              </button>

              {confirmed ? (
                /* Confirmation view */
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: 'center', paddingTop: 12 }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      background: 'linear-gradient(135deg, #8A9A7E, #5A6E52)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 18px',
                    }}
                  >
                    <Check size={26} color="#fff" strokeWidth={2.5} />
                  </div>
                  <h2 className="font-display" style={{ fontSize: 24, fontWeight: 500, color: 'var(--espresso)', marginBottom: 8 }}>
                    Booking Confirmed!
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--taupe)', lineHeight: 1.55 }}>
                    Your appointment with <strong style={{ color: 'var(--espresso)' }}>{selected.name}</strong> is set for{' '}
                    <strong style={{ color: 'var(--espresso)' }}>{chosenDate ? formatDate(chosenDate) : ''}</strong> at{' '}
                    <strong style={{ color: 'var(--espresso)' }}>{chosenTime}</strong>.
                  </p>
                  <div style={{ marginTop: 22 }}>
                    <button className="btn-primary" onClick={closeModal} style={{ width: '100%', justifyContent: 'center' }}>
                      Done
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Booking form */
                <>
                  {/* Artist header */}
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 22, paddingRight: 32 }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: selected.avatarGradient,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontFamily: 'var(--font-display)',
                        fontSize: 18,
                        fontWeight: 500,
                      }}
                    >
                      {selected.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-display" style={{ fontSize: 19, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.2 }}>
                        {selected.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                        <span className="badge badge-terracotta">{selected.specialty}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12 }}>
                          <Star size={11} color="#C15B4A" fill="#C15B4A" />
                          <strong>{selected.rating}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date selection */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                      <Calendar size={14} color="var(--terracotta)" />
                      <span className="eyebrow-terracotta">Select a Date</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {selected.availableDates.map((d) => (
                        <button
                          key={d.date}
                          onClick={() => { setChosenDate(d.date); setChosenTime(null); }}
                          style={{
                            padding: '12px 16px',
                            borderRadius: 10,
                            border: `2px solid ${chosenDate === d.date ? 'var(--terracotta)' : 'var(--taupe-light)'}`,
                            background: chosenDate === d.date ? 'rgba(193,91,74,0.06)' : '#fff',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: 13,
                            fontWeight: 600,
                            color: chosenDate === d.date ? 'var(--terracotta)' : 'var(--espresso)',
                            transition: 'all 140ms ease',
                          }}
                        >
                          {formatDate(d.date)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time selection */}
                  <AnimatePresence>
                    {chosenDate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden', marginBottom: 22 }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                          <Clock size={14} color="var(--terracotta)" />
                          <span className="eyebrow-terracotta">Select a Time</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {(selected.availableDates.find((d) => d.date === chosenDate)?.slots ?? []).map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setChosenTime(slot)}
                              style={{
                                padding: '9px 16px',
                                borderRadius: 9,
                                border: `2px solid ${chosenTime === slot ? 'var(--terracotta)' : 'var(--taupe-light)'}`,
                                background: chosenTime === slot ? 'rgba(193,91,74,0.06)' : '#fff',
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 600,
                                color: chosenTime === slot ? 'var(--terracotta)' : 'var(--espresso)',
                                transition: 'all 140ms ease',
                              }}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    className="btn-primary"
                    onClick={handleBook}
                    disabled={!chosenDate || !chosenTime}
                    style={{ width: '100%', justifyContent: 'center', opacity: chosenDate && chosenTime ? 1 : 0.4 }}
                  >
                    Confirm Appointment
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

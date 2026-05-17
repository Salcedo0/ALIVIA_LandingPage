import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './PhoneMockup.module.css';

const C = {
  primary: '#0A2463',
  primaryDeep: '#0D3080',
  accent: '#3DDC84',
  bg: '#F8FAFB',
  human: '#FF6B6B',
  dark: '#080C14',
  text: '#1A1A2E',
  muted: '#6B7280',
  surface: '#FFFFFF',
  border: 'rgba(10,36,99,0.08)',
};

const FONT = "'Inter', -apple-system, system-ui, sans-serif";
const PHONE_W = 390;
const PHONE_H = 844;
const STATUS_PAD = 60;

const Icon = {
  search: (s = 20, c = C.muted) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={c} strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  calendar: (s = 22, c = C.primary) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="3" stroke={c} strokeWidth="2" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  video: (s = 22, c = C.primary) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="14" height="12" rx="3" stroke={c} strokeWidth="2" />
      <path d="M16 10l5-3v10l-5-3" stroke={c} strokeWidth="2" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  book: (s = 22, c = C.primary) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 5a2 2 0 012-2h6v18H6a2 2 0 01-2-2V5z" stroke={c} strokeWidth="2" />
      <path d="M20 5a2 2 0 00-2-2h-6v18h6a2 2 0 002-2V5z" stroke={c} strokeWidth="2" />
    </svg>
  ),
  stethoscope: (s = 22, c = C.primary) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 3v6a5 5 0 0010 0V3" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 14v2a4 4 0 008 0v-3" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="11" r="2" stroke={c} strokeWidth="2" />
    </svg>
  ),
  star: (s = 14, c = '#F5B400') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7-6.3-3.6L5.7 21l1.5-7L2 9.3l7-.8L12 2z" />
    </svg>
  ),
  back: (s = 20, c = C.text) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M14 6l-6 6 6 6" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: (s = 64, c = '#fff') => (
    <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
      <path d="M16 33l11 11 22-24" stroke={c} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pin: (s = 14, c = C.muted) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" stroke={c} strokeWidth="1.8" />
      <circle cx="12" cy="9" r="2.5" stroke={c} strokeWidth="1.8" />
    </svg>
  ),
  mic: (s = 22, c = '#fff') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="3" width="6" height="12" rx="3" fill={c} />
      <path d="M5 11a7 7 0 0014 0M12 18v3" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  camera: (s = 22, c = '#fff') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="14" height="12" rx="3" stroke={c} strokeWidth="2" fill="none" />
      <path d="M16 10l5-3v10l-5-3" stroke={c} strokeWidth="2" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  chat: (s = 22, c = '#fff') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 5h16v11H8l-4 4V5z" stroke={c} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  clock: (s = 16, c = C.muted) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  cardIcon: (s = 18, c = C.muted) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="13" rx="2.5" stroke={c} strokeWidth="1.8" />
      <path d="M2 10h20" stroke={c} strokeWidth="1.8" />
    </svg>
  ),
  bell: (s = 18, c = '#fff') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 9a6 6 0 1112 0v4l1.5 3h-15L6 13V9z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 004 0" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

// ── Status bar + dynamic island overlays ────────────────────
function StatusBar() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 54,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 32px 0', zIndex: 99, pointerEvents: 'none',
      color: '#fff', mixBlendMode: 'difference',
      fontFamily: '-apple-system, system-ui, sans-serif',
    }}>
      <span style={{ fontSize: 15, fontWeight: 600 }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="11" viewBox="0 0 17 11">
          <rect x="0" y="7" width="3" height="4" rx="0.7" fill="#fff" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.7" fill="#fff" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.7" fill="#fff" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.7" fill="#fff" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11">
          <path d="M7.5 3C9.6 3 11.5 3.8 13 5l1-1A8.5 8.5 0 007.5 1.5 8.5 8.5 0 001 4l1 1c1.5-1.2 3.4-2 5.5-2z" fill="#fff" />
          <path d="M7.5 6C8.8 6 9.9 6.5 10.7 7.3l1-1A6 6 0 007.5 4.5 6 6 0 003.3 6.3l1 1C5.1 6.5 6.2 6 7.5 6z" fill="#fff" />
          <circle cx="7.5" cy="9.5" r="1.3" fill="#fff" />
        </svg>
        <svg width="25" height="11" viewBox="0 0 25 11">
          <rect x="0.5" y="0.5" width="21" height="10" rx="2.5" stroke="#fff" strokeOpacity="0.45" fill="none" />
          <rect x="2" y="2" width="18" height="7" rx="1.5" fill="#fff" />
          <path d="M22.5 3.5v4c.7-.3 1.2-1 1.2-2s-.5-1.7-1.2-2z" fill="#fff" fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

// ── 1) HOME ─────────────────────────────────────────────────
function ScreenHome({ goTo }) {
  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: C.bg, fontFamily: FONT, color: C.text,
    }}>
      <div style={{
        background: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDeep} 100%)`,
        padding: `${STATUS_PAD + 8}px 20px 32px`,
        borderRadius: '0 0 28px 28px',
        color: '#fff', position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <button aria-label="Notificaciones" style={{
            width: 40, height: 40, borderRadius: 12, border: 'none',
            background: 'rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center',
            position: 'relative', cursor: 'pointer',
          }}>
            {Icon.bell(20, '#fff')}
            <span style={{
              position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: 4,
              background: C.human, border: '2px solid ' + C.primary,
            }} />
          </button>
          <div style={{
            width: 44, height: 44, borderRadius: 22,
            background: 'linear-gradient(135deg,#FFB6A6 0%, #FF8E72 100%)',
            display: 'grid', placeItems: 'center',
            fontWeight: 600, color: '#fff', fontSize: 16,
            border: '2px solid rgba(255,255,255,0.5)',
          }}>MG</div>
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(61,220,132,0.18)', border: '1px solid rgba(61,220,132,0.5)',
          color: C.accent, fontSize: 12, fontWeight: 600,
          padding: '5px 10px', borderRadius: 999, marginBottom: 14,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: C.accent }} />
          Plan Activo
        </div>

        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: -0.4 }}>
          Buenos días, María 👋
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 15, color: 'rgba(255,255,255,0.72)' }}>
          ¿Cómo te sientes hoy?
        </p>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {['😊 Bien', '😐 Regular', '😟 Mal'].map((m) => (
            <button key={m} style={{
              flex: 1, padding: '9px 0', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.06)', color: '#fff',
              fontSize: 13, fontWeight: 500, fontFamily: FONT, cursor: 'pointer',
            }}>{m}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 20px 100px' }}>
        <div style={{
          background: C.surface, borderRadius: 20, padding: 18,
          boxShadow: '0 6px 24px rgba(10,36,99,0.07), 0 1px 3px rgba(10,36,99,0.04)',
          marginBottom: 28, position: 'relative', zIndex: 2,
          border: '1px solid ' + C.border,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: C.muted, textTransform: 'uppercase' }}>
              Tu próxima cita
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.accent, background: 'rgba(61,220,132,0.12)', padding: '3px 8px', borderRadius: 999 }}>
              En 2 días
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: C.primary,
              display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 600, fontSize: 16,
            }}>AM</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 2 }}>
                Dr. Andrés Morales
              </div>
              <div style={{ fontSize: 13, color: C.muted }}>Cardiólogo</div>
            </div>
          </div>
          <div style={{
            display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: C.text,
            marginBottom: 14, paddingBottom: 14, borderBottom: '1px dashed ' + C.border,
          }}>
            {Icon.calendar(16, C.primary)}
            <span><b style={{ fontWeight: 600 }}>Mar 20 may</b> · 10:00am</span>
            <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, color: C.muted, fontSize: 12 }}>
              {Icon.video(14, C.muted)} Virtual
            </span>
          </div>
          <button onClick={() => goTo(4)} style={{
            width: '100%', padding: '13px 0', borderRadius: 14, border: 'none',
            background: C.accent, color: C.dark, fontWeight: 700, fontSize: 15,
            fontFamily: FONT, cursor: 'pointer',
            boxShadow: `0 4px 12px ${C.accent}59`,
          }}>Unirse a la videollamada</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { icon: Icon.stethoscope(22, C.primary), label: 'Buscar especialista', sub: '120+ médicos', tint: 'rgba(10,36,99,0.06)', action: () => goTo(1) },
            { icon: Icon.calendar(22, C.primary), label: 'Mi agenda', sub: '3 próximas', tint: 'rgba(10,36,99,0.06)' },
            { icon: Icon.video(22, '#0D7A4E'), label: 'Teleconsulta', sub: 'Ahora', tint: 'rgba(61,220,132,0.14)', action: () => goTo(4) },
            { icon: Icon.book(22, C.primary), label: 'Contenido', sub: '+50 artículos', tint: 'rgba(10,36,99,0.06)' },
          ].map((it, i) => (
            <button key={i} onClick={it.action} style={{
              background: C.surface, border: '1px solid ' + C.border, borderRadius: 18,
              padding: '14px 14px 16px', textAlign: 'left', cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(10,36,99,0.03)', fontFamily: FONT,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 11, background: it.tint,
                display: 'grid', placeItems: 'center', marginBottom: 12,
              }}>{it.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.text, lineHeight: 1.25 }}>
                {it.label}
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{it.sub}</div>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.text }}>Contenido para ti</h2>
          <span style={{ fontSize: 13, color: C.primary, fontWeight: 500 }}>Ver todo</span>
        </div>

        <div style={{
          background: C.surface, borderRadius: 18, overflow: 'hidden',
          border: '1px solid ' + C.border, display: 'flex', alignItems: 'stretch',
        }}>
          <div style={{
            width: 110, flexShrink: 0,
            background: 'repeating-linear-gradient(135deg, #E6EBF5 0 8px, #DDE3F0 8px 16px)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
              fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10, color: C.muted,
              textAlign: 'center', padding: 8,
            }}>imagen<br />artículo</div>
          </div>
          <div style={{ padding: '14px 14px', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{
                display: 'inline-block', fontSize: 10, fontWeight: 600, color: C.primary,
                background: 'rgba(10,36,99,0.08)', padding: '3px 7px', borderRadius: 999,
                letterSpacing: 0.3, textTransform: 'uppercase',
              }}>Cardiología</span>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.text, marginTop: 8, lineHeight: 1.3 }}>
                Cómo prevenir la hipertensión
              </div>
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              {Icon.clock(12, C.muted)} 5 min de lectura
            </div>
          </div>
        </div>
      </div>

      <TabBar active="home" />
    </div>
  );
}

// ── 2) BUSCAR ───────────────────────────────────────────────
function ScreenSearch({ goTo }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  const filters = ['Todos', 'Virtual', 'Medellín', 'Disponible hoy', '< $50k'];
  const specialists = [
    { initials: 'AM', bg: C.primary, name: 'Dr. Andrés Morales', spec: 'Cardiólogo', city: 'Medellín', rating: 4.9, reviews: 127, tags: ['Virtual', 'Presencial'], price: '45.000', clickable: true },
    { initials: 'LR', bg: C.accent, name: 'Dra. Laura Ríos', spec: 'Medicina General', city: 'Virtual', rating: 4.8, reviews: 89, tags: ['Virtual', 'Disponible hoy'], price: '30.000' },
  ];

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: C.bg, fontFamily: FONT, color: C.text,
    }}>
      <div style={{
        padding: `${STATUS_PAD + 4}px 20px 16px`,
        background: C.surface, borderBottom: '1px solid ' + C.border,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={() => goTo(0)} aria-label="Atrás" style={{
            width: 38, height: 38, borderRadius: 12, border: '1px solid ' + C.border,
            background: C.surface, display: 'grid', placeItems: 'center', cursor: 'pointer',
          }}>{Icon.back(18)}</button>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.text }}>Especialistas</h1>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: C.bg, border: '1px solid ' + C.border, borderRadius: 14,
          padding: '11px 14px',
        }}>
          {Icon.search(18, C.muted)}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar especialidad o nombre"
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              flex: 1, fontFamily: FONT, fontSize: 14, color: C.text,
            }}
          />
        </div>

        <div style={{
          display: 'flex', gap: 8, marginTop: 14,
          overflowX: 'auto', scrollbarWidth: 'none',
          marginLeft: -20, marginRight: -20, padding: '0 20px',
        }}>
          {filters.map((f) => {
            const active = f === filter;
            return (
              <button key={f} onClick={() => setFilter(f)} style={{
                flexShrink: 0, padding: '8px 14px', borderRadius: 999,
                border: active ? 'none' : '1px solid ' + C.border,
                background: active ? C.primary : C.surface,
                color: active ? '#fff' : C.text,
                fontFamily: FONT, fontSize: 13, fontWeight: active ? 600 : 500,
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}>{f}</button>
            );
          })}
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        padding: '16px 20px 8px',
      }}>
        <span style={{ fontSize: 13, color: C.muted }}>
          <b style={{ color: C.text, fontWeight: 600 }}>24</b> resultados
        </span>
        <span style={{ fontSize: 13, color: C.primary, fontWeight: 500 }}>Mejor valorados ▾</span>
      </div>

      <div style={{ padding: '4px 20px 100px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {specialists.map((s, i) => (
          <div key={i} style={{
            background: C.surface, border: '1px solid ' + C.border, borderRadius: 20,
            padding: 16, display: 'flex', gap: 14,
            boxShadow: '0 1px 3px rgba(10,36,99,0.04)',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 28, background: s.bg,
              color: s.bg === C.accent ? C.dark : '#fff',
              display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 18,
              flexShrink: 0,
            }}>{s.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: C.text }}>{s.name}</div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {s.spec} · {Icon.pin(12, C.muted)} {s.city}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, fontSize: 12, color: C.text }}>
                {Icon.star(13)} <b style={{ fontWeight: 600 }}>{s.rating}</b>
                <span style={{ color: C.muted }}>({s.reviews} reseñas)</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                {s.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: 11, fontWeight: 500, color: C.primary,
                    background: 'rgba(10,36,99,0.06)', padding: '4px 9px', borderRadius: 999,
                  }}>{t}</span>
                ))}
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 14, paddingTop: 14, borderTop: '1px dashed ' + C.border,
              }}>
                <div>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Desde</div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: C.text }}>${s.price}</div>
                </div>
                <button onClick={s.clickable ? () => goTo(2) : undefined} style={{
                  padding: '9px 16px', borderRadius: 12,
                  border: '1.5px solid ' + C.primary, background: 'transparent',
                  color: C.primary, fontFamily: FONT, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                }}>Ver perfil</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 3) PERFIL ───────────────────────────────────────────────
function ScreenProfile({ goTo }) {
  const [selectedSlot, setSelectedSlot] = useState('10:00am');
  const slots = [
    { t: '10:00am', avail: true },
    { t: '11:30am', avail: true },
    { t: '2:00pm', avail: false },
    { t: '3:30pm', avail: true },
    { t: '4:00pm', avail: true },
    { t: '5:30pm', avail: false },
  ];

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: C.surface, fontFamily: FONT, color: C.text,
      position: 'relative',
    }}>
      <div style={{
        background: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDeep} 100%)`,
        padding: `${STATUS_PAD + 4}px 20px 60px`,
        color: '#fff', position: 'relative',
        borderRadius: '0 0 32px 32px',
      }}>
        <button onClick={() => goTo(1)} aria-label="Atrás" style={{
          width: 38, height: 38, borderRadius: 12, border: 'none',
          background: 'rgba(255,255,255,0.14)', display: 'grid', placeItems: 'center', cursor: 'pointer',
          marginBottom: 18,
        }}>{Icon.back(18, '#fff')}</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 84, height: 84, borderRadius: 24,
            background: 'rgba(255,255,255,0.12)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            color: '#fff', display: 'grid', placeItems: 'center',
            fontWeight: 600, fontSize: 30, letterSpacing: -0.5,
          }}>AM</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Dr. Andrés Morales</h1>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>Cardiólogo</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12 }}>
              {Icon.star(12)}
              <b style={{ fontWeight: 600 }}>4.9</b>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>· 127 reseñas · 3 años en ALIVIA</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px', marginTop: -22, position: 'relative', zIndex: 2 }}>
        <div style={{
          background: C.surface, border: '1px solid ' + C.border, borderRadius: 16,
          padding: '10px 14px', display: 'flex', gap: 8, flexWrap: 'wrap',
          boxShadow: '0 6px 24px rgba(10,36,99,0.08)',
        }}>
          {[
            { l: 'Virtual', ok: true },
            { l: 'Presencial', ok: true },
            { l: 'Español', ok: null },
          ].map((t) => (
            <span key={t.l} style={{
              fontSize: 12, fontWeight: 500,
              color: t.ok ? C.primary : C.muted,
              background: t.ok ? 'rgba(10,36,99,0.06)' : 'rgba(107,114,128,0.08)',
              padding: '5px 10px', borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', gap: 5,
            }}>
              {t.ok && <span style={{ color: C.accent }}>✓</span>}
              {t.l}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: C.text, textTransform: 'uppercase', letterSpacing: 0.6 }}>Sobre mí</h2>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: C.muted }}>
          Cardiólogo clínico con énfasis en hipertensión y prevención. Egresado de la
          Universidad de Antioquia con 12 años de experiencia hospitalaria.
        </p>
      </div>

      <div style={{ padding: '20px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {[
          { v: '12+', l: 'años exp.' },
          { v: '2.4k', l: 'consultas' },
          { v: '98%', l: 'recomienda' },
        ].map((s, i) => (
          <div key={i} style={{
            background: C.bg, border: '1px solid ' + C.border, borderRadius: 14,
            padding: '12px 8px', textAlign: 'center',
          }}>
            <div style={{ fontWeight: 600, fontSize: 18, color: C.text }}>{s.v}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.text, textTransform: 'uppercase', letterSpacing: 0.6 }}>
            Disponibilidad — Hoy
          </h2>
          <span style={{ fontSize: 12, color: C.primary, fontWeight: 500 }}>Ver semana</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {slots.map((s) => {
            const sel = s.t === selectedSlot && s.avail;
            return (
              <button key={s.t} disabled={!s.avail}
                onClick={() => setSelectedSlot(s.t)}
                style={{
                  padding: '11px 0', borderRadius: 12, fontFamily: FONT,
                  fontSize: 14, fontWeight: 600, cursor: s.avail ? 'pointer' : 'not-allowed',
                  border: sel ? `2px solid ${C.accent}` : s.avail ? '1.5px solid ' + C.border : '1px solid rgba(107,114,128,0.15)',
                  background: sel ? 'rgba(61,220,132,0.10)' : s.avail ? C.surface : 'rgba(107,114,128,0.06)',
                  color: s.avail ? C.text : C.muted,
                  textDecoration: s.avail ? 'none' : 'line-through',
                }}>
                {s.t}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '20px 20px 120px' }}>
        <div style={{
          background: C.bg, border: '1px solid ' + C.border, borderRadius: 16,
          padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 12, color: C.muted }}>Precio por consulta</div>
            <div style={{ fontWeight: 700, fontSize: 22, color: C.text, marginTop: 2 }}>
              $45.000
            </div>
          </div>
          <div style={{ fontSize: 11, color: C.muted, textAlign: 'right', maxWidth: 130, lineHeight: 1.3 }}>
            Pago seguro · Reembolso si cancelas con 24h
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 20px 24px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%)',
      }}>
        <button onClick={() => goTo(3)} style={{
          width: '100%', padding: '15px 0', borderRadius: 16, border: 'none',
          background: C.accent, color: C.dark, fontWeight: 700, fontSize: 16,
          fontFamily: FONT, cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(61,220,132,0.4)',
        }}>Agendar consulta · {selectedSlot}</button>
      </div>
    </div>
  );
}

// ── 4) CONFIRMADA ───────────────────────────────────────────
function ScreenConfirmed({ goTo }) {
  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: C.bg, fontFamily: FONT, color: C.text,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: `${STATUS_PAD + 32}px 24px 0`, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', placeItems: 'center', marginBottom: 28, position: 'relative' }}>
          <div style={{
            position: 'absolute', width: 180, height: 180, borderRadius: 90,
            background: 'rgba(61,220,132,0.06)',
          }} />
          <div style={{
            position: 'absolute', width: 130, height: 130, borderRadius: 65,
            background: 'rgba(61,220,132,0.12)',
          }} />
          <div style={{
            width: 92, height: 92, borderRadius: 46,
            background: C.accent,
            display: 'grid', placeItems: 'center',
            boxShadow: '0 12px 32px rgba(61,220,132,0.45)',
            position: 'relative',
          }}>
            {Icon.check(54, '#fff')}
          </div>
        </div>

        <h1 style={{
          margin: 0, textAlign: 'center', fontSize: 28, fontWeight: 700,
          color: C.text, letterSpacing: -0.5,
        }}>¡Cita confirmada!</h1>
        <p style={{
          margin: '10px 0 32px', textAlign: 'center', fontSize: 15, color: C.muted,
          lineHeight: 1.5,
        }}>Te enviaremos un recordatorio<br />24 horas antes de tu cita</p>

        <div style={{
          background: C.surface, borderRadius: 22, padding: 20,
          boxShadow: '0 6px 24px rgba(10,36,99,0.08)',
          border: '1px solid ' + C.border,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 16, borderBottom: '1px dashed ' + C.border }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: C.primary,
              display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 600, fontSize: 16,
            }}>AM</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: C.text }}>Dr. Andrés Morales</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Cardiólogo</div>
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700, color: C.accent,
              background: 'rgba(61,220,132,0.12)', padding: '4px 8px', borderRadius: 999,
              letterSpacing: 0.5, textTransform: 'uppercase',
            }}>Confirmada</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
            {[
              { icon: Icon.calendar(16, C.primary), label: 'Fecha', value: 'Martes 20 de mayo, 2026' },
              { icon: Icon.clock(16, C.primary), label: 'Hora', value: '10:00am — 10:30am' },
              { icon: Icon.video(16, C.primary), label: 'Modalidad', value: 'Videollamada' },
              { icon: Icon.cardIcon(16, C.primary), label: 'Total pagado', value: '$45.000 COP' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10, background: 'rgba(10,36,99,0.06)',
                  display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>{row.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.4 }}>{row.label}</div>
                  <div style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{row.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 16, padding: '10px 12px',
            background: 'rgba(10,36,99,0.04)', borderRadius: 10,
            fontSize: 12, color: C.muted, display: 'flex', gap: 8,
          }}>
            <span style={{ color: C.primary, fontWeight: 600 }}>i</span>
            <span>Recibirás un enlace para unirte 10 minutos antes.</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button style={{
          width: '100%', padding: '15px 0', borderRadius: 16, border: 'none',
          background: C.primary, color: '#fff', fontWeight: 600, fontSize: 15,
          fontFamily: FONT, cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(10,36,99,0.25)',
        }}>Ver en mi agenda</button>
        <button onClick={() => goTo(0)} style={{
          width: '100%', padding: '14px 0', borderRadius: 16,
          border: '1.5px solid ' + C.border, background: 'transparent',
          color: C.text, fontWeight: 600, fontSize: 15, fontFamily: FONT, cursor: 'pointer',
        }}>Volver al inicio</button>
      </div>
    </div>
  );
}

// ── 5) TELECONSULTA ─────────────────────────────────────────
function ScreenCall({ goTo, active }) {
  const [muted, setMuted] = useState(false);
  const [camOn, setCamOn] = useState(true);
  const [time, setTime] = useState(222);

  useEffect(() => {
    if (!active) return undefined;
    const id = window.setInterval(() => setTime((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [active]);

  const fmt = (s) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'hidden',
      background: C.dark, fontFamily: FONT, color: '#fff',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 50% 38%, rgba(10,36,99,0.45) 0%, transparent 60%),
                     radial-gradient(circle at 80% 90%, rgba(61,220,132,0.06) 0%, transparent 50%)`,
      }} />

      <div style={{
        position: 'absolute', top: STATUS_PAD + 4, left: 16, right: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 3,
      }}>
        <button onClick={() => goTo(3)} style={{
          padding: '6px 12px 6px 8px', borderRadius: 999, border: 'none',
          background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)',
          color: '#fff', fontFamily: FONT, fontSize: 13, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer',
        }}>
          {Icon.back(16, '#fff')} Minimizar
        </button>
        <div style={{
          padding: '7px 12px', borderRadius: 999,
          background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)',
          display: 'inline-flex', alignItems: 'center', gap: 7,
          fontSize: 13, fontWeight: 600,
        }}>
          <span className={styles.livePulse} style={{
            width: 8, height: 8, borderRadius: 4, background: C.human,
            boxShadow: '0 0 8px ' + C.human,
          }} />
          {fmt(time)}
        </div>
      </div>

      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        paddingBottom: 130,
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: -40, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(61,121,255,0.35) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }} />
          <div className={styles.callRing} style={{
            position: 'absolute', inset: -22, borderRadius: '50%',
            border: '1px solid rgba(98,140,255,0.35)',
          }} />
          <div style={{
            width: 140, height: 140, borderRadius: 70,
            background: 'linear-gradient(140deg, #1B3A8A 0%, #0A2463 100%)',
            display: 'grid', placeItems: 'center', position: 'relative',
            fontWeight: 600, fontSize: 48, color: '#fff', letterSpacing: -1,
            boxShadow: '0 0 60px rgba(61,121,255,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.18)',
          }}>AM</div>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.3 }}>Dr. Andrés Morales</div>
          <div style={{
            fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 6,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: C.accent }} />
            Conectado · Buena conexión
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', right: 14, bottom: 130,
        width: 92, height: 124, borderRadius: 16,
        background: 'linear-gradient(160deg, #2A2F3A 0%, #14171F 100%)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
        display: 'grid', placeItems: 'center',
        overflow: 'hidden', zIndex: 3,
      }}>
        {camOn ? (
          <div style={{
            width: 38, height: 38, borderRadius: 19,
            background: 'linear-gradient(135deg,#FFB6A6,#FF8E72)',
            color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 14,
          }}>M</div>
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, textAlign: 'center', padding: 4 }}>
            cámara<br />apagada
          </div>
        )}
        <div style={{
          position: 'absolute', bottom: 6, left: 8, fontSize: 10, color: 'rgba(255,255,255,0.7)',
          fontWeight: 500,
        }}>Tú</div>
      </div>

      <div style={{
        position: 'absolute', bottom: 36, left: 16, right: 16,
        padding: '14px 18px', borderRadius: 32,
        background: 'rgba(26,26,46,0.78)', backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 14,
        zIndex: 4,
      }}>
        <CallBtn active={!muted} onClick={() => setMuted((m) => !m)} label={muted ? 'Activar' : 'Silenciar'}>
          {muted ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="3" width="6" height="12" rx="3" fill="#fff" />
              <path d="M5 11a7 7 0 0014 0M12 18v3M3 3l18 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : Icon.mic(22, '#fff')}
        </CallBtn>
        <CallBtn active={camOn} onClick={() => setCamOn((c) => !c)} label="Cámara">
          {Icon.camera(22, '#fff')}
        </CallBtn>
        <CallBtn label="Chat">{Icon.chat(22, '#fff')}</CallBtn>
        <button onClick={() => goTo(0)} aria-label="Colgar" style={{
          width: 64, height: 56, borderRadius: 28, border: 'none',
          background: C.human, cursor: 'pointer',
          display: 'grid', placeItems: 'center',
          boxShadow: '0 6px 18px rgba(255,107,107,0.5)',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
            <path d="M21 15.5l-3.4-.5a1.5 1.5 0 01-1.1-.7l-1-1.8a10 10 0 01-7 0l-1 1.8a1.5 1.5 0 01-1.1.7l-3.4.5a1 1 0 01-1.1-.9 11 11 0 0119.2 0 1 1 0 01-1.1.9z" transform="rotate(135 12 12)" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function CallBtn({ children, active = true, onClick, label }) {
  return (
    <button onClick={onClick} aria-label={label} style={{
      width: 56, height: 56, borderRadius: 28,
      background: active ? 'rgba(255,255,255,0.14)' : 'rgba(255,107,107,0.18)',
      display: 'grid', placeItems: 'center', cursor: 'pointer',
      border: active ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,107,107,0.35)',
    }}>{children}</button>
  );
}

function TabBar({ active }) {
  const tabs = [
    { id: 'home', label: 'Inicio', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-3v-7h-8v7H5a2 2 0 01-2-2v-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ) },
    { id: 'search', label: 'Buscar', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ) },
    { id: 'agenda', label: 'Agenda', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ) },
    { id: 'profile', label: 'Perfil', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ) },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 8,
      background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      borderTop: '1px solid ' + C.border,
      display: 'flex', justifyContent: 'space-around',
    }}>
      {tabs.map((t) => {
        const a = t.id === active;
        return (
          <div key={t.id} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: a ? C.primary : C.muted, padding: '6px 12px',
          }}>
            {t.icon}
            <span style={{ fontSize: 10, fontWeight: a ? 600 : 500 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

const SCREEN_TITLES = [
  'Tu salud, en una pantalla',
  'Encuentra el especialista ideal',
  'Conoce a tu médico',
  '¡Cita confirmada!',
  'Consulta donde estés',
];

const SCREEN_LABELS = ['Home', 'Buscar', 'Perfil', 'Confirmada', 'Teleconsulta'];

export default function PhoneMockup({ showDetails = true }) {
  const [current, setCurrent] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const touchStartX = useRef(0);

  const currentTitle = useMemo(() => SCREEN_TITLES[current], [current]);
  const total = SCREEN_TITLES.length;

  useEffect(() => {
    setTitleVisible(false);
    const t = window.setTimeout(() => setTitleVisible(true), 180);
    return () => window.clearTimeout(t);
  }, [current]);

  const goTo = (next) => {
    setCurrent(Math.max(0, Math.min(total - 1, next)));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX.current;
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
  };

  const renderScreen = (i) => {
    switch (i) {
      case 0: return <ScreenHome goTo={goTo} />;
      case 1: return <ScreenSearch goTo={goTo} />;
      case 2: return <ScreenProfile goTo={goTo} />;
      case 3: return <ScreenConfirmed goTo={goTo} />;
      case 4: return <ScreenCall goTo={goTo} active={current === 4} />;
      default: return null;
    }
  };

  return (
    <div className={styles.mockup}>
      <div
        className={styles.phoneFrame}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.phoneScreen}>
          <div
            className={styles.canvas}
            style={{ width: PHONE_W, height: PHONE_H }}
          >
            <div
              className={styles.screensTrack}
              style={{
                width: PHONE_W * total,
                height: PHONE_H,
                transform: `translateX(-${current * PHONE_W}px)`,
              }}
            >
              {SCREEN_TITLES.map((_, i) => (
                <div key={i} className={styles.screen} style={{ width: PHONE_W, height: PHONE_H }}>
                  {renderScreen(i)}
                </div>
              ))}
            </div>
            <StatusBar />
          </div>
          <div className={styles.dynamicIsland} aria-hidden="true" />
          <div className={styles.homeIndicator} aria-hidden="true" />
        </div>
      </div>

      <div className={`${styles.mockupText} ${showDetails ? '' : styles.compactText}`}>
        {showDetails && (
          <>
            <span className={styles.stepLabel}>
              Pantalla <span>{current + 1}</span> / {total} · {SCREEN_LABELS[current]}
            </span>
            <h2 className={titleVisible ? styles.titleVisible : styles.titleHidden}>
              {currentTitle}
            </h2>
            <p>
              Recorre la app de ALIVIA y descubre cómo conectamos a cada colombiano con
              la atención médica que necesita.
            </p>
          </>
        )}

        <div className={styles.mockupNav}>
          <button
            className={styles.navArrow}
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label="Anterior"
          >
            ←
          </button>

          <div className={styles.dots} aria-label="Pantallas del mockup">
            {SCREEN_TITLES.map((title, index) => (
              <button
                className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
                type="button"
                key={title}
                onClick={() => goTo(index)}
                aria-label={`Ir a pantalla ${index + 1}`}
                aria-current={index === current}
              />
            ))}
          </div>

          <button
            className={styles.navArrow}
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
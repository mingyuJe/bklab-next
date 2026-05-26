export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Contact</div>
          <h1>Visit <em>the lab.</em></h1>
          <p>
            We welcome inquiries from prospective students, postdoctoral researchers, and
            collaborators interested in oxide thin films, thermoelectrics, or ferroelectric devices.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            <div className="reveal">
              <div className="contact-info-block">
                <div className="contact-label">Address</div>
                <div className="contact-value">
                  Building L3, Korea Institute of<br />
                  Science and Technology (KIST)<br />
                  5, Hwarang-ro 14-gil, Seongbuk-gu,<br />
                  Seoul, Republic of Korea (02792)
                </div>
              </div>

              <div className="contact-info-block">
                <div className="contact-label">Principal Investigators</div>
                <div className="contact-value">
                  <a href="mailto:shbaek77@kist.re.kr">shbaek77@kist.re.kr</a>
                  <br />
                  <small style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--muted)' }}>
                    Seung-Hyub Baek · 백승협 · L3269
                  </small>
                </div>
                <div className="contact-value" style={{ marginTop: 14 }}>
                  <a href="mailto:thkim79@kist.re.kr">thkim79@kist.re.kr</a>
                  <br />
                  <small style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--muted)' }}>
                    Tae Heon Kim · 김태헌 · L3272
                  </small>
                </div>
              </div>

              <div className="contact-info-block">
                <div className="contact-label">Affiliation</div>
                <div className="contact-value">
                  Electronic and Hybrid Materials<br />
                  Research Center, KIST
                </div>
              </div>

              <div className="contact-info-block">
                <div className="contact-label">Links</div>
                <div className="contact-value">
                  <a href="https://www.kist.re.kr" target="_blank" rel="noopener noreferrer">KIST main site</a>
                  <br />
                  <a href="https://sites.google.com/view/bklab-kist" target="_blank" rel="noopener noreferrer">Legacy Google site</a>
                </div>
              </div>
            </div>

            <div className="contact-map reveal">
              <svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34,102,209,0.08)" strokeWidth="0.5" />
                  </pattern>
                  <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f8fbff" />
                    <stop offset="100%" stopColor="#e6eef9" />
                  </linearGradient>
                </defs>
                <rect width="400" height="380" fill="url(#mapBg)" />
                <rect width="400" height="380" fill="url(#mapgrid)" />
                <path d="M 0 200 Q 100 170, 200 200 T 400 180" stroke="rgba(34,102,209,0.4)" fill="none" strokeWidth="1.5" />
                <path d="M 200 0 L 200 380" stroke="rgba(34,102,209,0.18)" strokeWidth="1" />
                <path d="M 0 260 L 400 280" stroke="rgba(34,102,209,0.12)" strokeWidth="1" />
                <path d="M 60 0 L 90 380" stroke="rgba(34,102,209,0.12)" strokeWidth="0.8" />
                <rect x="160" y="170" width="80" height="60" fill="rgba(34,102,209,0.08)" stroke="#2266d1" strokeWidth="1" rx="4" />
                <text x="200" y="195" textAnchor="middle" fontSize="10" fontFamily="Fraunces, serif" fontWeight="500" fill="#0e1b2a">KIST</text>
                <text x="200" y="212" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#2266d1" letterSpacing="0.1em">Building L3</text>
                <circle cx="200" cy="200" r="8" fill="#2266d1" opacity="0.3">
                  <animate attributeName="r" values="8;18;8" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="200" r="6" fill="#2266d1" />
                <circle cx="200" cy="200" r="2.5" fill="white" />
                <text x="20" y="360" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#64748b" letterSpacing="0.05em">37.5996°N · 127.0455°E</text>
                <text x="380" y="24" textAnchor="end" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#64748b" letterSpacing="0.05em">Seongbuk-gu, Seoul</text>
              </svg>
            </div>
          </div>

          <div className="card reveal" style={{ marginTop: 48, padding: '36px 40px' }}>
            <span className="tag">Joining the lab</span>
            <h2
              style={{
                margin: '14px 0 12px',
                fontFamily: 'var(--serif)',
                fontSize: 28,
                fontWeight: 400,
                letterSpacing: '-0.025em',
              }}
            >
              Prospective students &amp; collaborators
            </h2>
            <p style={{ color: 'var(--muted)' }}>
              Interested in joining BK Lab? We accept Ph.D. and M.S. students through the UST graduate
              program at KIST. Please reach out by email with your CV and a brief description of your research interests.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

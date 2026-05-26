import type { ComponentProps } from 'react';
import Link from 'next/link';
import {
  getMembers,
  getResearch,
  getFacilities,
  getRecentNews,
  formatDate,
} from '@/lib/content';
import MemberCard from '@/components/MemberCard';
import EquipmentCard from '@/components/EquipmentCard';
import CrystalViewer3DClient from '@/components/CrystalViewer3DClient';

export default function Home() {
  const members = getMembers();
  const research = getResearch();
  const facilities = getFacilities();
  const recentNews = getRecentNews(3);

  // Pick 3 featured equipment items (one from each category)
type EquipmentItem = ComponentProps<typeof EquipmentCard>['item'];

type FacilitySection = {
  items?: EquipmentItem[];
};

const allEquipment = Object.values(facilities as Record<string, FacilitySection>).flatMap(
  (section) => (Array.isArray(section.items) ? section.items : [])
);

const getEquipmentText = (item: EquipmentItem) => {
  const record = item as unknown as Record<string, unknown>;

  return [
    record.id,
    record.name,
    record.title,
    record.category,
    record.model,
    record.system,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
};

const findEquipment = (keywords: string[]) =>
  allEquipment.find((item) => {
    const text = getEquipmentText(item);
    return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
  });

const featuredEquipment = [
  findEquipment(['pld', 'pulsed laser deposition']),
  findEquipment(['multi-gun sputter', 'multi gun sputter']),
  findEquipment(['tube furnace', 'furnace']),
].filter((item): item is EquipmentItem => Boolean(item));

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">Korea Institute of Science and Technology</div>
            <h1>
              Engineering <em>oxide heterostructures</em> for next-generation electronics.
            </h1>
            <p className="lead">
              BK Lab investigates multifunctional oxide thin films, thermoelectric materials,
              and ferroelectric devices — connecting atomic-scale materials design with
              device-level functionality.
            </p>
            <div className="actions">
              <Link className="btn primary" href="/research">
                Explore Research
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link className="btn" href="/publications">
                View Publications
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="lab-visual">
              <CrystalViewer3DClient />
            </div>
          </div>
        </div>

        <div className="wrap stats">
          <div className="stat"><b>3</b><span>Research Axes</span></div>
          <div className="stat"><b>263</b><span>Publications</span></div>
          <div className="stat"><b>256</b><span>Patents</span></div>
          <div className="stat"><b>KIST</b><span>Seoul, Korea</span></div>
        </div>
      </section>

      {/* ============ RESEARCH ============ */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="section-num">01 — Research</div>
              <h2 className="section-title">What we<br /><em>investigate.</em></h2>
            </div>
            <p className="section-desc">
              Three core areas serve as quick entry points. Full descriptions and figures
              are on the Research page.
            </p>
          </div>

          <div className="grid three">
            {research.topics.map((topic) => (
              <article key={topic.id} className="card reveal">
                <span className={`tag ${topic.tagColor === 'green' ? 'green' : topic.tagColor === 'violet' ? 'violet' : topic.tagColor === 'amber' ? 'amber' : ''}`}>
                  {topic.tag}
                </span>
                <h3 style={{ marginTop: 16 }}>{topic.title}</h3>
                <p>{topic.summary}</p>
                <p style={{ marginTop: 18 }}>
                  <Link className="btn ghost" href={`/research#${topic.id}`} style={{ padding: '8px 14px', fontSize: 13 }}>
                    Read more →
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PIs ============ */}
      <section className="section tinted">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="section-num">02 — People</div>
              <h2 className="section-title">Principal<br /><em>investigators.</em></h2>
            </div>
            <p className="section-desc">
              BK Lab is jointly led by two principal investigators with complementary expertise.
              Full member list is on the Members page.
            </p>
          </div>

          <div className="grid two">
            {members.pi.map((m) => (
              <div key={m.id} className="reveal">
                <MemberCard member={m} large />
              </div>
            ))}
          </div>

          <p style={{ marginTop: 32 }}>
            <Link className="btn" href="/members">View all members →</Link>
          </p>
        </div>
      </section>

      {/* ============ FEATURED FACILITIES ============ */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="section-num">03 — Facilities</div>
              <h2 className="section-title">Core<br /><em>tools.</em></h2>
            </div>
            <p className="section-desc">
              Representative tools shown here. Full equipment list across ceramic synthesis,
              thin-film growth, and characterization is on the Facilities page.
            </p>
          </div>

          <div className="grid three">
            {featuredEquipment.map((item) => (
              <div key={item!.id} className="reveal">
                <EquipmentCard item={item!} />
              </div>
            ))}
          </div>

          <p style={{ marginTop: 32 }}>
            <Link className="btn" href="/facilities">View all facilities →</Link>
          </p>
        </div>
      </section>

{/* ============ PUBLICATIONS ============ */}
<section className="section tinted">
  <div className="wrap">
    <div className="section-head reveal">
      <div>
        <div className="section-num">04 — Publications</div>
        <h2 className="section-title">
          Research<br />
          <em>outputs.</em>
        </h2>
      </div>
      <p className="section-desc">
        BK Lab maintains a curated record of peer-reviewed publications and patents
        across oxide thin films, thermoelectric materials, and ferroelectric devices.
      </p>
    </div>

    <div className="grid two">
      <Link className="card reveal" href="/publications" style={{ textDecoration: 'none', color: 'inherit' }}>
        <span className="tag">Publications</span>
        <h3 style={{ marginTop: 16, fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 400 }}>
          263 peer-reviewed publications
        </h3>
        <p>
          Browse publications by year, principal investigator, title, author, and journal.
        </p>
        <p style={{ marginTop: 18 }}>
          <span className="btn ghost" style={{ padding: '8px 14px', fontSize: 13 }}>
            View publications →
          </span>
        </p>
      </Link>

      <Link className="card reveal" href="/patents" style={{ textDecoration: 'none', color: 'inherit' }}>
        <span className="tag green">Patents</span>
        <h3 style={{ marginTop: 16, fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 400 }}>
          256 registered and applied patents
        </h3>
        <p>
          Explore intellectual property records related to functional materials,
          thin-film processes, and device technologies.
        </p>
        <p style={{ marginTop: 18 }}>
          <span className="btn ghost" style={{ padding: '8px 14px', fontSize: 13 }}>
            View patents →
          </span>
        </p>
      </Link>
    </div>
  </div>
</section>

      {/* ============ NEWS ============ */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="section-num">05 — News</div>
              <h2 className="section-title">Latest<br /><em>updates.</em></h2>
            </div>
            <p className="section-desc">
              Recent activities, conferences, and milestones from the BK Lab community.
            </p>
          </div>

          <div className="grid three">
            {recentNews.map((n) => (
              <article key={n.slug} className="card news-card reveal">
                <div className="news-date">{formatDate(n.date)}</div>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </article>
            ))}
          </div>

          <p style={{ marginTop: 32 }}>
            <Link className="btn" href="/news">View all news →</Link>
          </p>
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section className="section compact tinted">
        <div className="wrap">
          <div
            className="card reveal"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 32,
              alignItems: 'center',
              flexWrap: 'wrap',
              padding: '36px 40px',
            }}
          >
            <div>
              <span className="tag">06 — Contact</span>
              <h2 style={{ margin: '14px 0 8px', fontFamily: 'var(--serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Visit BK Lab at KIST.
              </h2>
              <p style={{ color: 'var(--muted)' }}>
                Building L3, KIST · 5 Hwarang-ro 14-gil, Seongbuk-gu, Seoul · Republic of Korea
              </p>
            </div>
            <Link className="btn primary" href="/contact">
              Contact page →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

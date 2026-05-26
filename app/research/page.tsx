import Link from 'next/link';
import { getResearch } from '@/lib/content';
import ResearchTopicVisual from '@/components/ResearchTopicVisual';

export const metadata = { title: 'Research' };

const TAG_CLASS: Record<string, string> = {
  blue: '',
  green: 'green',
  amber: 'amber',
  violet: 'violet',
};

export default function ResearchPage() {
  const { overview, topics } = getResearch();

  return (
    <>
      {/* ===== Page Hero ===== */}
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Research</div>
          <h1>
            What we <em>investigate.</em>
          </h1>
          <p>{overview.title_en}</p>
          <p
            style={{
              marginTop: 14,
              color: 'var(--text-faint)',
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: 17,
            }}
          >
            {overview.title_kr}
          </p>
          <div className="subnav">
            <a href="#overview">Overview</a>
            {topics.map((t) => (
              <a key={t.id} href={`#${t.id}`}>
                {t.title}
              </a>
            ))}
            <a href="#publications">Publications</a>
          </div>
        </div>
      </section>

      {/* ===== Overview ===== */}
      <section className="section" id="overview">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="section-num">00 — Overview</div>
              <h2 className="section-title">
                Materials,<br />
                <em>interfaces, and devices.</em>
              </h2>
            </div>
            <p className="section-desc">{overview.lead}</p>
          </div>
        </div>
      </section>

      {/* ===== Three research topics ===== */}
      <section className="section tinted">
        <div className="wrap">
          {topics.map((topic, idx) => (
            <article
              key={topic.id}
              className="card reveal research-topic-card"
              id={topic.id}
              style={{
                marginBottom: idx === topics.length - 1 ? 0 : 32,
                padding: 40,
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 48,
                  alignItems: 'center',
                }}
                className="research-detail-grid"
              >
                {/* Text side */}
                <div>
                  <span className={`tag ${TAG_CLASS[topic.tagColor] || ''}`}>
                    Topic {topic.number} · {topic.tag}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 36,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      margin: '14px 0 6px',
                      fontWeight: 400,
                    }}
                  >
                    {topic.title}
                  </h2>
                  {topic.title_kr && (
                    <p
                      style={{
                        color: 'var(--muted)',
                        fontFamily: 'var(--serif)',
                        fontStyle: 'italic',
                        fontSize: 16,
                        marginBottom: 18,
                      }}
                    >
                      {topic.title_kr}
                    </p>
                  )}
                  <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
                    {topic.description}
                  </p>

                  {/* Keyword chips */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginBottom: 28,
                    }}
                  >
                    {topic.keywords.map((kw, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 999,
                          border: '1px solid var(--line-strong)',
                          fontFamily: 'var(--mono)',
                          fontSize: 11,
                          color: 'var(--ink-soft)',
                          background: 'rgba(255,255,255,0.7)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  <Link className="btn" href="/publications">
                    Related publications →
                  </Link>
                </div>

                {/* Visual side — uses jpg if exists, else SVG fallback */}
                <div
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid var(--line)',
                    background: 'white',
                    aspectRatio: '4 / 3',
                  }}
                >
                  <ResearchTopicVisual
                    id={topic.visual}
                    image={topic.image}
                    alt={topic.title}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Publications CTA ===== */}
      <section className="section" id="publications">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="section-num">04 — Publications</div>
              <h2 className="section-title">
                Full publication<br />
                <em>list.</em>
              </h2>
            </div>
            <p className="section-desc">
              The complete publication list is organized by year and principal investigator.
              Use the Publications page to search, filter, and review the full research output.
            </p>
          </div>

          <div className="card flat reveal" style={{ padding: 32 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div className="news-date" style={{ color: 'var(--accent-2)' }}>
                  Publications
                </div>
                <h3 style={{ marginBottom: 8 }}>Explore all publications</h3>
                <p style={{ margin: 0 }}>
                  Browse the full publication record of BK Lab by year, PI, title, author,
                  and journal.
                </p>
              </div>

              <Link className="btn" href="/publications">
                View Publications →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

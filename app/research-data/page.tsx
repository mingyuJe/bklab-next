import { getResearchData } from '@/lib/content';

export const metadata = { title: 'Research Data' };

export default function ResearchDataPage() {
  const items = getResearchData();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Research Data</div>
          <h1>Shared <em>research resources.</em></h1>
          <p>
            A dedicated space for datasets, supplementary materials, experimental resources,
            and verified research links from BK Lab.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid two">
          {items.map((item) => (
            <article className="research-card reveal" key={item.title}>
              <div className="card-tag">{item.type || 'Resource'}</div>
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
              {item.url && <a className="text-link" href={item.url}>Open resource →</a>}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

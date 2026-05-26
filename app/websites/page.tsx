import { getWebsites } from '@/lib/content';

export const metadata = { title: 'Websites' };

export default function WebsitesPage() {
  const links = getWebsites();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Websites</div>
          <h1>Useful <em>links.</em></h1>
          <p>
            External websites and institutional resources related to BK Lab research and operations.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid two">
          {links.map((link) => (
            <article className="research-card reveal" key={link.title}>
              <div className="card-tag">{link.category || 'Link'}</div>
              <h3>{link.title}</h3>
              {link.description && <p>{link.description}</p>}
              <a className="text-link" href={link.url}>Visit website →</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

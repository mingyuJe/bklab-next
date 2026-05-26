import Link from 'next/link';
import { formatDate, getNewsItems } from '@/lib/cms-content';

export const metadata = { title: 'News' };

export default function NewsPage() {
  const news = getNewsItems();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">News</div>
          <h1>
            Lab <em>news.</em>
          </h1>
          <p>Updates from BK Lab, including publications, awards, conferences, and activities.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {news.length === 0 ? (
            <div className="placeholder">No news posts yet.</div>
          ) : (
            <div className="grid three cms-grid">
              {news.map((item) => {
                const image = item.thumbnail || item.image || item.cover;

                return (
                  <Link
                    className="card flat reveal cms-card"
                    href={`/news/${item.slug}`}
                    key={item.slug}
                  >
                    {image ? (
                      <div className="cms-thumb">
                        <img src={image} alt={item.title} />
                      </div>
                    ) : (
                      <div className="cms-thumb cms-empty">News</div>
                    )}

                    <div className="news-date">
                      {formatDate(item.date)} · {item.category || 'News'}
                    </div>
                    <h3>{item.title}</h3>
                    {item.summary ? <p>{item.summary}</p> : null}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

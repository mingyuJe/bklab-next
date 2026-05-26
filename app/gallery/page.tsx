import Link from 'next/link';
import { formatDate, getGalleryItems } from '@/lib/cms-content';

export const metadata = { title: 'Gallery' };

export default function GalleryPage() {
  const gallery = getGalleryItems();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Gallery</div>
          <h1>
            Life at <em>BK Lab.</em>
          </h1>
          <p>Photos from lab activities, group events, conferences, and experimental imagery.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {gallery.length === 0 ? (
            <div className="grid three">
              <div className="placeholder">
                Photo slot<small>Group outing 2026</small>
              </div>
              <div className="placeholder">
                Photo slot<small>Sports Day</small>
              </div>
              <div className="placeholder">
                Photo slot<small>Experimental imagery</small>
              </div>
            </div>
          ) : (
            <div className="grid three cms-grid">
              {gallery.map((item) => {
                const image = item.cover || item.image || item.thumbnail;

                return (
                  <Link
                    className="card flat reveal cms-card"
                    href={`/gallery/${item.slug}`}
                    key={item.slug}
                  >
                    {image ? (
                      <div className="cms-thumb">
                        <img src={image} alt={item.title} />
                      </div>
                    ) : (
                      <div className="cms-thumb cms-empty">Gallery</div>
                    )}

                    <div className="news-date">
                      {formatDate(item.date)} · {item.category || 'Gallery'}
                    </div>
                    <h3>{item.title}</h3>
                    {item.caption ? <p>{item.caption}</p> : null}
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

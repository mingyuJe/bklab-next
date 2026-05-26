import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  formatDate,
  getGalleryItem,
  getGalleryItems,
  markdownToHtml,
} from '@/lib/cms-content';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getGalleryItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = getGalleryItem(slug);

  return {
    title: item ? item.title : 'Gallery',
  };
}

export default async function GalleryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getGalleryItem(slug);

  if (!item) notFound();

  const image = item.cover || item.image || item.thumbnail;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Gallery</div>
          <h1>{item.title}</h1>
          <p>
            {formatDate(item.date)}
            {item.category ? ` · ${item.category}` : ''}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          {image ? (
            <div className="cms-hero-image">
              <img src={image} alt={item.title} />
            </div>
          ) : null}

          {item.caption ? <p className="cms-lead">{item.caption}</p> : null}

          {item.images?.length ? (
            <div className="cms-photo-grid">
              {item.images.map((photo, index) => (
                <img src={photo} alt={`${item.title} ${index + 1}`} key={`${photo}-${index}`} />
              ))}
            </div>
          ) : null}

          <article
            className="article-body"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(item.body || '') }}
          />

          <p style={{ marginTop: 40 }}>
            <Link className="btn" href="/gallery">
              ← Back to Gallery
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

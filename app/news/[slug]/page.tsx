import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate, getNewsItem, getNewsItems, markdownToHtml } from '@/lib/cms-content';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getNewsItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = getNewsItem(slug);

  return {
    title: item ? item.title : 'News',
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getNewsItem(slug);

  if (!item) notFound();

  const image = item.thumbnail || item.image || item.cover;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">News</div>
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

          {item.summary ? <p className="cms-lead">{item.summary}</p> : null}

          <article
            className="article-body"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(item.body || '') }}
          />

          <p style={{ marginTop: 40 }}>
            <Link className="btn" href="/news">
              ← Back to News
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

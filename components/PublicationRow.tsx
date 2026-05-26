import type { Publication } from '@/lib/content';
import { renderAuthors } from '@/lib/format';

function getIndexLabel(pub: Publication, activePi?: string) {
  const indexByPi = pub.indexByPi || {};

  if (activePi === 'Baek' && indexByPi.Baek) return `#${indexByPi.Baek}`;
  if (activePi === 'Kim' && indexByPi.Kim) return `#${indexByPi.Kim}`;

  const labels: string[] = [];
  if (indexByPi.Baek) labels.push(`B#${indexByPi.Baek}`);
  if (indexByPi.Kim) labels.push(`K#${indexByPi.Kim}`);

  return labels.length ? labels.join(' · ') : `#${pub.id}`;
}

export default function PublicationRow({
  pub,
  activePi = 'all',
}: {
  pub: Publication;
  activePi?: string;
}) {
  const venue = pub.venue || pub.journal || '';
  const details = pub.details || [pub.volume, pub.pages, pub.doi].filter(Boolean).join(' · ');

  return (
    <article className="pub-row" data-pub-row data-year={pub.year} data-pi={pub.pi?.join(' ')}>
      <div className="num">{getIndexLabel(pub, activePi)}</div>

      <div>
        <h3>{pub.title}</h3>
        <p
          className="authors"
          dangerouslySetInnerHTML={{ __html: renderAuthors(pub.authors || '') }}
        />
        <p className="venue">
          <b>{venue}</b>
          {details ? ` · ${details}` : ''}
        </p>
      </div>

      <div className="pub-year">{pub.year}</div>
    </article>
  );
}

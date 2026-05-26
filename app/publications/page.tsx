import { getPublications } from '@/lib/content';
import PublicationsFilter from '@/components/PublicationsFilter';

export const metadata = { title: 'Publications' };

export default function PublicationsPage() {
  const pubs = getPublications();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Publications</div>
          <h1>Selected <em>publications.</em></h1>
          <p>
            Over 190 peer-reviewed publications including Science, Nature Materials, Nature
            Communications, Science Advances, and Advanced Materials. Below is a curated
            selection of high-impact and recent works.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="notice reveal">
            <b>Note:</b> {pubs.length} representative publications are currently shown. The full
            publication list can be imported from Excel, CSV, BibTeX, or the previous website.
          </div>

          <PublicationsFilter publications={pubs} />
        </div>
      </section>
    </>
  );
}

import { getPatents } from '@/lib/content';
import PatentsFilter from '@/components/PatentsFilter';

export const metadata = { title: 'Patents' };

export default function PatentsPage() {
  const patents = getPatents();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Patents</div>
          <h1>
            Intellectual <em>property.</em>
          </h1>
          <p>
            Patents arising from BK Lab research span ferroelectric devices, oxide thin-film
            synthesis, thermoelectric materials, energy devices, and functional materials.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {patents.length === 0 ? (
            <div className="notice reveal">
              Patent records are being prepared. Once verified, application numbers, registration
              numbers, inventors, countries, and status information can be added here.
            </div>
          ) : (
            <PatentsFilter patents={patents} />
          )}
        </div>
      </section>
    </>
  );
}

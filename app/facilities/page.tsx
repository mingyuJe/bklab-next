import { getFacilities } from '@/lib/content';
import EquipmentCard from '@/components/EquipmentCard';

export const metadata = { title: 'Facilities' };

export default function FacilitiesPage() {
  const f = getFacilities();
  const groups = [
    { key: 'ceramic', anchor: 'ceramic', data: f.ceramic },
    { key: 'thinfilm', anchor: 'thinfilm', data: f.thinfilm },
    { key: 'character', anchor: 'character', data: f.character },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Facilities</div>
          <h1>Tools of the <em>trade.</em></h1>
          <p>
            From ceramic synthesis to nanoscale characterization, BK Lab is equipped with a
            comprehensive suite of instruments for materials discovery and device fabrication.
          </p>
          <div className="subnav">
            {groups.map((g) => (
              <a key={g.key} href={`#${g.anchor}`}>
                {g.data.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {groups.map((g) => (
            <section key={g.key} className="facility-group reveal" id={g.anchor}>
              <h2 className="group-title">
                <span>{g.data.title}</span>
                <span>{String(g.data.items.length).padStart(2, '0')} instruments</span>
              </h2>
              <div className="grid three">
                {g.data.items.map((item) => (
                  <EquipmentCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

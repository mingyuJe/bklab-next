import type { Equipment } from '@/lib/content';
import EquipmentIcon from './EquipmentIcon';
import Image from 'next/image';

export default function EquipmentCard({ item }: { item: Equipment }) {
  return (
    <article className="card flat">
      <div className="equipment-img">
        {item.photo ? (
          <Image
            src={item.photo}
            alt={item.name}
            width={400}
            height={300}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <EquipmentIcon name={item.icon} />
        )}
      </div>
      <span className="tag">{item.tag}</span>
      <h3>{item.name}</h3>
      <div className="equipment-model">{item.model}</div>
      <ul className="equipment-specs">
        {item.specs.map((spec, i) => (
          <li key={i}>
            <b dangerouslySetInnerHTML={{ __html: spec.label }} />
            <span>{spec.value}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

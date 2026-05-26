import type { Member } from '@/lib/content';
import Image from 'next/image';

type MemberCardProps = {
  member: Member;
  large?: boolean;
  compact?: boolean;
};

export default function MemberCard({ member, large = false, compact = false }: MemberCardProps) {
  const photoClass = [
    'member-photo',
    large ? 'member-photo-pi' : '',
    compact ? 'member-photo-compact' : '',
    !member.photo ? 'member-photo-placeholder' : '',
  ].filter(Boolean).join(' ');

  return (
    <article className={`member-profile-card ${large ? 'member-profile-card-pi' : ''} ${compact ? 'member-profile-card-compact' : ''}`}>
      {!compact && (
        <div className={photoClass} aria-label={`${member.name_en} photo placeholder`}>
          {member.photo ? (
            <Image
              src={member.photo}
              alt={`${member.name_en} portrait`}
              width={large ? 520 : 420}
              height={large ? 620 : 520}
              sizes={large ? '(max-width: 720px) 100vw, 260px' : '(max-width: 720px) 100vw, 33vw'}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          ) : (
            <span>{member.initials}</span>
          )}
        </div>
      )}

      <div className="member-profile-body">
        {member.role === 'Principal Investigator' && <span className="tag">Principal Investigator</span>}

        <h3>
          {member.title ? `${member.name_en}, ${member.title}` : member.name_en}
        </h3>
        <p className="member-name-kr">{member.name_kr}</p>

        <div className="meta-list member-meta-list">
          {member.role && (
            <span>
              <b>Role</b>
              <span>{member.subtitle || member.role}</span>
            </span>
          )}
          {member.office && (
            <span>
              <b>Office</b>
              <span>{member.office}</span>
            </span>
          )}
          {member.email && (
            <span>
              <b>Email</b>
              <span>
                <a href={`mailto:${member.email}`}>{member.email}</a>
              </span>
            </span>
          )}
          {member.focus && (
            <span>
              <b>Focus</b>
              <span>{member.focus}</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

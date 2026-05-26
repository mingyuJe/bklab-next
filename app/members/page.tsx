import { getMembers } from '@/lib/content';
import MemberCard from '@/components/MemberCard';

export const metadata = { title: 'Members' };

export default function MembersPage() {
  const m = getMembers();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Members</div>
          <h1>The <em>people</em> behind BK Lab.</h1>
          <p>
            Two principal investigators lead a team of Ph.D. candidates, M.S. students,
            undergraduate researchers, and alumni working at the intersection of materials
            science and device engineering.
          </p>
          <div className="subnav">
            <a href="#pi">Principal Investigators</a>
            <a href="#phd">Ph.D. Candidates</a>
            <a href="#ms">M.S. Course</a>
            <a href="#undergrad">Undergraduate</a>
            <a href="#alumni">Alumni</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">

          <section className="members-group reveal" id="pi">
            <h2 className="group-title">
              <span>Principal Investigators</span>
              <span>{String(m.pi.length).padStart(2, '0')}</span>
            </h2>
            <div className="member-grid member-grid-pi">
              {m.pi.map((p) => <MemberCard key={p.id} member={p} large />)}
            </div>
          </section>

          <section className="members-group reveal" id="phd">
            <h2 className="group-title">
              <span>Ph.D. Candidates · Integrated Course</span>
              <span>{String(m.phd.length).padStart(2, '0')}</span>
            </h2>
            <div className="member-grid member-grid-students">
              {m.phd.map((p) => <MemberCard key={p.id} member={p} />)}
            </div>
          </section>

          <section className="members-group reveal" id="ms">
            <h2 className="group-title">
              <span>M.S. Course</span>
              <span>{String(m.ms.length).padStart(2, '0')}</span>
            </h2>
            <div className="member-grid member-grid-students">
              {m.ms.map((p) => <MemberCard key={p.id} member={p} />)}
            </div>
          </section>

          <section className="members-group reveal" id="undergrad">
            <h2 className="group-title">
              <span>Undergraduate Researcher</span>
              <span>{String(m.undergrad.length).padStart(2, '0')}</span>
            </h2>
            <div className="member-grid member-grid-students">
              {m.undergrad.map((p) => <MemberCard key={p.id} member={p} />)}
            </div>
          </section>

          <section className="members-group reveal" id="alumni">
            <h2 className="group-title">
              <span>Alumni</span>
              <span>{String(m.alumni.length).padStart(2, '0')}</span>
            </h2>
            <div className="member-grid member-grid-students">
              {m.alumni.map((p) => <MemberCard key={p.id} member={p} />)}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

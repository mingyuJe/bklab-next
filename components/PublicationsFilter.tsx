'use client';

import { useMemo, useState } from 'react';
import type { Publication } from '@/lib/content';
import PublicationRow from './PublicationRow';

const PI_OPTIONS = [
  { value: 'all', label: 'All PIs' },
  { value: 'Baek', label: 'S.-H. Baek' },
  { value: 'Kim', label: 'T. H. Kim' },
];

export default function PublicationsFilter({ publications }: { publications: Publication[] }) {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('all');
  const [pi, setPi] = useState('all');

  const years = useMemo(() => {
    return Array.from(new Set(publications.map((p) => Number(p.year)).filter(Boolean))).sort(
      (a, b) => b - a
    );
  }, [publications]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return publications.filter((p) => {
      const searchable = [
        p.title,
        p.authors,
        p.venue,
        p.journal,
        p.details,
        String(p.year),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const okQ = !q || searchable.includes(q);
      const okY = year === 'all' || String(p.year) === year;
      const okP =
  pi === 'all' ||
  p.pi?.includes(pi) ||
  (pi === 'Baek' && Boolean(p.indexByPi?.Baek)) ||
  (pi === 'Kim' && Boolean(p.indexByPi?.Kim));

      return okQ && okY && okP;
    });
  }, [publications, query, year, pi]);

  const piCount = useMemo(() => {
    return {
      Baek: publications.filter((p) => Boolean(p.indexByPi?.Baek)).length,
      Kim: publications.filter((p) => Boolean(p.indexByPi?.Kim)).length,
    };
  }, [publications]);

  return (
    <>
      <div className="filterbar reveal visible" style={{ marginTop: 28 }}>
        <input
          className="input"
          placeholder="Search by title, author, or journal..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select className="select" value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="all">All years</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>

        <select className="select" value={pi} onChange={(e) => setPi(e.target.value)}>
          {PI_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="pub-count">
  Showing <b>{filtered.length}</b> of {publications.length} · S.-H. Baek{' '}
  {piCount.Baek} / T. H. Kim {piCount.Kim}
</span>
      </div>

      {/* Do NOT put `reveal` on this list wrapper.
          In this project, dynamically rendered client-side elements with `.reveal`
          can remain opacity: 0 after hydration/navigation. */}
      <div className="pub-list">
        {filtered.map((p) => (
          <PublicationRow key={`${p.id}-${p.indexByPi?.Baek ?? ''}-${p.indexByPi?.Kim ?? ''}`} pub={p} activePi={pi} />
        ))}

        {filtered.length === 0 && (
          <div className="placeholder" style={{ marginTop: 24 }}>
            No publications match your filters.
          </div>
        )}
      </div>
    </>
  );
}

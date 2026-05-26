'use client';

import { useMemo, useState } from 'react';

type Patent = {
  id?: number | string;
  year?: number | string;
  pi?: string[];
  status?: string;
  title?: string;
  title_ko?: string;
  title_en?: string;
  inventors?: string;
  country?: string;
  number?: string;
  numberType?: string;
  registrationNumber?: string;
  applicationNumber?: string;
  date?: string;
  indexByPiStatus?: Record<string, number>;
};

const PI_OPTIONS = [
  { value: 'all', label: 'All PIs' },
  { value: 'Baek', label: 'Baek' },
  { value: 'Kim', label: 'Kim' },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All status' },
  { value: 'registration', label: 'Registered' },
  { value: 'application', label: 'Applied' },
];

function normalizeStatus(status?: string) {
  const value = String(status || '').toLowerCase();

  if (value.includes('register')) return 'registration';
  if (value.includes('application') || value.includes('apply') || value.includes('published')) {
    return 'application';
  }

  return value || 'unknown';
}

function statusLabel(status?: string) {
  const normalized = normalizeStatus(status);

  if (normalized === 'registration') return 'Registered';
  if (normalized === 'application') return 'Applied';

  return status || 'Patent';
}

function statusClass(status?: string) {
  const normalized = normalizeStatus(status);

  if (normalized === 'registration') return 'green';
  if (normalized === 'application') return 'amber';

  return '';
}

function getPatentNumber(patent: Patent) {
  return patent.number || patent.registrationNumber || patent.applicationNumber || '';
}

function getIndexLabel(patent: Patent, activePi: string, activeStatus: string) {
  const indexByPiStatus = patent.indexByPiStatus || {};
  const status = normalizeStatus(patent.status);

  if (activePi !== 'all' && activeStatus !== 'all') {
    const exact = indexByPiStatus[`${activePi}_${activeStatus}`];

    if (exact) return `#${exact}`;
  }

  if (activePi !== 'all') {
    const labels: string[] = [];

    const reg = indexByPiStatus[`${activePi}_registration`];
    const app = indexByPiStatus[`${activePi}_application`];

    if (reg) labels.push(`R#${reg}`);
    if (app) labels.push(`A#${app}`);

    if (labels.length) return labels.join(' · ');
  }

  if (activeStatus !== 'all') {
    const labels: string[] = [];

    for (const pi of ['Baek', 'Kim']) {
      const idx = indexByPiStatus[`${pi}_${activeStatus}`];

      if (idx) labels.push(`${pi[0]}#${idx}`);
    }

    if (labels.length) return labels.join(' · ');
  }

  const labels: string[] = [];

  const baekRegistration = indexByPiStatus.Baek_registration;
  const baekApplication = indexByPiStatus.Baek_application;
  const kimRegistration = indexByPiStatus.Kim_registration;
  const kimApplication = indexByPiStatus.Kim_application;

  if (baekRegistration) labels.push(`B-R#${baekRegistration}`);
  if (baekApplication) labels.push(`B-A#${baekApplication}`);
  if (kimRegistration) labels.push(`K-R#${kimRegistration}`);
  if (kimApplication) labels.push(`K-A#${kimApplication}`);

  if (labels.length) return labels.join(' · ');

  return status === 'registration' ? 'Registered' : 'Applied';
}

function getSortValue(patent: Patent) {
  if (patent.date) return patent.date;
  if (patent.year) return `${patent.year}-00-00`;

  return '0000-00-00';
}

function hasPi(patent: Patent, pi: string) {
  if (pi === 'all') return true;
  if (patent.pi?.includes(pi)) return true;

  const indexByPiStatus = patent.indexByPiStatus || {};

  return Boolean(indexByPiStatus[`${pi}_registration`] || indexByPiStatus[`${pi}_application`]);
}

export default function PatentsFilter({ patents }: { patents: Patent[] }) {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('all');
  const [pi, setPi] = useState('all');
  const [status, setStatus] = useState('all');

  const sortedPatents = useMemo(() => {
    return [...patents].sort((a, b) => getSortValue(b).localeCompare(getSortValue(a)));
  }, [patents]);

  const years = useMemo(() => {
    return Array.from(new Set(sortedPatents.map((p) => Number(p.year)).filter(Boolean))).sort(
      (a, b) => b - a
    );
  }, [sortedPatents]);

  const counts = useMemo(() => {
    return {
      total: patents.length,
      Baek: patents.filter((p) => hasPi(p, 'Baek')).length,
      Kim: patents.filter((p) => hasPi(p, 'Kim')).length,
      registration: patents.filter((p) => normalizeStatus(p.status) === 'registration').length,
      application: patents.filter((p) => normalizeStatus(p.status) === 'application').length,
    };
  }, [patents]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return sortedPatents.filter((patent) => {
      const normalizedStatus = normalizeStatus(patent.status);
      const searchable = [
        patent.title,
        patent.title_ko,
        patent.title_en,
        patent.inventors,
        patent.country,
        patent.number,
        patent.numberType,
        patent.registrationNumber,
        patent.applicationNumber,
        patent.date,
        String(patent.year || ''),
        patent.pi?.join(' '),
        statusLabel(patent.status),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const okQuery = !q || searchable.includes(q);
      const okYear = year === 'all' || String(patent.year) === year;
      const okPi = hasPi(patent, pi);
      const okStatus = status === 'all' || normalizedStatus === status;

      return okQuery && okYear && okPi && okStatus;
    });
  }, [sortedPatents, query, year, pi, status]);

  return (
    <>
      <div className="filterbar reveal visible" style={{ marginTop: 28 }}>
        <input
          className="input"
          placeholder="Search by title, inventor, patent number..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select className="select" value={year} onChange={(event) => setYear(event.target.value)}>
          <option value="all">All years</option>
          {years.map((item) => (
            <option key={item} value={String(item)}>
              {item}
            </option>
          ))}
        </select>

        <select className="select" value={pi} onChange={(event) => setPi(event.target.value)}>
          {PI_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          className="select"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="pub-count">
          Showing <b>{filtered.length}</b> of {counts.total} · Registered {counts.registration} /
          Applied {counts.application}
        </span>
      </div>

      <div className="patent-summary reveal visible">
        <div>
          <b>{counts.total}</b>
          <span>Total patents</span>
        </div>
        <div>
          <b>{counts.Baek}</b>
          <span>Baek</span>
        </div>
        <div>
          <b>{counts.Kim}</b>
          <span>Kim</span>
        </div>
        <div>
          <b>{counts.registration}</b>
          <span>Registered</span>
        </div>
        <div>
          <b>{counts.application}</b>
          <span>Applied</span>
        </div>
      </div>

      <div className="pub-list patent-list">
        {filtered.map((patent) => {
          const number = getPatentNumber(patent);
          const statusText = statusLabel(patent.status);
          const indexLabel = getIndexLabel(patent, pi, status);

          return (
            <article className="pub-row patent-row" key={`${patent.id}-${patent.title}`}>
              <div className="num patent-index">{indexLabel}</div>

              <div>
                <div className="patent-meta-line">
                  <span className={`tag ${statusClass(patent.status)}`}>{statusText}</span>
                  {patent.pi?.length ? (
                    <span className="patent-pi">{patent.pi.join(' · ')}</span>
                  ) : null}
                </div>

                <h3>{patent.title_ko || patent.title}</h3>

                {patent.title_en ? <p className="patent-title-en">{patent.title_en}</p> : null}
                {patent.inventors ? <p className="authors">{patent.inventors}</p> : null}

                <p className="venue">
                  {[patent.country, patent.numberType, number, patent.date].filter(Boolean).join(
                    ' · '
                  )}
                </p>
              </div>

              <div className="pub-year">{patent.year || ''}</div>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <div className="placeholder" style={{ marginTop: 24 }}>
            No patents match your filters.
          </div>
        )}
      </div>
    </>
  );
}

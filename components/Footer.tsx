import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="foot-title">BK Lab</div>
            <p>
              Baek &amp; Kim&apos;s Research Group
              <br />
              Electronic and Hybrid Materials Research Center, KIST
            </p>
            <p style={{ marginTop: 14 }}>
              <a href="mailto:shbaek77@kist.re.kr">shbaek77@kist.re.kr</a>
              <br />
              <a href="mailto:thkim79@kist.re.kr">thkim79@kist.re.kr</a>
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/research">Research</Link></li>
              <li><Link href="/members">Members</Link></li>
              <li><Link href="/facilities">Facilities</Link></li>
              <li><Link href="/publications">Publications</Link></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><Link href="/patents">Patents</Link></li>
              <li><Link href="/news">News</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Affiliations</h4>
            <ul>
              <li><a href="https://www.kist.re.kr" target="_blank" rel="noopener noreferrer">KIST</a></li>
              <li><a href="https://sites.google.com/view/bklab-kist" target="_blank" rel="noopener noreferrer">Legacy site</a></li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <span>© 2026 BK Lab · Korea Institute of Science and Technology</span>
          <span>Seoul · Republic of Korea</span>
        </div>
      </div>
    </footer>
  );
}

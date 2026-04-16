import { useState, useEffect } from 'react'
import { WaveLogo, LogoText } from './Logo'
import styles from './Nav.module.css'

const LINKS = [
  { label: 'Platform',  href: '#lifecycle' },
  { label: 'AI Agents', href: '#agents' },
  { label: 'OCR Engine',href: '#ocr' },
  { label: 'ERP',       href: '#erp' },
  { label: 'Security',  href: '#security' },
  { label: 'Pricing',   href: '#pricing' },
  { label: 'Compare',   href: '#compare' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.logo}>
        <WaveLogo size={52} />
        <LogoText />
      </a>

      {/* Desktop links */}
      <ul className={styles.links}>
        {LINKS.map(l => (
          <li key={l.label}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href="#cta" className={styles.cta}>Get Early Access</a>

        {/* Mobile hamburger */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#cta" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
            Get Early Access →
          </a>
        </div>
      )}
    </nav>
  )
}

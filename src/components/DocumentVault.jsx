const CARDS = [
  {
    icon: '🔒',
    title: 'Encrypted Vault',
    desc: 'AES-256-GCM per-tenant encryption. WORM immutable storage. Content-addressable deduplication.',
  },
  {
    icon: '📁',
    title: 'Version Control',
    desc: 'Every state change creates a tracked version with full diff. Complete rollback capability.',
  },
  {
    icon: '⚖️',
    title: 'Legal Hold',
    desc: 'Freeze any document instantly. Overrides retention policies. E-discovery export ready.',
  },
  {
    icon: '📅',
    title: 'Retention Policies',
    desc: 'Per-country rules (7yr US, 10yr EU). Auto-tiered: Hot → Warm → Cold → Frozen archive.',
  },
  {
    icon: '🔍',
    title: 'Semantic Search',
    desc: 'Full-text (Elasticsearch) + Vector semantic search (Qdrant). Find any invoice instantly.',
  },
  {
    icon: '📋',
    title: 'Chain of Custody',
    desc: 'Every view, download, print, share — timestamped and actor-attributed. SOX-ready audit trail.',
  },
]

export default function DocumentVault() {
  return (
    <section id="security" style={{ padding: '100px 5%', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-label">Built to Pass Every Audit</div>
        <h2 className="section-title" style={{ marginBottom: '.8rem' }}>
          Compliance.<br />
          <span className="grad">Built Right In.</span>
        </h2>
        <p className="section-sub" style={{ marginBottom: '3.5rem' }}>
          Not bolted on. Every document is managed with full enterprise
          lifecycle controls from the moment it arrives.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {CARDS.map(c => (
            <div key={c.title} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: '24px',
              transition: 'all .3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)'
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(139,92,246,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                width: 52,
                height: 52,
                borderRadius: 12,
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {c.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '.5rem' }}>{c.title}</div>
              <div style={{ fontSize: '.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

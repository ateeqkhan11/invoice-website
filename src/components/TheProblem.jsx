const PAINS = [
  {
    stat: '17.4',
    unit: ' days',
    label: 'Average invoice cycle time',
    desc: 'Manual approval chains, email chasing, paper routing — every invoice waits in someone\'s inbox.',
    source: 'Ardent Partners 2024',
  },
  {
    stat: '~8',
    unit: '%',
    label: 'Invoice error rate',
    desc: 'Miskeyed amounts, wrong GL codes, duplicate payments. Each error costs $40–80 to fix.',
    source: 'IOFM 2023',
  },
  {
    stat: '$25',
    unit: '/inv',
    label: 'Fully-loaded manual cost',
    desc: 'Labor, rework, late-payment penalties, missed early-pay discounts — it adds up fast.',
    source: 'APQC bottom quartile',
  },
  {
    stat: '5',
    unit: '%',
    label: 'Invoices paid twice',
    desc: 'Duplicate payments. It\'s the most common AP fraud — and almost entirely invisible without AI.',
    source: 'AFP Payments Fraud Survey 2023',
  },
]

export default function TheProblem() {
  return (
    <section style={{
      padding: '100px 5%',
      background: 'var(--bg)',
      borderTop: '1px solid var(--border-subtle)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-label">The Problem</div>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>
          AP is Broken.<br />
          <span className="grad">Everywhere.</span>
        </h2>
        <p className="section-sub" style={{ marginBottom: '4rem' }}>
          Legacy platforms built on rules and templates weren't designed for
          today's invoice volume, vendor diversity, or fraud sophistication.
          Neither was your AP team's inbox.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}>
          {PAINS.map(p => (
            <div key={p.label} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: '28px',
              transition: 'all .3s',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
              e.currentTarget.style.transform = 'none'
            }}
            >
              {/* Stat */}
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2.8rem',
                fontWeight: 800,
                color: '#EF4444',
                lineHeight: 1,
                marginBottom: '.3rem',
              }}>
                {p.stat}<span style={{ fontSize: '1.4rem' }}>{p.unit}</span>
              </div>
              <div style={{
                fontSize: '.78rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                color: 'var(--text-muted)',
                marginBottom: '.8rem',
              }}>
                {p.label}
              </div>
              <p style={{
                fontSize: '.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '.8rem',
              }}>
                {p.desc}
              </p>
              <div style={{ fontSize: '.72rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Source: {p.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

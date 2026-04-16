const BADGES = [
  {
    icon: '🛡️',
    title: 'SOC 2 Type II',
    sub: 'Security · Availability · Confidentiality',
  },
  {
    icon: '🇪🇺',
    title: 'GDPR Compliant',
    sub: 'EU data residency · Right to erasure',
  },
  {
    icon: '🏥',
    title: 'HIPAA Ready',
    sub: 'PHI handling · BAA available',
  },
  {
    icon: '🏛️',
    title: 'FedRAMP Aligned',
    sub: 'NIST 800-53 controls · ATO pathway',
  },
  {
    icon: '📋',
    title: 'SOX Controls',
    sub: 'Audit trail · Segregation of duties',
  },
  {
    icon: '🔒',
    title: 'ISO 27001',
    sub: 'Information security management',
  },
]

export default function Logos() {
  return (
    <section style={{
      padding: '60px 5%',
      borderTop:    '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'linear-gradient(180deg, var(--bg-card2) 0%, var(--bg) 100%)',
    }}>
      <p style={{
        textAlign: 'center',
        fontSize: '.72rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.18em',
        color: 'var(--text-muted)',
        marginBottom: '2.5rem',
      }}>
        Enterprise-grade security &amp; compliance — built in
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {BADGES.map(b => (
          <div key={b.title} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 12,
            padding: '14px 20px',
            transition: 'all .3s',
            cursor: 'default',
            flex: '1 1 160px',
            maxWidth: 220,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(139,92,246,0.1)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'none'
          }}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{b.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '.85rem', marginBottom: '.15rem' }}>
                {b.title}
              </div>
              <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {b.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

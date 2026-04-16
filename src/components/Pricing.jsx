const PLANS = [
  {
    tier: 'Starter', featured: false,
    price: '$3.20', per: '/invoice',
    volume: 'Up to 2,000 invoices / month',
    support: '+ $1,250 / month · Guided Onboarding',
    desc: 'Ideal for growing AP teams replacing manual processes or legacy templates.',
    features: [
      'All 8 AI agents',
      '1 ERP connector (your choice)',
      'Up to 10 users',
      'Email · Portal · EDI ingestion',
      'Standard analytics dashboard',
      'SOX-ready audit trail',
    ],
    cta: 'Start Free Trial', href: '#cta', style: 'ghost',
  },
  {
    tier: 'Growth', featured: true,
    price: '$2.99', per: '/invoice',
    volume: '2,001 – 8,000 invoices / month',
    support: '+ $2,500 / month · Dedicated CSM',
    desc: 'For mid-market teams ready to go fully touchless across multiple entities.',
    features: [
      'All 8 AI agents',
      '1 ERP connector (your choice)',
      'Unlimited users',
      'Multi-entity support',
      'Advanced analytics + anomaly alerts',
      'AP Discovery included',
      'Priority support SLA',
    ],
    cta: 'Get Started →', href: '#cta', style: 'primary',
  },
  {
    tier: 'Enterprise', featured: false,
    price: 'Custom', per: '',
    volume: '8,000+ invoices / month',
    support: '+ $2,500 / 8K invoices · Strategic Partner',
    desc: 'Multi-region, guaranteed SLAs, and a dedicated customer success team.',
    features: [
      'All 8 AI agents',
      '1 ERP connector (expandable)',
      'Unlimited users & entities',
      'Custom AI training on your data',
      '99.9% uptime SLA',
      'SOC 2 Type II report on request',
      'White-glove onboarding',
      '24/7 enterprise support',
    ],
    cta: 'Contact Sales', href: 'mailto:enterprise@invoaice.io', style: 'ghost',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '100px 5%' }}>
      <div className="text-center">
        <div className="section-label">Pricing</div>
        <h2 className="section-title">Transparent, Usage-Based Pricing.</h2>
        <p className="section-sub mx-auto" style={{ marginBottom: '1rem' }}>
          No per-user fees. No hidden infrastructure charges. No surprise upgrades.
          Pay for what you process — plus one fixed support fee.
        </p>
        <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginBottom: '3.5rem' }}>
          Every plan connects to <strong style={{ color: 'var(--text-secondary)' }}>one ERP of your choice</strong>. Additional connectors available on request.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem', maxWidth: 980, marginLeft: 'auto', marginRight: 'auto',
      }}>
        {PLANS.map(p => (
          <div key={p.tier} style={{
            background: 'var(--bg-card)',
            border: `1px solid ${p.featured ? 'var(--violet-core)' : 'var(--border-subtle)'}`,
            borderRadius: 20, padding: '2rem 2rem 1.8rem', position: 'relative',
            transition: 'all .3s',
            ...(p.featured ? { boxShadow: '0 0 60px rgba(139,92,246,.2)' } : {}),
          }}>
            {p.featured && (
              <div style={{
                position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, var(--violet-deep), var(--violet-bright))',
                color: '#fff', padding: '.3rem 1.2rem', borderRadius: 999,
                fontSize: '.72rem', fontWeight: 700, letterSpacing: '.05em', whiteSpace: 'nowrap',
              }}>Most Popular</div>
            )}

            {/* Tier */}
            <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--text-muted)', marginBottom: '.8rem', fontWeight: 700 }}>
              {p.tier}
            </div>

            {/* Price */}
            <div style={{ marginBottom: '.2rem' }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.8rem', fontWeight: 800 }}>
                {p.price}
              </span>
              <span style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>{p.per}</span>
            </div>

            {/* Volume range */}
            <div style={{ fontSize: '.78rem', color: 'var(--violet-light)', fontWeight: 600, marginBottom: '.3rem' }}>
              {p.volume}
            </div>

            {/* Support fee */}
            <div style={{
              fontSize: '.73rem', color: 'var(--text-muted)',
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)',
              borderRadius: 6, padding: '.25rem .6rem', display: 'inline-block', marginBottom: '1rem',
            }}>
              {p.support}
            </div>

            <p style={{ fontSize: '.83rem', color: 'var(--text-secondary)', marginBottom: '1.6rem', lineHeight: 1.6 }}>
              {p.desc}
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.65rem', marginBottom: '2rem' }}>
              {p.features.map(f => (
                <li key={f} style={{ fontSize: '.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span>{f}
                </li>
              ))}
            </ul>

            <a href={p.href} style={{
              display: 'block', textAlign: 'center', width: '100%', padding: '.85rem',
              borderRadius: 10, fontSize: '.92rem', fontWeight: 600, cursor: 'pointer',
              textDecoration: 'none', transition: 'all .2s',
              ...(p.style === 'primary'
                ? { background: 'linear-gradient(135deg, var(--violet-deep), var(--violet-bright))', color: '#fff', boxShadow: '0 8px 24px rgba(139,92,246,.3)' }
                : { background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }),
            }}>{p.cta}</a>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontSize: '.75rem', color: 'var(--text-muted)', marginTop: '2.5rem' }}>
        All plans include SOX audit trail, 99.5%+ uptime, and a single ERP connector of your choice.
        Each customer tenant is fully isolated. Volume is measured as invoices successfully processed per calendar month.
      </p>
    </section>
  )
}

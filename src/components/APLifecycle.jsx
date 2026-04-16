const STEPS = [
  { icon: '📥', title: 'Ingest',      desc: 'Email · Portal · EDI · SFTP · API · Mobile Scan',                     agent: 'Document Intelligence Agent' },
  { icon: '🧠', title: 'AI Extract',  desc: 'Custom OCR + LayoutLMv3 + LLM-enhanced field extraction',             agent: 'Document Intelligence Agent' },
  { icon: '✅', title: 'Validate',    desc: '15+ checks: duplicates, sanctions, tax, math, vendor whitelist',       agent: 'Validation Agent' },
  { icon: '🔗', title: 'Match',       desc: '2-Way, 3-Way, 4-Way PO matching with tolerance rules',                agent: 'Matching Agent' },
  { icon: '🚨', title: 'Fraud Check', desc: '7-layer screening: BEC, velocity, ghost vendor, round-number',         agent: 'Fraud Detection Agent' },
  { icon: '📋', title: 'Approve',     desc: 'Smart routing, mobile push, SLA escalation, dual-sign controls',      agent: 'Approval Routing Agent' },
  { icon: '🏦', title: 'Post to ERP', desc: 'JDE · EBS · PeopleSoft · SAP · Fusion · D365 · NetSuite',            agent: 'ERP Integration Agent' },
]

const AGENTS = [
  { icon: '🔍', name: 'Document Intelligence' },
  { icon: '🛡️', name: 'Validation' },
  { icon: '🔗', name: 'Matching' },
  { icon: '🚨', name: 'Fraud Detection' },
  { icon: '📋', name: 'Approval Routing' },
  { icon: '🔧', name: 'Exception Resolution' },
  { icon: '⚡', name: 'ERP Integration' },
  { icon: '📁', name: 'DMS' },
]

export default function APLifecycle() {
  return (
    <section id="lifecycle" style={{ padding: '100px 5%', background: 'var(--bg-card2)' }}>

      {/* Heading */}
      <div style={{ textAlign: 'center' }}>
        <div className="section-label">8 AI Agents · Zero Manual Steps</div>
        <h2 className="section-title" style={{ maxWidth: 640, margin: '0 auto 1.2rem' }}>
          Not a Workflow Tool.<br />
          <span className="grad">An Autonomous Agent Swarm.</span>
        </h2>
        <p className="section-sub mx-auto" style={{ marginBottom: '4rem' }}>
          8 specialized AI agents handle every step — from the moment an invoice lands
          to the moment it posts in your ERP. No templates. No rules engines. No babysitting.
        </p>
      </div>

      {/* Pipeline flow */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 0,
        overflowX: 'auto',
        paddingBottom: '8px',
      }}>
        {STEPS.map((s, i) => (
          <div key={s.title} style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', width: 130, padding: '0 8px',
            }}>
              {/* Icon circle */}
              <div style={{
                width: 68, height: 68, borderRadius: '50%',
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.7rem', marginBottom: '.75rem',
                boxShadow: '0 0 24px rgba(139,92,246,0.15)',
                flexShrink: 0,
              }}>
                {s.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: '.95rem', marginBottom: '.25rem' }}>
                {s.title}
              </div>
              <div style={{ fontSize: '.7rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '.4rem' }}>
                {s.desc}
              </div>
              {/* Agent chip */}
              <div style={{
                fontSize: '.62rem', fontWeight: 600,
                color: 'var(--violet-light)',
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: 999, padding: '.2rem .6rem',
                whiteSpace: 'nowrap', overflow: 'hidden',
                textOverflow: 'ellipsis', maxWidth: 118,
              }}>
                {s.agent}
              </div>
            </div>

            {/* Arrow */}
            {i < STEPS.length - 1 && (
              <div style={{
                fontSize: '1.1rem', color: 'var(--violet-core)',
                marginTop: 22, flexShrink: 0, opacity: 0.5,
              }}>
                →
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 8-agent compact strip */}
      <div style={{
        marginTop: '4rem',
        padding: '1.8rem 2rem',
        background: 'rgba(139,92,246,0.05)',
        border: '1px solid rgba(139,92,246,0.15)',
        borderRadius: 16,
        maxWidth: 900,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <p style={{
          textAlign: 'center', fontSize: '.7rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '.15em',
          color: 'var(--text-muted)', marginBottom: '1.4rem',
        }}>
          The 8 Specialized AI Agents Behind Every Invoice
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', gap: '.75rem',
        }}>
          {AGENTS.map(a => (
            <div key={a.name} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 999, padding: '.4rem 1rem',
              fontSize: '.8rem', fontWeight: 500,
              transition: 'all .25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
              e.currentTarget.style.color = 'var(--violet-light)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
              e.currentTarget.style.color = 'inherit'
            }}
            >
              <span style={{ fontSize: '1rem' }}>{a.icon}</span>
              {a.name} Agent
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

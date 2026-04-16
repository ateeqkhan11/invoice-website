const AGENTS = [
  {
    icon: '🔍',
    name: 'Document Intelligence Agent',
    bullets: ['Custom OCR pipeline', 'Layout detection', 'Semantic extraction', 'Confidence scoring'],
  },
  {
    icon: '🛡️',
    name: 'Validation Agent',
    bullets: ['15+ real-time checks', 'Vendor whitelist', 'Tax compliance', 'OFAC sanctions'],
  },
  {
    icon: '🔗',
    name: 'Matching Agent',
    bullets: ['2/3/4-way PO matching', 'Real-time GRN fetch', 'Partial match handling'],
  },
  {
    icon: '🚨',
    name: 'Fraud Detection Agent',
    bullets: ['Behavioral anomaly scoring', 'Ghost vendor detection', 'Round-number analysis'],
  },
  {
    icon: '📋',
    name: 'Approval Routing Agent',
    bullets: ['Rule-based multi-tier routing', 'Mobile push', 'SLA tracking', 'Auto-escalation'],
  },
  {
    icon: '🔧',
    name: 'Exception Resolution Agent',
    bullets: ['Root-cause analysis', 'Auto-resolve suggestions', 'Vendor communication'],
  },
  {
    icon: '⚡',
    name: 'ERP Integration Agent',
    bullets: ['Adapter selection', 'Payload mapping', 'Retry logic', 'Document # reconciliation'],
  },
  {
    icon: '📁',
    name: 'DMS Agent',
    bullets: ['Document vault', 'Version control', 'Retention enforcement', 'Legal hold'],
  },
]

export default function AgentSwarm() {
  return (
    <section id="agents" style={{
      padding: '100px 5%',
      background: 'linear-gradient(180deg, var(--bg) 0%, rgba(91,33,182,.05) 50%, var(--bg) 100%)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '4rem',
        alignItems: 'start',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {/* Left: Heading + Orchestrator */}
        <div>
          <div className="section-label">8-Agent AI Swarm</div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Not a Workflow Tool.<br />
            <span className="grad">An Agent Swarm.</span>
          </h2>
          <p style={{
            fontSize: '.95rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '3rem',
          }}>
            8 specialized AI agents that reason, plan, collaborate and self-heal —
            processing every invoice including exceptions, autonomously.
          </p>

          {/* Orchestrator circle */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--violet-deep), var(--violet-bright))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 60px rgba(139,92,246,0.45)',
              border: '2px solid rgba(255,255,255,0.15)',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '.3rem' }}>🎯</div>
              <div style={{ fontSize: '.75rem', fontWeight: 700, textAlign: 'center', lineHeight: 1.3, padding: '0 8px' }}>
                Orchestrator<br />Agent
              </div>
            </div>
          </div>
        </div>

        {/* Right: 2-col agent grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}>
          {AGENTS.map(a => (
            <div key={a.name} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 14,
              padding: '20px',
              transition: 'all .3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(139,92,246,0.1)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'none'
            }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.6rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{a.icon}</span>
                <div style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)' }}>
                  {a.name}
                </div>
              </div>
              <div style={{ fontSize: '.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {a.bullets.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

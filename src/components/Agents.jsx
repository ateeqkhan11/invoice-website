const AGENTS = [
  { n:'01', name:'DocumentIntelligenceAgent', desc:'OCR extraction with vendor-adaptive learning. Gets faster and more accurate with every invoice from each supplier.' },
  { n:'02', name:'FraudDetectionAgent', desc:'7+ fraud checks per invoice. BEC patterns, velocity anomalies, duplicate detection, new payee flags. Risk score 0–1.' },
  { n:'03', name:'ValidationAgent', desc:'Enforces business rules: mandatory fields, date logic, currency consistency, Tax ID format, payment term validity.' },
  { n:'04', name:'MatchingAgent', desc:'2-way (PO) and 3-way (PO + GRN) matching with per-category tolerances. Line-by-line variance reporting.' },
  { n:'05', name:'ApprovalRoutingAgent', desc:'Determines the correct approver by amount, type, department, and entity. Enforces SLAs and auto-escalates.' },
  { n:'06', name:'ExceptionResolutionAgent', desc:'Auto-resolves common exceptions — minor PO variances, missing PO suggestions — without human intervention.' },
  { n:'07', name:'ERPPostingAgent', desc:'Formats and posts approved invoices directly to Oracle, SAP, NetSuite, Dynamics 365, and JDE. Returns transaction IDs.' },
  { n:'08', name:'RAGAssistantAgent (Aria)', desc:'Answers any AP question in plain English using your company\'s policy documents + platform knowledge. Voice-enabled.' },
]

export default function Agents() {
  return (
    <section id="agents" style={{
      padding:'100px 5%',
      background:'linear-gradient(180deg,var(--bg) 0%,rgba(91,33,182,.05) 50%,var(--bg) 100%)'
    }}>
      <div className="text-center">
        <div className="section-label">8-Agent AI Swarm</div>
        <h2 className="section-title">Not a Bot. A Swarm.</h2>
        <p className="section-sub mx-auto">
          Eight specialized agents run in parallel on every invoice. Each contributes its verdict.
          No single point of failure. No black box.
        </p>
      </div>
      <div style={{
        display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',
        gap:'1rem',marginTop:'3.5rem'
      }}>
        {AGENTS.map(a => (
          <div key={a.n} style={{
            background:'var(--bg-card)',border:'1px solid var(--border-subtle)',
            borderRadius:14,padding:22,display:'flex',gap:16,alignItems:'flex-start',
            transition:'all .3s'
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.boxShadow='0 8px 30px rgba(139,92,246,.08)'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-subtle)';e.currentTarget.style.boxShadow='none'}}
          >
            <div style={{
              width:36,height:36,borderRadius:8,flexShrink:0,
              background:'linear-gradient(135deg,var(--violet-deep),var(--violet-bright))',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:'.8rem',fontWeight:700,color:'#fff'
            }}>{a.n}</div>
            <div>
              <div style={{fontWeight:600,fontSize:'.95rem',marginBottom:'.3rem'}}>{a.name}</div>
              <div style={{fontSize:'.82rem',color:'var(--text-secondary)',lineHeight:1.5}}>{a.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

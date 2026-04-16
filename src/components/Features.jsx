import { useRef, useEffect } from 'react'
import styles from './Features.module.css'

const FEATURES = [
  { icon:'🔍', title:'AI-Native OCR', desc:'Vendor-adaptive document intelligence that learns each supplier\'s invoice layout. No templates to maintain — ever. 95%+ field accuracy from day one, exceeding 99% within 60 days of learning your supplier base.' },
  { icon:'🛡️', title:'Fraud Detection', desc:'7-layer fraud screening on every invoice: BEC patterns, velocity anomalies, duplicate detection, new payee account flags, and round-number pattern analysis.' },
  { icon:'🔗', title:'3-Way Matching', desc:'Instant PO + GRN matching with configurable tolerances by category. Full match auto-approves. Partial match routes intelligently to the right person.' },
  { icon:'⚡', title:'ERP Integration', desc:'InvoAIce maintains a growing library of native ERP connectors — Oracle Fusion, SAP S/4HANA, JD Edwards, NetSuite, Dynamics 365, and more. During onboarding you select your ERP and go live. No middleware, no CSV exports, no manual posting.' },
  { icon:'✅', title:'Smart Approvals', desc:'Configurable authority matrix with amount tiers, dual-signature for $50K+, out-of-office delegation, and SLA-based escalation. SOX controls built in.' },
  { icon:'🤖', title:'Aria AI Assistant', desc:'Ask anything in plain English. "Why was this invoice held?" "Who approves Oracle invoices over $100K?" Aria answers from your policies and platform data instantly.' },
  { icon:'📊', title:'Real-Time Analytics', desc:'Live spend analytics, Days Payable Outstanding trends, early payment discount tracking, fraud risk heat maps, and AP health assessments — all in one dashboard.' },
  { icon:'🚀', title:'AP Discovery', desc:'Point InvoAIce at your ERP. In 90 seconds, get a full competitive analysis of your current platform, migration readiness score, and projected annual savings.' },
  { icon:'🏢', title:'Multi-Entity Ready', desc:'Full multi-tenant, multi-entity, multi-currency support. Each entity gets isolated data, its own approval chains, ERP connections, and entity-specific analytics.' },
]

function FeatureCard({ icon, title, desc }) {
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { ref.current?.classList.add(styles.visible); obs.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" style={{padding:'100px 5%'}}>
      <div className="text-center">
        <div className="section-label">Platform Features</div>
        <h2 className="section-title">Everything AP Needs.<br/>Nothing It Doesn't.</h2>
        <p className="section-sub mx-auto" style={{marginBottom:'3.5rem'}}>From receipt to ERP posting — fully automated, fully audited, fully compliant.</p>
      </div>
      <div className={styles.grid}>
        {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
      </div>
    </section>
  )
}

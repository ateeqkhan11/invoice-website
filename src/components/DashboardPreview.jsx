import { useRef, useEffect } from 'react'
import styles from './DashboardPreview.module.css'

const STAGES = [
  { label: 'Intake',       cls: 'ocr',   count: 8,     sub: 'Received' },
  { label: 'OCR',         cls: 'ai',    count: 5,     sub: 'Extracting' },
  { label: 'Validate',    cls: 'match', count: 12,    sub: 'Checking' },
  { label: 'Fraud Check', cls: 'fraud', count: 2,     sub: 'Screening' },
  { label: 'Match',       cls: 'match', count: 7,     sub: '3-Way Match' },
  { label: 'Approval',    cls: 'pend',  count: 4,     sub: 'Pending' },
  { label: 'Posted',      cls: 'done',  count: 1051,  sub: 'Complete' },
]

export default function DashboardPreview() {
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { ref.current?.classList.add(styles.visible); obs.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={styles.wrap}>
      {/* Section intro */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="section-label">Live Dashboard</div>
        <h2 className="section-title" style={{ marginBottom: '.6rem' }}>Your AP Command Center.</h2>
        <p className="section-sub mx-auto">
          Real-time visibility into every invoice — from the moment it arrives
          to the moment it posts in your ERP.
        </p>
      </div>

      <div ref={ref} className={styles.card}>
        <div className={styles.header}>
          <div className={styles.dots}><span/><span/><span/></div>
          <div className={styles.url}>app.invoaice.io/dashboard</div>
        </div>
        <div className={styles.body}>
          {[
            { label:'Total Invoices (MTD)', value:'2,847', sub:'↑ 18% vs last month', subCls:'green' },
            { label:'Auto-Approved',        value:'90.1%', sub:'↑ 4.2pts improvement', subCls:'green' },
            { label:'Fraud Flagged',        value:'3',     sub:'↑ 0% vs last month',   subCls:'muted' },
            { label:'Exceptions',           value:'12',    sub:'↓ 29% vs last month',  subCls:'green' },
          ].map(m => (
            <div key={m.label} className={styles.metric}>
              <div className={styles.mLabel}>{m.label}</div>
              <div className={styles.mValue}>{m.value}</div>
              <div className={`${styles.mSub} ${styles[m.subCls]}`}>{m.sub}</div>
            </div>
          ))}
          <div className={styles.pipeline}>
            <div className={styles.pipeTitle}>Live Processing Pipeline</div>
            <div className={styles.stages}>
              {STAGES.map((s, i) => (
                <div key={s.label} className={styles.stage}>
                  <span className={`${styles.badge} ${styles[s.cls]}`}>{s.label}</span>
                  <div className={styles.stageCount}>{s.count.toLocaleString()}</div>
                  <div className={styles.stageLbl}>{s.sub}</div>
                  {i < STAGES.length - 1 && <span className={styles.arrow}>→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

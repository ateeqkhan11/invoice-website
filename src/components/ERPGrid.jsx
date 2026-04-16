const ERPS = [
  { name: 'Oracle JD Edwards',      detail: 'AIS REST · F0411 Voucher Match' },
  { name: 'Oracle E-Business Suite',detail: 'AP Invoice Interface · REST/SOAP' },
  { name: 'Oracle PeopleSoft',      detail: 'Integration Broker · VCHR_EXPRESS_CI' },
  { name: 'Oracle Fusion Cloud',    detail: 'REST API · AP Invoice Resource' },
  { name: 'SAP S/4HANA',           detail: 'OData · BAPI/RFC · IDocs' },
  { name: 'Microsoft D365 F&O',     detail: 'OData REST · Azure AD OAuth' },
  { name: 'NetSuite',               detail: 'SuiteTalk REST · Vendor Bill' },
  { name: 'Workday',                detail: 'REST WWS · Supplier Invoice' },
  { name: 'Custom ERP',             detail: 'Open Adapter SDK — build your own', custom: true },
]

export default function ERPGrid() {
  return (
    <section id="erp" style={{ padding: '100px 5%', background: 'var(--bg-card2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-label">ERP Integration</div>
        <h2 className="section-title">
          Every ERP.<br />
          <span className="grad">One Platform.</span>
        </h2>
        <p className="section-sub" style={{ marginBottom: '3.5rem' }}>
          An open adapter framework means we connect to any ERP — existing
          or future. Your ERP roadmap never blocks your AP automation.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem',
        }}>
          {ERPS.map(e => (
            <div key={e.name} style={{
              background: e.custom ? 'rgba(139,92,246,0.06)' : 'var(--bg-card)',
              border: `1px solid ${e.custom ? 'rgba(139,92,246,0.3)' : 'var(--border-subtle)'}`,
              borderRadius: 12,
              padding: '18px 20px',
              transition: 'all .3s',
            }}
            onMouseEnter={el => {
              el.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'
              el.currentTarget.style.transform = 'translateY(-2px)'
              el.currentTarget.style.boxShadow = '0 8px 24px rgba(139,92,246,0.1)'
            }}
            onMouseLeave={el => {
              el.currentTarget.style.borderColor = e.custom ? 'rgba(139,92,246,0.3)' : 'var(--border-subtle)'
              el.currentTarget.style.transform = 'none'
              el.currentTarget.style.boxShadow = 'none'
            }}
            >
              <div style={{
                fontWeight: 700,
                fontSize: '.9rem',
                color: e.custom ? 'var(--violet-light)' : 'var(--text-primary)',
                marginBottom: '.3rem',
              }}>
                {e.name}
              </div>
              <div style={{ fontSize: '.75rem', color: 'var(--text-secondary)' }}>
                {e.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

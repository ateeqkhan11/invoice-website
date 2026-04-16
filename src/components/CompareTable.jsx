const ROWS = [
  {
    cap: 'All-in cost / invoice',
    us:      '$2.99–$2.50',
    kofax:   '~$15–18',
    coupa:   '~$9–12',
    tipalti: '~$5–9',
    stampli: '~$4–7',
    manual:  '~$20–27',
  },
  {
    cap: 'Monthly platform (2K inv)',
    us:      '~$7.5K + $1.5K CSM',
    kofax:   '$6–12K license + IT',
    coupa:   '$8–15K subscription',
    tipalti: '$3–5K subscription',
    stampli: '$2–4K subscription',
    manual:  'Staff cost only',
  },
  { cap: 'Touchless rate',       us: '90%+',          kofax: '~40%',             coupa: '~55–65%',         tipalti: '~60–70%',       stampli: '~60–70%',      manual: '0%' },
  { cap: 'Processing time',      us: '14 seconds',     kofax: 'Hours',            coupa: 'Minutes',         tipalti: 'Minutes',       stampli: 'Minutes',      manual: 'Days' },
  { cap: 'AI / ML capability',   us: '✓ 8 agents',    kofax: '⚬ Rule + basic ML', coupa: '⚬ Partial AI',  tipalti: '⚬ Partial AI',  stampli: '⚬ Partial AI', manual: '✗' },
  { cap: 'Fraud screening',      us: '✓ 7-layer',     kofax: '⚬ Basic duplicate', coupa: '⚬ Basic',       tipalti: '⚬ Basic',       stampli: '⚬ Basic',      manual: '✗' },
  { cap: 'Template maintenance', us: '✓ Zero',         kofax: '✗ Ongoing',        coupa: '⚬ Low',          tipalti: '⚬ Low',         stampli: '⚬ Low',        manual: '✗ Manual' },
  { cap: 'ERP integration',      us: '✓ Your ERP, natively', kofax: '⚬ Partial', coupa: '⚬ Via connectors', tipalti: '⚬ Limited ERPs', stampli: '⚬ Via connectors', manual: '✗' },
  { cap: 'Implementation',       us: 'Days, self-service', kofax: '9–18 mo',     coupa: '6–12 mo',         tipalti: '2–4 mo',        stampli: '2–6 wks',      manual: 'N/A' },
  { cap: 'Dedicated CSM',        us: '✓ All plans',   kofax: '⚬ Enterprise only', coupa: '⚬ Enterprise only', tipalti: '⚬ Paid add-on', stampli: '⚬ Enterprise', manual: '✗' },
]

const COLS = [
  { key: 'us',      label: 'InvoAIce',         highlight: true },
  { key: 'kofax',   label: 'Kofax / Tungsten', highlight: false },
  { key: 'coupa',   label: 'Coupa',            highlight: false },
  { key: 'tipalti', label: 'Tipalti',          highlight: false },
  { key: 'stampli', label: 'Stampli',          highlight: false },
  { key: 'manual',  label: 'Manual Process',   highlight: false },
]

function cellColor(val) {
  if (val?.startsWith('✓'))  return 'var(--green)'
  if (val?.startsWith('⚬'))  return '#f59e0b'
  if (val?.startsWith('✗'))  return '#EF4444'
  return 'var(--text-secondary)'
}

export default function CompareTable() {
  return (
    <section id="compare" style={{ background: 'var(--bg-card2)', padding: '100px 5%' }}>
      <div className="text-center">
        <div className="section-label">Comparison</div>
        <h2 className="section-title">How InvoAIce Stacks Up.</h2>
        <p className="section-sub mx-auto">
          Against legacy platforms, modern SaaS, and the true cost of doing nothing.
          Independent analyst data. No spin.
        </p>
      </div>

      {/* Cost callout bar */}
      <div style={{
        marginTop: '2.5rem',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem',
        maxWidth: 900, marginLeft: 'auto', marginRight: 'auto',
      }}>
        {[
          { label: 'vs Manual process',    saving: 'Up to 89% lower cost', color: '#EF4444' },
          { label: 'vs Legacy on-premise', saving: '40–60% lower platform cost', color: '#f59e0b' },
          { label: 'vs Cloud SaaS',        saving: 'Competitive · 8× more AI depth', color: 'var(--violet-light)' },
        ].map(c => (
          <div key={c.label} style={{
            flex: '1 1 220px', padding: '14px 20px',
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 12, textAlign: 'center',
          }}>
            <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', marginBottom: '.3rem' }}>{c.label}</div>
            <div style={{ fontWeight: 700, color: c.color, fontSize: '.95rem' }}>{c.saving}</div>
          </div>
        ))}
      </div>

      <div style={{ overflowX: 'auto', marginTop: '2.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: 16, overflow: 'hidden', minWidth: 900 }}>
          <thead>
            <tr>
              <th style={{ background: 'rgba(139,92,246,.08)', padding: '12px 16px', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, textAlign: 'left', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                Capability
              </th>
              {COLS.map(c => (
                <th key={c.key} style={{
                  background: c.highlight ? 'rgba(139,92,246,.18)' : 'rgba(139,92,246,.08)',
                  padding: '12px 16px', fontSize: '.72rem', textTransform: 'uppercase',
                  letterSpacing: '.1em', fontWeight: 700, textAlign: 'center', whiteSpace: 'nowrap',
                  color: c.highlight ? 'var(--violet-light)' : 'var(--text-secondary)',
                  borderBottom: c.highlight ? '2px solid var(--violet-core)' : 'none',
                }}>
                  {c.label}
                  {c.highlight && <div style={{ fontSize: '.6rem', color: 'var(--violet-light)', opacity: .7, fontWeight: 400, marginTop: 2 }}>★ Best-in-class</div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, ri) => (
              <tr key={r.cap} style={{ borderBottom: '1px solid var(--border-subtle)', background: ri % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                <td style={{ padding: '11px 16px', fontSize: '.85rem', color: 'var(--text-primary)', fontWeight: 500, whiteSpace: 'nowrap' }}>{r.cap}</td>
                {COLS.map(c => {
                  const val = r[c.key]
                  return (
                    <td key={c.key} style={{
                      padding: '11px 16px', fontSize: '.83rem', textAlign: 'center',
                      fontWeight: c.highlight ? 600 : 400,
                      color: c.highlight ? cellColor(val) : 'var(--text-secondary)',
                      background: c.highlight ? 'rgba(139,92,246,0.05)' : 'transparent',
                    }}>
                      {val}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Methodology */}
      <div style={{ marginTop: '2.5rem', padding: '1.75rem 2rem', background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.12)', borderRadius: 12 }}>
        <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--violet-core)', marginBottom: '.9rem' }}>
          Methodology &amp; Data Sources
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', fontSize: '.78rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>InvoAIce ($2.99–$2.50/invoice) — </strong>
            Published per-invoice SaaS list pricing. Starter ($2.99) covers up to 3,000 invoices/month + $1,500/month Guided Onboarding CSM.
            Growth ($3.00) covers 3K–10K + $3,000/month Dedicated CSM. Enterprise ($2.50) is 10K+ with Strategic Partner support.
            Zero infrastructure, zero template maintenance, zero per-user fees. All 8 AI agents, ERP posting, and 7-layer fraud detection included.
          </p>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Cost benchmarks (all vendors) — </strong>
            Fully-loaded TCO estimates per invoice. Sources: Ardent Partners <em>State of ePayables 2024</em>, APQC AP Benchmarking
            Survey 2023–24, Billentis <em>e-Invoice Market Report 2023</em>. Ranges reflect variability by company size,
            complexity, and deployment. Tipalti and Stampli figures based on published pricing and analyst estimates at 2K–5K invoice/month volumes.
          </p>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Manual ($20–$27) — </strong>
            APQC bottom-quartile benchmark for organizations with no automation. Includes direct AP labor,
            exception-handling, error-correction (~8% error rate per IOFM 2023), and missed early-payment discount losses.
            Ardent Partners 2024 average across all companies: $12.88/invoice.
          </p>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Coupa, Tipalti, Stampli — </strong>
            Modern cloud AP platforms. Coupa offers broad spend management with partial AI. Tipalti and Stampli are AP-automation-focused SaaS products
            with partial AI capabilities. TCO estimates amortized per invoice at mid-market volumes. Dedicated CSM is an add-on or enterprise-only
            on each platform; included on all InvoAIce tiers.
          </p>
        </div>
        <p style={{ marginTop: '1.25rem', fontSize: '.72rem', color: 'var(--text-muted)', lineHeight: 1.7, borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <strong style={{ color: 'var(--text-secondary)' }}>Legal Notice: </strong>
          All product and company names — including Kofax, Tungsten Automation, Oracle WebCenter, OpenText, Coupa, Tipalti, and Stampli —
          are trademarks or registered trademarks of their respective owners. InvoAIce is not affiliated with, endorsed by, or sponsored by any
          competing vendor. Cost figures are independently researched estimates based on third-party analyst studies and publicly available information;
          they are not official statements from any referenced vendor. Actual costs vary by organization size, contract terms, invoice complexity,
          and implementation specifics. ✓ = capability present and prominent; ⚬ = partial or limited capability; ✗ = not a primary feature.
        </p>
      </div>
    </section>
  )
}

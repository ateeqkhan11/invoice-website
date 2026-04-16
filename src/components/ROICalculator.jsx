import { useState } from 'react'

// ── Pricing ───────────────────────────────────────────────
function supportMonthly(volPerMonth) {
  if (volPerMonth <= 2000)  return 1250
  if (volPerMonth <= 8000)  return 2500
  return Math.ceil(volPerMonth / 8000) * 2500   // $2.5k per 8K block
}

function invoaicePlatformAnnual(volPerMonth) {
  const rate = volPerMonth <= 2000 ? 3.20
             : volPerMonth <= 8000 ? 2.99
             : 2.00
  return Math.round(volPerMonth * rate * 12)
}

// ── Competitor cost benchmarks — fixed per tier ───────────────────
const MODE_META = {
  legacy: { label: 'Legacy On-Premise',    subtitle: 'e.g. Kofax, OpenText VIM, Oracle WebCenter' },
  cloud:  { label: 'Cloud SaaS Competitor', subtitle: 'e.g. Coupa, Basware, SAP Concur' },
}

function getBenchmarks(mode, vol) {
  if (mode === 'legacy') {
    if (vol <= 2000) return { license: 80000,  infra: 25000,  itSupport: 25000,  proServices: 16000,  clerks: 2, salary: 55000 }
    if (vol <= 8000) return { license: 140000, infra: 60000,  itSupport: 80000,  proServices: 60000,  clerks: 4, salary: 65000 }
    return             { license: 200000, infra: 90000,  itSupport: 120000, proServices: 100000, clerks: 6, salary: 75000 }
  } else {
    // Cloud SaaS: no infra, lower IT/PS, subscription-based
    if (vol <= 2000) return { license: 50000,  infra: 0, itSupport: 10000, proServices: 10000, clerks: 2, salary: 55000 }
    if (vol <= 8000) return { license: 120000, infra: 0, itSupport: 20000, proServices: 18000, clerks: 3, salary: 60000 }
    return             { license: 240000, infra: 0, itSupport: 36000, proServices: 30000, clerks: 5, salary: 68000 }
  }
}

const INIT_VOL  = 2000
const INIT_MODE = 'legacy'
const INIT_B    = getBenchmarks(INIT_MODE, INIT_VOL)


const fmt  = (n) => n < 0 ? `-$${Math.abs(Math.round(n)).toLocaleString()}` : `$${Math.round(n).toLocaleString()}`
const fmtK = (n) => {
  const abs = Math.abs(n)
  const s = abs >= 1_000_000 ? `${(abs/1_000_000).toFixed(1)}M` : abs >= 1000 ? `${Math.round(abs/1000)}K` : `${Math.round(abs)}`
  return (n < 0 ? '-$' : '$') + s
}

function NumInput({ label, value, onChange, step = 1000, min = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <span style={{ fontSize: '.82rem', color: 'var(--text-secondary)', paddingRight: 8 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        <span style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>$</span>
        <input type="number" value={value} min={min} step={step}
          onChange={e => onChange(Math.max(0, +e.target.value))}
          style={{
            background: 'var(--bg-card2)', border: '1px solid var(--border-subtle)',
            borderRadius: 7, padding: '4px 8px', color: 'var(--text-primary)',
            fontSize: '.85rem', fontWeight: 600, width: 90, textAlign: 'right',
            outline: 'none', fontFamily: "'Space Grotesk', sans-serif",
          }}
        />
      </div>
    </div>
  )
}

function Row({ label, current, invoaice, note }) {
  const isZero = invoaice === 0 && current > 0
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '9px 0', borderBottom: '1px solid var(--border-subtle)', alignItems: 'center' }}>
      <span style={{ fontSize: '.8rem', color: 'var(--text-secondary)', paddingLeft: 2 }}>
        {label}
        {note && <span style={{ fontSize: '.65rem', color: 'var(--text-muted)', display: 'block' }}>{note}</span>}
      </span>
      <span style={{ textAlign: 'center', fontSize: '.88rem', fontWeight: 600, color: current === 0 ? 'var(--text-muted)' : 'var(--text-primary)' }}>
        {current === 0 ? '—' : fmt(current)}
      </span>
      <span style={{ textAlign: 'center', fontSize: '.88rem', fontWeight: 600, color: isZero ? 'var(--green)' : 'var(--violet-light)' }}>
        {isZero ? <span>$0 <span style={{ fontSize: '.62rem' }}>✓ Included</span></span> : fmt(invoaice)}
      </span>
    </div>
  )
}

export default function ROICalculator() {
  const [mode,   setMode]   = useState(INIT_MODE)
  const [volume, setVolume] = useState(INIT_VOL)

  const [license,     setLicense]     = useState(INIT_B.license)
  const [infra,       setInfra]       = useState(INIT_B.infra)
  const [itSupport,   setItSupport]   = useState(INIT_B.itSupport)
  const [proServices, setProServices] = useState(INIT_B.proServices)
  const [clerks,      setClerks]      = useState(INIT_B.clerks)
  const [salary,      setSalary]      = useState(INIT_B.salary)
  const [invoaiceClerks, setInvoaiceClerks] = useState(Math.max(1, Math.ceil(INIT_B.clerks / 2)))

  // Optional benefit toggles
  const [showBenefits, setShowBenefits] = useState(false)
  const [avgInvValue,  setAvgInvValue]  = useState(2000)
  const [earlyPayPct,  setEarlyPayPct]  = useState(5)
  const [earlyPayDisc, setEarlyPayDisc] = useState(1.5)
  const [errorRate,    setErrorRate]    = useState(4)

  // ── Auto-fill all inputs from benchmark when slider/mode changes ──
  const applyBenchmarks = (m, v) => {
    const b = getBenchmarks(m, v)
    setLicense(b.license); setInfra(b.infra); setItSupport(b.itSupport)
    setProServices(b.proServices); setClerks(b.clerks); setSalary(b.salary)
    setInvoaiceClerks(Math.max(1, Math.ceil(b.clerks / 2)))
  }

  const handleVolume = (v) => { setVolume(v); applyBenchmarks(mode, v) }
  const switchMode   = (m) => { setMode(m);   applyBenchmarks(m, volume) }

  // ── Calculations ─────────────────────────────────────────
  const apLaborCurrent  = clerks * salary
  const apLaborInvoaice = invoaiceClerks * salary

  const currentPlatform = license + infra + itSupport + proServices
  const currentTotal    = currentPlatform + apLaborCurrent

  const tier = volume <= 2000 ? 'Starter · $3.20/inv' : volume <= 8000 ? 'Growth · $2.99/inv' : 'Enterprise · Negotiated rate'
  const invoaicePlatform = invoaicePlatformAnnual(volume)
  const invoaiceSupport  = supportMonthly(volume) * 12
  const invoaiceTotal    = invoaicePlatform + invoaiceSupport + apLaborInvoaice

  const platformDiff    = currentPlatform - (invoaicePlatform + invoaiceSupport)
  const totalDiff       = currentTotal - invoaiceTotal

  // Additional quantifiable benefits (user-controlled)
  const annualInvSpend  = volume * 12 * avgInvValue
  const earlyPayBenefit = Math.round(annualInvSpend * (earlyPayPct / 100) * (earlyPayDisc / 100))
  const errorBenefit    = Math.round(volume * 12 * (errorRate / 100) * 53)
  const totalBenefit    = totalDiff + (showBenefits ? earlyPayBenefit + errorBenefit : 0)

  const pct = currentTotal > 0 ? Math.round((totalBenefit / currentTotal) * 100) : 0

  return (
    <section style={{ padding: '100px 5%', background: 'var(--bg-card2)' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div className="section-label">Total Cost of Ownership</div>
        <h2 className="section-title" style={{ marginBottom: '.8rem' }}>
          The Real Cost<br /><span className="grad">of Your AP Platform.</span>
        </h2>
        <p className="section-sub" style={{ marginBottom: '3rem' }}>
          License, infrastructure, IT staff, and professional services — the costs most vendors bury.
          InvoAIce eliminates every one of them.
        </p>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {(['legacy', 'cloud']).map(m => (
            <button key={m} onClick={() => switchMode(m)} style={{
              padding: '.5rem 1.4rem', borderRadius: 10, fontWeight: 600, fontSize: '.85rem',
              cursor: 'pointer', transition: 'all .2s', border: '1px solid',
              background: mode === m ? 'linear-gradient(135deg,var(--violet-deep),var(--violet-bright))' : 'transparent',
              borderColor: mode === m ? 'transparent' : 'var(--border-subtle)',
              color: mode === m ? '#fff' : 'var(--text-secondary)',
            }}>{MODE_META[m].label}</button>
          ))}
          <span style={{ fontSize: '.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{MODE_META[mode].subtitle}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'start' }}>

          {/* ── Inputs ── */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '1.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: '.88rem', marginBottom: '1.2rem' }}>
              📋 Your Current Costs <span style={{ fontSize: '.7rem', color: 'var(--text-muted)', fontWeight: 400 }}>(annual unless noted)</span>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginBottom: '.45rem' }}>
                <span>Invoices / Month</span>
                <span style={{ color: 'var(--violet-light)' }}>{volume.toLocaleString()}</span>
              </div>
              <input type="range" min={200} max={20000} step={200} value={volume}
                onChange={e => handleVolume(+e.target.value)} style={{ width: '100%' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.67rem', color: 'var(--text-muted)', marginTop: '.2rem' }}>
                <span>200</span><span>20,000</span>
              </div>
            </div>

            <div style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--text-muted)', padding: '.5rem 0', borderBottom: '1px solid var(--border-subtle)', marginBottom: '.1rem' }}>Platform Costs</div>
            <NumInput label={mode === 'legacy' ? 'Annual license fees' : 'Annual subscription'} value={license} onChange={setLicense} />
            <NumInput label="Infrastructure & hosting" value={infra} onChange={setInfra} />
            <NumInput label="IT maintenance & support staff" value={itSupport} onChange={setItSupport} />
            <NumInput label="Professional services / upgrades" value={proServices} onChange={setProServices} />

            <div style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--text-muted)', padding: '.5rem 0', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0 .1rem' }}>AP Team Labor</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '.82rem', color: 'var(--text-secondary)' }}>AP clerk / specialist headcount</span>
              <input type="number" value={clerks} min={1} step={1} onChange={e => setClerks(Math.max(1, +e.target.value))}
                style={{ background: 'var(--bg-card2)', border: '1px solid var(--border-subtle)', borderRadius: 7, padding: '4px 8px', color: 'var(--text-primary)', fontSize: '.85rem', fontWeight: 600, width: 70, textAlign: 'right', outline: 'none' }} />
            </div>
            <NumInput label="Avg fully-loaded salary (annual)" value={salary} onChange={setSalary} />

            <div style={{ marginTop: '1rem', fontSize: '.72rem', color: 'var(--text-muted)', background: 'rgba(139,92,246,0.05)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '10px 12px', lineHeight: 1.6 }}>
              💡 Fully-loaded cost = salary + benefits + rework time + late-payment penalties
            </div>
          </div>

          {/* ── Comparison ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Table */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginBottom: '.8rem', paddingBottom: '.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)' }}>Cost Category</span>
                <span style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', textAlign: 'center' }}>{MODE_META[mode].label}</span>
                <span style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--violet-light)', textAlign: 'center' }}>InvoAIce</span>
              </div>

              <Row label={mode === 'legacy' ? 'License / Software' : 'Subscription'} current={license}     invoaice={0} />
              <Row label="Infrastructure & Hosting"                                   current={infra}       invoaice={0} />
              <Row label="IT Maintenance & Support Staff"                              current={itSupport}   invoaice={0} />
              <Row label="Professional Services"                                       current={proServices} invoaice={0} />
              <Row label="Platform (InvoAIce)"        note={tier}                     current={0}           invoaice={invoaicePlatform} />
              <Row label="CSM / Support" note={`$${(supportMonthly(volume)/1000).toFixed(1)}K/mo · ${volume<=2000?'Guided Onboarding':volume<=8000?'Dedicated CSM':'Strategic Partner'}`} current={0} invoaice={invoaiceSupport} />
              <Row label={`AP Team Labor — Current (${clerks} FTE × $${salary.toLocaleString()})`}
                   note="Your current headcount cost"
                   current={apLaborCurrent} invoaice={apLaborInvoaice} />

              {/* InvoAIce labor input */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(139,92,246,0.03)', alignItems: 'center' }}>
                <span style={{ fontSize: '.78rem', color: 'var(--violet-light)', paddingLeft: 2, fontStyle: 'italic' }}>
                  ↳ Your est. AP headcount
                  <span style={{ display: 'block', fontSize: '.65rem', color: 'var(--text-muted)' }}>post-automation — your assessment</span>
                </span>
                <span />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <input type="number" value={invoaiceClerks} min={0} step={1}
                    onChange={e => setInvoaiceClerks(Math.max(0, +e.target.value))}
                    style={{ background: 'var(--bg-card2)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: 7, padding: '4px 8px', color: 'var(--violet-light)', fontSize: '.85rem', fontWeight: 700, width: 60, textAlign: 'right', outline: 'none' }}
                  />
                  <span style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>FTE</span>
                </div>
              </div>

              {/* Totals row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingTop: 12, marginTop: 4 }}>
                <span style={{ fontSize: '.82rem', fontWeight: 800, paddingLeft: 2 }}>Total Annual TCO</span>
                <span style={{ textAlign: 'center', fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.25rem', fontWeight: 800, color: '#EF4444' }}>{fmt(currentTotal)}</span>
                <span style={{ textAlign: 'center', fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.25rem', fontWeight: 800, color: 'var(--violet-light)' }}>{fmt(invoaiceTotal)}</span>
              </div>
            </div>

            {/* Platform savings callout */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '1.2rem 1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginBottom: '.25rem' }}>
                    Platform overhead savings
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.9rem', fontWeight: 800, color: platformDiff >= 0 ? 'var(--green)' : '#EF4444', lineHeight: 1 }}>
                    {fmtK(platformDiff)}<span style={{ fontSize: '.9rem' }}>/yr</span>
                  </div>
                  <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', marginTop: '.25rem' }}>License · Infra · IT · PS — vs InvoAIce platform + support</div>
                </div>
                <div>
                  <div style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginBottom: '.25rem' }}>
                    TCO difference (labor held equal)
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.9rem', fontWeight: 800, color: totalDiff >= 0 ? 'var(--green)' : '#EF4444', lineHeight: 1 }}>
                    {fmtK(totalDiff)}<span style={{ fontSize: '.9rem' }}>/yr</span>
                  </div>
                  <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', marginTop: '.25rem' }}>{pct >= 0 ? `${pct}% lower TCO` : 'Gap offset by operational benefits below'}</div>
                </div>
              </div>

              {/* Benefits toggle */}
              <button onClick={() => setShowBenefits(b => !b)} style={{
                width: '100%', padding: '.55rem', borderRadius: 8, fontSize: '.8rem', fontWeight: 600,
                cursor: 'pointer', border: '1px solid rgba(139,92,246,0.3)',
                background: showBenefits ? 'rgba(139,92,246,0.1)' : 'transparent',
                color: 'var(--violet-light)', transition: 'all .2s',
              }}>
                {showBenefits ? '▲ Hide' : '▼ Add'} operational benefit estimates (early payment · error elimination)
              </button>

              {showBenefits && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(139,92,246,0.04)', borderRadius: 10, border: '1px solid rgba(139,92,246,0.12)' }}>
                  <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
                    These are <strong style={{ color: 'var(--text-secondary)' }}>your estimates</strong> based on industry benchmarks. InvoAIce makes no guarantee on these figures — adjust to match your operation.
                  </p>

                  {[
                    { label: 'Avg invoice value ($)', value: avgInvValue, set: setAvgInvValue, step: 100, min: 100 },
                    { label: 'Invoices eligible for early-pay discount (%)', value: earlyPayPct, set: setEarlyPayPct, step: 1, min: 0 },
                    { label: 'Early-pay discount rate (%)', value: earlyPayDisc, set: setEarlyPayDisc, step: 0.5, min: 0 },
                    { label: 'Current invoice error / rework rate (%)', value: errorRate, set: setErrorRate, step: 1, min: 0 },
                  ].map(f => (
                    <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>{f.label}</span>
                      <input type="number" value={f.value} min={f.min} step={f.step}
                        onChange={e => f.set(Math.max(f.min, +e.target.value))}
                        style={{ background: 'var(--bg-card2)', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: '3px 8px', color: 'var(--text-primary)', fontSize: '.82rem', fontWeight: 600, width: 80, textAlign: 'right', outline: 'none' }}
                      />
                    </div>
                  ))}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem', marginTop: '1rem' }}>
                    {[
                      { label: 'Early-pay discount capture', value: earlyPayBenefit, note: 'APQC: automated AP captures 3× more discounts' },
                      { label: 'Error & rework elimination', value: errorBenefit,    note: 'IOFM: avg $53 to resolve per invoice error' },
                    ].map(b => (
                      <div key={b.label} style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 8, padding: '10px 12px' }}>
                        <div style={{ fontSize: '.68rem', color: 'var(--text-muted)', marginBottom: '.2rem' }}>{b.label}</div>
                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.3rem', fontWeight: 800, color: 'var(--green)' }}>+{fmtK(b.value)}<span style={{ fontSize: '.75rem' }}>/yr</span></div>
                        <div style={{ fontSize: '.62rem', color: 'var(--text-muted)', marginTop: '.2rem' }}>{b.note}</div>
                      </div>
                    ))}
                  </div>

                  {/* Grand total */}
                  <div style={{ marginTop: '1rem', padding: '12px', borderRadius: 8, background: totalBenefit > 0 ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.06)', border: `1px solid ${totalBenefit > 0 ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.15)'}`, textAlign: 'center' }}>
                    <div style={{ fontSize: '.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginBottom: '.3rem' }}>
                      Total estimated net benefit
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '2.2rem', fontWeight: 800, color: totalBenefit > 0 ? 'var(--green)' : '#EF4444' }}>
                      {fmtK(totalBenefit)}<span style={{ fontSize: '1rem' }}>/yr</span>
                    </div>
                    <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', marginTop: '.25rem' }}>TCO savings + early-pay + error elimination · your estimates</div>
                  </div>
                </div>
              )}
            </div>

            <p style={{ fontSize: '.68rem', color: 'var(--text-muted)', padding: '0 4px', lineHeight: 1.7 }}>
              AP team labor is held equal on both sides — InvoAIce makes no headcount commitment.
              Platform defaults from Ardent Partners (2024), APQC, Gartner AP Market Guide.
              Early-pay and error benchmarks from IOFM &amp; APQC Research 2024.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

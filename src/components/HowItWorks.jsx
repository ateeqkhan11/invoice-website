const STEPS = [
  { n:'1', title:'Invoice Received',   desc:'Email, upload, or API. PDF, image, or any format. The system handles it automatically.' },
  { n:'2', title:'AI Extraction',      desc:'DocumentIntelligenceAgent reads every field. Vendor-adaptive learning brings accuracy above 99%.' },
  { n:'3', title:'Fraud & Validation', desc:'7-layer fraud screen runs in parallel with business rule validation. Risky invoices are held immediately.' },
  { n:'4', title:'3-Way Match',        desc:'Invoice matched to PO and GRN. Full match auto-approves. Exceptions routed to the right person.' },
  { n:'5', title:'Posted to ERP',      desc:'Approved invoices post directly to your ERP. Full audit trail. No manual entry. No delays.' },
]

export default function HowItWorks() {
  return (
    <section style={{padding:'100px 5%'}}>
      <div className="text-center">
        <div className="section-label">How It Works</div>
        <h2 className="section-title">Invoice In. Insight Out.</h2>
        <p className="section-sub mx-auto">From email attachment to ERP posting in as fast as 14 seconds — fully automated, fully audited.</p>
      </div>
      <div style={{
        display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',
        gap:'2rem',marginTop:'4rem',position:'relative'
      }}>
        <div style={{
          position:'absolute',top:32,left:'10%',right:'10%',height:1,
          background:'linear-gradient(90deg,transparent,var(--violet-core),var(--violet-bright),transparent)'
        }}/>
        {STEPS.map(s => (
          <div key={s.n} style={{textAlign:'center',position:'relative'}}>
            <div style={{
              width:64,height:64,borderRadius:'50%',margin:'0 auto 1.5rem',
              background:'linear-gradient(135deg,var(--violet-deep),var(--violet-bright))',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:"'Space Grotesk',sans-serif",fontSize:'1.4rem',fontWeight:700,
              boxShadow:'0 0 30px rgba(139,92,246,.4)'
            }}>{s.n}</div>
            <div style={{fontWeight:600,fontSize:'1rem',marginBottom:'.5rem'}}>{s.title}</div>
            <div style={{fontSize:'.85rem',color:'var(--text-secondary)',lineHeight:1.6}}>{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

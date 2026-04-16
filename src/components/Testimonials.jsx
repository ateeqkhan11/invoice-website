const TESTIMONIALS = [
  { initials:'SK', quote:'We replaced 9 years of Kofax in 5 weeks. Our touchless rate went from 38% to 91% in the first quarter. The fraud detection alone paid for the first year.', name:'Sarah K.', role:'VP Finance, Manufacturing Co.' },
  { initials:'MR', quote:'We were spending $25 per invoice fully loaded — that\'s labor, rework, and late-payment costs combined. OpenText VIM brought it down to $21 but added a SAP maintenance nightmare. InvoAIce at $4.20 with zero maintenance was a completely different category.', name:'Marcus R.', role:'Director AP, Global Retail Group' },
  { initials:'JP', quote:'Aria AI assistant is genuinely useful. My AP team asks it questions instead of emailing me. Invoice disputes get resolved in seconds. It knows our policies better than our new hires.', name:'Jessica P.', role:'AP Manager, Healthcare Network' },
]

export default function Testimonials() {
  return (
    <section style={{background:'var(--bg-card2)',padding:'100px 5%'}}>
      <div className="text-center">
        <div className="section-label">Customer Stories</div>
        <h2 className="section-title">The Numbers Don't Lie</h2>
      </div>
      <div style={{
        display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',
        gap:'1.5rem',marginTop:'3.5rem'
      }}>
        {TESTIMONIALS.map(t => (
          <div key={t.name} style={{
            background:'var(--bg-card)',border:'1px solid var(--border-subtle)',
            borderRadius:16,padding:28,transition:'all .3s'
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(-3px)'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-subtle)';e.currentTarget.style.transform='none'}}
          >
            <div style={{color:'#F59E0B',fontSize:'.8rem',marginBottom:'.8rem'}}>★★★★★</div>
            <p style={{fontSize:'.95rem',color:'var(--text-secondary)',lineHeight:1.7,marginBottom:'1.5rem',fontStyle:'italic'}}>
              <span style={{fontSize:'2rem',color:'var(--violet-core)',lineHeight:.5,display:'block',marginBottom:'.5rem'}}>"</span>
              {t.quote}
            </p>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{
                width:40,height:40,borderRadius:'50%',flexShrink:0,
                background:'linear-gradient(135deg,var(--violet-deep),var(--violet-bright))',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontWeight:700,fontSize:'.9rem'
              }}>{t.initials}</div>
              <div>
                <div style={{fontWeight:600,fontSize:'.9rem'}}>{t.name}</div>
                <div style={{fontSize:'.78rem',color:'var(--text-muted)'}}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

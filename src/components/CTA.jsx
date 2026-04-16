export default function CTA() {
  return (
    <section id="cta" style={{padding:'120px 5%',textAlign:'center',position:'relative',overflow:'hidden'}}>
      <div style={{
        position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
        width:600,height:400,
        background:'radial-gradient(ellipse,rgba(139,92,246,.2),transparent 70%)',
        pointerEvents:'none'
      }}/>
      <div style={{position:'relative',zIndex:1}}>
        <div className="section-label">Get Started</div>
        <h2 style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:700,
          letterSpacing:'-.02em',marginBottom:'1.2rem'
        }}>
          Ready to Leave the<br/>
          <span style={{
            background:'linear-gradient(135deg,var(--violet-core),var(--violet-bright),var(--violet-light))',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'
          }}>Legacy Behind?</span>
        </h2>
        <p style={{fontSize:'1.1rem',color:'var(--text-secondary)',maxWidth:520,margin:'0 auto 2.5rem',lineHeight:1.7}}>
          Run AP Discovery on your current system in 90 seconds. See your migration plan,
          ROI projection, and competitive analysis — instantly, for free.
        </p>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="mailto:hello@invoaice.io" className="btn-primary" style={{fontSize:'1.05rem',padding:'.9rem 2.2rem'}}>
            Start Free Discovery →
          </a>
          <a href="mailto:demo@invoaice.io" className="btn-ghost" style={{fontSize:'1.05rem',padding:'.9rem 2.2rem'}}>
            Request a Demo
          </a>
        </div>
        <p style={{fontSize:'.82rem',color:'var(--text-muted)',marginTop:'1rem'}}>
          No credit card required · Live in days, not months · Full data migration included
        </p>
      </div>
    </section>
  )
}

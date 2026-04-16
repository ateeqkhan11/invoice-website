import { WaveLogo, LogoText } from './Logo'

const COLS = [
  { title:'Product',  links:[['Features','#features'],['AI Agents','#agents'],['Pricing','#pricing'],['Compare','#compare'],['AP Discovery','#']] },
  { title:'Company',  links:[['About','#'],['Blog','#'],['Careers','#'],['Contact','mailto:hello@invoaice.io'],['Press','#']] },
  { title:'Resources',links:[['Documentation','#'],['API Reference','#'],['Security','#'],['Status','#'],['SOC 2','#']] },
]

export default function Footer() {
  return (
    <footer style={{padding:'60px 5% 40px',borderTop:'1px solid var(--border-subtle)'}}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'3rem',marginBottom:'3rem'}}>
        <div>
          <a href="#" style={{display:'inline-flex',alignItems:'center',gap:10,textDecoration:'none',color:'var(--text-primary)',marginBottom:'.8rem'}}>
            <WaveLogo size={32}/><LogoText/>
          </a>
          <p style={{fontSize:'.88rem',color:'var(--text-muted)',maxWidth:280,lineHeight:1.6,marginTop:'.8rem'}}>
            AI-native accounts payable automation. Days to go live.
            88% touchless. $4.20/invoice.
          </p>
        </div>
        {COLS.map(col => (
          <div key={col.title}>
            <h4 style={{fontSize:'.82rem',fontWeight:600,textTransform:'uppercase',
              letterSpacing:'.1em',color:'var(--text-muted)',marginBottom:'1.2rem'}}>{col.title}</h4>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'.7rem'}}>
              {col.links.map(([label,href]) => (
                <li key={label}>
                  <a href={href} style={{fontSize:'.88rem',color:'var(--text-secondary)',textDecoration:'none',transition:'color .2s'}}
                    onMouseEnter={e=>e.target.style.color='var(--text-primary)'}
                    onMouseLeave={e=>e.target.style.color='var(--text-secondary)'}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
        paddingTop:'2rem',borderTop:'1px solid var(--border-subtle)',flexWrap:'wrap',gap:'1rem'}}>
        <p style={{fontSize:'.82rem',color:'var(--text-muted)'}}>© 2026 InvoAIce Inc. All rights reserved.</p>
        <div style={{display:'flex',gap:'1.5rem'}}>
          {['Privacy','Terms','Security'].map(l => (
            <a key={l} href="#" style={{fontSize:'.82rem',color:'var(--text-muted)',textDecoration:'none'}}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

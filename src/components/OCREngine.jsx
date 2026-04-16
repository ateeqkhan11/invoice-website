const PIPELINE = [
  { n: 1, title: 'Preprocessing',    desc: 'OpenCV deskew · denoise · CLAHE contrast enhancement' },
  { n: 2, title: 'Layout Analysis',  desc: 'DiT + LayoutLMv3 — understands document structure, zones, and regions' },
  { n: 3, title: 'Text Detection',   desc: 'CRAFT + DBNet++ — precise character-level bounding box detection' },
  { n: 4, title: 'Text Recognition', desc: 'TrOCR + PaddleOCR — transformer-based recognition, multilingual support' },
  { n: 5, title: 'Table Extraction', desc: 'TableTransformer (TATR) — extracts line items, quantities, unit prices' },
  { n: 6, title: 'Semantic Extraction', desc: 'Fine-tuned LayoutLMv3 · Field-level confidence scores · Self-learning from corrections' },
]

const BULLETS = [
  'Zero data egress — satisfies GDPR, HIPAA, FedRAMP',
  '10M+ invoice training dataset — superior accuracy',
  'Per-tenant fine-tuning after 500 invoices',
  'Self-improving from human corrections',
  'Multilingual: English, Arabic, Chinese, Hindi, Japanese',
  '20–150ms local inference vs 800ms cloud API',
]

export default function OCREngine() {
  return (
    <section id="ocr" style={{ padding: '100px 5%', background: 'var(--bg)' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'center',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {/* Left: Copy */}
        <div>
          <div className="section-label">Custom-Built OCR</div>
          <h2 className="section-title" style={{ marginBottom: '1.2rem' }}>
            We Build Our<br />
            <span className="grad">Own OCR Engine.</span>
          </h2>
          <p style={{
            fontSize: '.95rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            marginBottom: '2rem',
            maxWidth: 440,
          }}>
            Unlike competitors who route your confidential financial data through
            Microsoft or Amazon, InvoAIce runs a fully self-hosted, continuously
            self-improving OCR pipeline — on your infrastructure or ours.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
            {BULLETS.map(b => (
              <li key={b} style={{
                display: 'flex', alignItems: 'flex-start', gap: '.6rem',
                fontSize: '.85rem', color: 'var(--text-secondary)', lineHeight: 1.5,
              }}>
                <span style={{ color: 'var(--violet-bright)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Pipeline steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {PIPELINE.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 12,
                padding: '16px 20px',
                transition: 'all .3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
                e.currentTarget.style.background = 'rgba(139,92,246,0.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
                e.currentTarget.style.background = 'var(--bg-card)'
              }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--violet-deep), var(--violet-bright))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.75rem', fontWeight: 700,
                }}>
                  {s.n}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.9rem', marginBottom: '.25rem' }}>{s.title}</div>
                  <div style={{ fontSize: '.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </div>
              {i < PIPELINE.length - 1 && (
                <div style={{
                  width: 1, height: 14, background: 'var(--border-subtle)',
                  margin: '0 0 0 34px',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

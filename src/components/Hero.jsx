import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

const STATS = [
  { target: 90,   suffix: '%',  label: 'Touchless Rate',       float: false, prefix: '' },
  { target: 14,   suffix: 's',  label: 'Avg Processing Time',  float: false, prefix: '' },
  { target: 4.20, suffix: '',   label: 'Cost Per Invoice',      float: true,  prefix: '$' },
  { target: 8,    suffix: '',   label: 'AI Agents',             float: false, prefix: '' },
]

function AnimatedStat({ stat }) {
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const dur = 1800
        const start = performance.now()
        const update = (now) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          const val = stat.target * ease
          el.textContent =
            stat.prefix +
            (stat.float ? val.toFixed(2) : Math.round(val)) +
            stat.suffix
          if (p < 1) requestAnimationFrame(update)
        }
        requestAnimationFrame(update)
        observer.disconnect()
      }
    }, { threshold: 0.4 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [stat])

  return (
    <span ref={ref}>
      {stat.prefix}
      {stat.float ? stat.target.toFixed(2) : stat.target}
      {stat.suffix}
    </span>
  )
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} />
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Now in Early Access · InvoAIce.io
        </div>

        <h1 className={styles.h1}>
          AP Automation<br />
          Built for the <span className="grad">AI Era</span>
        </h1>

        <p className={styles.sub}>
          Replace your legacy AP process with an 8-agent AI swarm —
          90% touchless from day one, invoices processed in 14 seconds,
          99% extraction accuracy, and zero template maintenance. Ever.
        </p>

        <div className={styles.actions}>
          <a href="#cta" className="btn-primary">Start Free Trial →</a>
          <a href="#features" className="btn-ghost">See How It Works</a>
        </div>

        <div className={styles.stats}>
          {STATS.map(s => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statNum}>
                <AnimatedStat stat={s} />
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

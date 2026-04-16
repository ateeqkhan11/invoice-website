/**
 * InvoAIce.io — Logo Components
 * Glassy gradient infinity mark with multi-layer depth, gloss reflection & glow.
 */

// ─── Glassy Infinity Mark ───────────────────────────────────────────────────
export function InfinityMark({ size = 40 }) {
  // Unique IDs to avoid collisions if rendered multiple times
  const uid = 'inv'
  const W = 90, H = 50
  // The core infinity open path (traced from center → left loop → center → right loop → center)
  const P = `M45 25
    C45 25 38 8 23 8
    C9  8  3 17  3 25
    C3 33  9 42 23 42
    C38 42 45 25 45 25
    C45 25 52  8 67  8
    C81  8 87 17 87 25
    C87 33 81 42 67 42
    C52 42 45 25 45 25`

  return (
    <svg
      width={size}
      height={Math.round(size * (H / W))}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-label="InvoAIce infinity mark"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* ── Main body gradient: deep violet → purple → lavender ── */}
        <linearGradient id={`${uid}Body`} x1="3" y1="8" x2="87" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#3B0FA0" />
          <stop offset="30%"  stopColor="#6D28D9" />
          <stop offset="60%"  stopColor="#9333EA" />
          <stop offset="85%"  stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>

        {/* ── Gloss highlight: bright white fading out ── */}
        <linearGradient id={`${uid}Gloss`} x1="0" y1="0" x2="0" y2={H} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.72)" />
          <stop offset="35%"  stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
        </linearGradient>

        {/* ── Clip to top half for the gloss reflection ── */}
        <clipPath id={`${uid}TopHalf`}>
          <rect x="0" y="0" width={W} height={H * 0.48} />
        </clipPath>

        {/* ── Outer ambient glow ── */}
        <filter id={`${uid}Glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="gblur" />
          <feMerge>
            <feMergeNode in="gblur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* ── Soft inner shadow for depth ── */}
        <filter id={`${uid}Inner`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="iblur" />
          <feMerge>
            <feMergeNode in="iblur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Layer 1: Ambient glow halo ─────────────────────────────── */}
      <path
        d={P}
        stroke="#7C3AED"
        strokeWidth="18"
        strokeLinecap="round"
        opacity="0.22"
        filter={`url(#${uid}Glow)`}
      />

      {/* ── Layer 2: Deep shadow base for 3-D thickness ────────────── */}
      <path
        d={P}
        stroke="#1E0752"
        strokeWidth="13"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* ── Layer 3: Main gradient body ───────────────────────────── */}
      <path
        d={P}
        stroke={`url(#${uid}Body)`}
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* ── Layer 4: Gloss reflection − top half only ─────────────── */}
      <path
        d={P}
        stroke={`url(#${uid}Gloss)`}
        strokeWidth="5.5"
        strokeLinecap="round"
        clipPath={`url(#${uid}TopHalf)`}
      />

      {/* ── Layer 5: Thin bright edge line for glass rim ─────────── */}
      <path
        d={P}
        stroke="rgba(220,200,255,0.30)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ── Layer 6: Specular hotspots (light catching the glass) ── */}
      <ellipse cx="19" cy="15" rx="5"   ry="2.8" fill="rgba(255,255,255,0.45)" />
      <ellipse cx="63" cy="15" rx="5"   ry="2.8" fill="rgba(255,255,255,0.45)" />
      <ellipse cx="19" cy="14" rx="2.2" ry="1.2" fill="rgba(255,255,255,0.70)" />
      <ellipse cx="63" cy="14" rx="2.2" ry="1.2" fill="rgba(255,255,255,0.70)" />
    </svg>
  )
}

// ─── Wordmark ──────────────────────────────────────────────────────────────
export function LogoText({ style = {}, showTagline = false }) {
  return (
    <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, ...style }}>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.85rem',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: 0,
        }}
      >
        {/* INVO */}
        <span style={{ color: '#F0EEFF' }}>INVO</span>

        {/* AI — gradient accent matching the infinity mark */}
        <span
          style={{
            background: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 900,
            filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.5))',
          }}
        >
          AI
        </span>

        {/* CE */}
        <span style={{ color: '#F0EEFF' }}>CE</span>

        {/* .IO — baseline aligned */}
        <span
          style={{
            color: '#6B7280',
            fontSize: '0.62em',
            fontWeight: 500,
            letterSpacing: '0.04em',
            verticalAlign: 'super',
            lineHeight: 1,
            marginLeft: '2px',
          }}
        >
          .IO
        </span>
      </span>

      {showTagline && (
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.62rem',
            fontWeight: 400,
            letterSpacing: '0.12em',
            color: '#6B7280',
            textTransform: 'uppercase',
            marginTop: '3px',
          }}
        >
          Intelligent Automation
        </span>
      )}
    </span>
  )
}

// ─── Composed Logo ─────────────────────────────────────────────────────────
export default function Logo({ size = 40, style = {}, showTagline = false }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        ...style,
      }}
    >
      <InfinityMark size={size} />
      <LogoText showTagline={showTagline} />
    </span>
  )
}

// ─── Legacy alias (keeps Nav.jsx import working unchanged) ─────────────────
export const WaveLogo = InfinityMark

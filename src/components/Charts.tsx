/** Circular progress; `value` in 0-1. */
export function Ring({ value, size = 96, label, sub }: { value: number; size?: number; label: string; sub?: string }) {
  const stroke = 9
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const v = Math.min(1, Math.max(0, value))
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} role="img" aria-label={`${label} ${Math.round(v * 100)} %`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * v} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
        <span className="text-lg font-semibold tabular-nums">{label}</span>
        {sub && <span className="text-[11px] text-muted">{sub}</span>}
      </div>
    </div>
  )
}

/** Horizontal bar; `value` in 0-1, colour follows the value (low = warn, high = ok). */
export function Bar({ value, tone = 'auto' }: { value: number | null; tone?: 'auto' | 'accent' }) {
  const v = value === null ? 0 : Math.min(1, Math.max(0, value))
  const color = tone === 'accent' ? 'var(--accent)' : v >= 0.7 ? 'var(--ok)' : v >= 0.4 ? 'var(--star)' : 'var(--bad)'
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-line">
      <div className="h-full rounded-full transition-all" style={{ width: `${v * 100}%`, background: color }} />
    </div>
  )
}

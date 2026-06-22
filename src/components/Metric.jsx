// Instrument-panel numeric: tabular-figure value in mono + an accent delta chip.
// The fintech credibility unit. Accent resolves per-project via --accent.
export default function Metric({ value, label, sub }) {
  return (
    <div className="metric">
      <div className="metric-v num">{value}</div>
      {label && (
        <div className="metric-k">
          {label}{sub && <span className="metric-delta num">{sub}</span>}
        </div>
      )}
    </div>
  )
}

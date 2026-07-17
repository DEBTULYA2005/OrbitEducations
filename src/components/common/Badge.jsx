const TONES = {
  blue: 'bg-orbit-blue-50 text-orbit-blue-700',
  green: 'bg-orbit-green-50 text-orbit-green-700',
  amber: 'bg-orbit-amber-100 text-orbit-amber-600',
  neutral: 'bg-slate-100 text-orbit-ink-soft',
}

export default function Badge({ children, tone = 'blue', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export default function Card({ children, className = '', hoverable = false }) {
  return (
    <div
      className={`rounded-2xl border border-orbit-line bg-white p-6 shadow-[var(--shadow-orbit-card)]
        ${hoverable ? 'transition-transform duration-200 hover:-translate-y-1' : ''}
        ${className}`}
    >
      {children}
    </div>
  )
}

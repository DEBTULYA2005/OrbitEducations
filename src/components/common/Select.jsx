export default function Select({ label, id, error, children, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-orbit-ink-soft">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-orbit-ink
          transition-colors focus:outline-none focus:ring-2 focus:ring-orbit-green-500/40 focus:border-orbit-green-500
          ${error ? 'border-red-400' : 'border-orbit-line'}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  )
}

export default function SectionNav({ sections, activeId, onSelect }) {
  return (
    <div className="sticky top-16 z-10 -mx-1 mb-10 flex gap-2 overflow-x-auto border-b border-orbit-line bg-orbit-base/95 px-1 py-4 backdrop-blur-sm">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            activeId === s.id
              ? 'bg-orbit-blue-600 text-white'
              : 'bg-white text-orbit-ink-soft hover:bg-orbit-blue-50 border border-orbit-line'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}

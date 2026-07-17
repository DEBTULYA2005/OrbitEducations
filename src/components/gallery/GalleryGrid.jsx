import { useState } from 'react'
import Modal from '@/components/common/Modal'

export default function GalleryGrid({ items }) {
  const [active, setActive] = useState(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item)}
            className="group overflow-hidden rounded-2xl border border-orbit-line bg-white text-left shadow-[var(--shadow-orbit-card)] transition-transform hover:-translate-y-1"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-display text-base font-semibold text-orbit-ink">{item.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-orbit-ink-soft">{item.description}</p>
            </div>
          </button>
        ))}
      </div>

      <Modal isOpen={Boolean(active)} onClose={() => setActive(null)} title={active?.title ?? ''}>
        {active && (
          <div>
            <img src={active.image} alt={active.title} className="mb-4 w-full rounded-xl object-cover" />
            <p className="text-sm leading-relaxed text-orbit-ink-soft">{active.description}</p>
          </div>
        )}
      </Modal>
    </>
  )
}

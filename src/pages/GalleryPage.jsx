import { useState } from 'react'
import { GALLERY_SECTIONS } from '@/constants/galleryData'
import SectionNav from '@/components/common/SectionNav'
import GalleryGrid from '@/components/gallery/GalleryGrid'

export default function GalleryPage() {
  const [activeId, setActiveId] = useState(GALLERY_SECTIONS[0].id)

  function handleSelect(id) {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="container-orbit py-14">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-orbit-ink sm:text-4xl">Gallery</h1>
        <p className="mt-3 text-orbit-ink-soft">
          A running record of life at Orbit — the people, the trips, and the moments worth
          remembering.
        </p>
      </header>

      <SectionNav sections={GALLERY_SECTIONS} activeId={activeId} onSelect={handleSelect} />

      <div className="flex flex-col gap-16">
        {GALLERY_SECTIONS.map((section) => (
          <div key={section.id} id={section.id} className="scroll-mt-32">
            <h2 className="font-display text-2xl font-bold text-orbit-ink">{section.label}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-orbit-ink-soft">
              {section.intro}
            </p>
            <div className="mt-6">
              <GalleryGrid items={section.items} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

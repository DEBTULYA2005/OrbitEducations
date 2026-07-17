import { useState } from 'react'
import { AWARD_SECTIONS } from '@/constants/awardsData'
import SectionNav from '@/components/common/SectionNav'
import AwardCard from '@/components/awards/AwardCard'

export default function AwardsPage() {
  const [activeId, setActiveId] = useState(AWARD_SECTIONS[0].id)

  function handleSelect(id) {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="container-orbit py-14">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-orbit-ink sm:text-4xl">Awards</h1>
        <p className="mt-3 text-orbit-ink-soft">
          Certificates, ranks, and badges earned by Orbit students across school, college, and
          national competitions.
        </p>
      </header>

      <SectionNav sections={AWARD_SECTIONS} activeId={activeId} onSelect={handleSelect} />

      <div className="flex flex-col gap-16">
        {AWARD_SECTIONS.map((section) => (
          <div key={section.id} id={section.id} className="scroll-mt-32">
            <h2 className="font-display text-2xl font-bold text-orbit-ink">{section.label}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-orbit-ink-soft">
              {section.intro}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <AwardCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

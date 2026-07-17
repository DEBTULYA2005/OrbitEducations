import { CENTERS } from '@/constants/centersData'
import CenterCard from '@/components/centers/CenterCard'

export default function CentersPage() {
  return (
    <section className="container-orbit py-14">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-orbit-ink sm:text-4xl">Centers</h1>
        <p className="mt-3 text-orbit-ink-soft">
          Visit us in person — every center runs the same tracks, taught by faculty who know the
          local boards and university systems.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {CENTERS.map((center) => (
          <CenterCard key={center.id} center={center} />
        ))}
      </div>
    </section>
  )
}

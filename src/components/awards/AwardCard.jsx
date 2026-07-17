import Card from '@/components/common/Card'
import Badge from '@/components/common/Badge'

export default function AwardCard({ item }) {
  return (
    <Card hoverable className="overflow-hidden p-0">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <Badge tone="amber">Recognized</Badge>
        <h3 className="mt-2 font-display text-base font-semibold text-orbit-ink">{item.name}</h3>
        <p className="mt-1 text-sm text-orbit-ink-soft">{item.detail}</p>
      </div>
    </Card>
  )
}

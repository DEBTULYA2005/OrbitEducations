import Card from '@/components/common/Card'

export default function CenterCard({ center }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="aspect-[16/9] overflow-hidden">
        <img src={center.image} alt={center.name} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-orbit-ink">{center.name}</h3>
        <p className="mt-2 text-sm text-orbit-ink-soft">{center.address}</p>
        <div className="mt-3 flex flex-col gap-1 text-sm">
          <a href={`tel:${center.phone}`} className="font-medium text-orbit-blue-600 hover:underline">
            {center.phone}
          </a>
          <a href={`mailto:${center.email}`} className="font-medium text-orbit-blue-600 hover:underline">
            {center.email}
          </a>
        </div>
      </div>
      <div className="aspect-[16/9] w-full border-t border-orbit-line">
        <iframe
          title={`Map — ${center.name}`}
          src={center.mapEmbedUrl}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Card>
  )
}

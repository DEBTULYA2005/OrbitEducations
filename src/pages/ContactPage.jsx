import Card from '@/components/common/Card'
import ContactForm from '@/components/forms/ContactForm'
import { CENTERS } from '@/constants/centersData'

const HEAD_OFFICE = CENTERS[1]

export default function ContactPage() {
  return (
    <section className="container-orbit py-14">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-orbit-ink sm:text-4xl">Contact Us</h1>
        <p className="mt-3 text-orbit-ink-soft">
          Questions about a course, a center, or your subscription? Reach out — or stop by the
          head office directly.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Card className="p-0 overflow-hidden">
            <div className="aspect-[16/10] w-full">
              <iframe
                title="Head office map"
                src={HEAD_OFFICE.mapEmbedUrl}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-5">
              <h2 className="font-display text-lg font-semibold text-orbit-ink">{HEAD_OFFICE.name}</h2>
              <p className="mt-2 text-sm text-orbit-ink-soft">{HEAD_OFFICE.address}</p>
              <div className="mt-3 flex flex-col gap-1 text-sm">
                <a href={`tel:${HEAD_OFFICE.phone}`} className="font-medium text-orbit-blue-600 hover:underline">
                  {HEAD_OFFICE.phone}
                </a>
                <a href={`mailto:${HEAD_OFFICE.email}`} className="font-medium text-orbit-blue-600 hover:underline">
                  {HEAD_OFFICE.email}
                </a>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="font-display text-lg font-semibold text-orbit-ink">Send us a message</h2>
          <p className="mt-1 mb-5 text-sm text-orbit-ink-soft">We typically reply within one working day.</p>
          <ContactForm />
        </Card>
      </div>
    </section>
  )
}

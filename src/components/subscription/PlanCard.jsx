import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function PlanCard({ plan, onSelect, isCurrentPlan = false }) {
  return (
    <Card
      hoverable
      className={`relative flex flex-col ${
        plan.featured ? 'border-orbit-green-400 ring-1 ring-orbit-green-400' : ''
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-orbit-green-500 px-3 py-1 text-xs font-bold text-white">
          Most popular
        </span>
      )}
      <h3 className="font-display text-xl font-bold text-orbit-ink">{plan.name}</h3>
      <p className="mt-1 text-sm text-orbit-mist">{plan.tagline}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-mono-stat text-3xl font-bold text-orbit-ink">
          {plan.price === 0 ? 'Free' : `₹${plan.price}`}
        </span>
        {plan.price > 0 && <span className="text-sm text-orbit-mist">/ term</span>}
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-orbit-ink-soft">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
              <path d="M3.5 8.3l2.7 2.7 6.3-6.3" stroke="var(--color-orbit-green-500)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        onClick={() => onSelect?.(plan)}
        variant={plan.featured ? 'secondary' : 'outline'}
        className="mt-6 w-full"
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? 'Current plan' : plan.price === 0 ? 'Start free' : 'Upgrade'}
      </Button>
    </Card>
  )
}

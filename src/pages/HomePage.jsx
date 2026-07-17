import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { SUBSCRIPTION_PLANS } from '@/constants/subscriptionPlans'
import AuthModal from '@/components/auth/AuthModal'
import PlanCard from '@/components/subscription/PlanCard'
import EnrollmentForm from '@/components/forms/EnrollmentForm'
import OrbitRings from '@/components/common/OrbitRings'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const [authModal, setAuthModal] = useState({ isOpen: false, tab: 'login' })

  function openAuth(tab) {
    setAuthModal({ isOpen: true, tab })
  }

  function handlePlanSelect(plan) {
    if (!isAuthenticated) {
      openAuth('signup')
      return
    }
    // Authenticated: hand off to dashboard subscription flow (Razorpay checkout lives there).
    window.location.href = `/dashboard/subscription?plan=${plan.id}`
  }

  return (
    <>
      {/* Hero */}
      <section className="container-orbit grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-orbit-fade-up">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-orbit-green-50 px-3 py-1.5 text-xs font-semibold text-orbit-green-700">
            School to Professional, one clear path
          </span>
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-orbit-ink sm:text-5xl">
            Every stage of your growth,
            <br />
            <span className="text-orbit-blue-600">on one orbit.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-orbit-ink-soft">
            Orbit Educations takes students from school foundations through UG/PG,
            certification and professional courses — with real results to show for it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {isAuthenticated ? (
              <Button size="lg" onClick={() => (window.location.href = '/dashboard')}>
                Go to dashboard
              </Button>
            ) : (
              <>
                <Button size="lg" onClick={() => openAuth('signup')}>
                  Enroll now
                </Button>
                <Button size="lg" variant="outline" onClick={() => openAuth('login')}>
                  Log in
                </Button>
              </>
            )}
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-orbit-line pt-8">
            {[
              ['10,000+', 'Students trained'],
              ['2', 'Learning centers'],
              ['92%', 'Certification pass rate'],
            ].map(([stat, label]) => (
              <div key={label}>
                <dt className="font-mono-stat text-2xl font-bold text-orbit-blue-600">{stat}</dt>
                <dd className="mt-1 text-xs text-orbit-mist">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex justify-center">
          <OrbitRings labels={['Schools', 'UG / PG', 'Professional']} />
        </div>
      </section>

      {/* Subscription plans */}
      <section className="border-t border-orbit-line bg-white py-20">
        <div className="container-orbit">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-bold text-orbit-ink">Choose your track</h2>
            <p className="mt-3 text-orbit-ink-soft">
              Every tier unlocks the next layer of practice — exams and worksheets scale with you.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment form */}
      <section className="py-20">
        <div className="container-orbit grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-bold text-orbit-ink">Apply for a course</h2>
            <p className="mt-3 text-orbit-ink-soft">
              Tell us what you're aiming for. Our admissions team will guide you to the right
              track — no account needed to apply.
            </p>
          </div>
          <Card className="lg:col-span-3">
            <EnrollmentForm />
          </Card>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="border-t border-orbit-line bg-white py-20">
        <div className="container-orbit grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Link to="/awards">
            <Card hoverable className="h-full">
              <h3 className="font-display text-lg font-semibold text-orbit-ink">Awards & rankers</h3>
              <p className="mt-2 text-sm text-orbit-ink-soft">
                See certificates and Olympiad results from our top performers.
              </p>
            </Card>
          </Link>
          <Link to="/gallery">
            <Card hoverable className="h-full">
              <h3 className="font-display text-lg font-semibold text-orbit-ink">Life at Orbit</h3>
              <p className="mt-2 text-sm text-orbit-ink-soft">
                Alumni stories, picnics, and celebrations from across our centers.
              </p>
            </Card>
          </Link>
          <Link to="/centers">
            <Card hoverable className="h-full">
              <h3 className="font-display text-lg font-semibold text-orbit-ink">Find a center</h3>
              <p className="mt-2 text-sm text-orbit-ink-soft">
                Locate the nearest Orbit campus and drop by for a visit.
              </p>
            </Card>
          </Link>
        </div>
      </section>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal((s) => ({ ...s, isOpen: false }))}
        initialTab={authModal.tab}
      />
    </>
  )
}

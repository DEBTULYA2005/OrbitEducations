import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { subscriptionService } from '@/services/subscriptionService'
import { useAuth } from '@/context/AuthContext'
import Card from '@/components/common/Card'
import Badge from '@/components/common/Badge'
import Spinner from '@/components/common/Spinner'

export default function DashboardOverviewPage() {
  const { user } = useAuth()

  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription', 'me'],
    queryFn: subscriptionService.getCurrentSubscription,
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-orbit-mist">Enrolled course</p>
          <p className="mt-2 font-display text-lg font-semibold text-orbit-ink">
            {user?.enrolledCourse || '—'}
          </p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-orbit-mist">Subscription</p>
          {isLoading ? (
            <Spinner size="sm" className="mt-2" />
          ) : (
            <div className="mt-2 flex items-center gap-2">
              <span className="font-display text-lg font-semibold text-orbit-ink">
                {subscription?.planName || 'Basic'}
              </span>
              <Badge tone="green">Active</Badge>
            </div>
          )}
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-orbit-mist">UID</p>
          <p className="mt-2 font-mono-stat text-lg font-semibold text-orbit-ink">{user?.uid || '—'}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Link to="/dashboard/profile">
          <Card hoverable>
            <h3 className="font-display text-base font-semibold text-orbit-ink">Your profile</h3>
            <p className="mt-1 text-sm text-orbit-ink-soft">Update your contact and parent details.</p>
          </Card>
        </Link>
        <Link to="/dashboard/subscription">
          <Card hoverable>
            <h3 className="font-display text-base font-semibold text-orbit-ink">Subscription</h3>
            <p className="mt-1 text-sm text-orbit-ink-soft">Upgrade your tier and unlock more exams.</p>
          </Card>
        </Link>
        <Link to="/dashboard/certificates">
          <Card hoverable>
            <h3 className="font-display text-base font-semibold text-orbit-ink">Certificates</h3>
            <p className="mt-1 text-sm text-orbit-ink-soft">Download certificates you've earned.</p>
          </Card>
        </Link>
      </div>
    </div>
  )
}

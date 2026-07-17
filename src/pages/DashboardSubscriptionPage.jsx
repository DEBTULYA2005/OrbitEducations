import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { subscriptionService } from '@/services/subscriptionService'
import { paymentService } from '@/services/paymentService'
import { useAuth } from '@/context/AuthContext'
import { SUBSCRIPTION_PLANS } from '@/constants/subscriptionPlans'
import PlanCard from '@/components/subscription/PlanCard'
import ErrorMessage from '@/components/common/ErrorMessage'
import Spinner from '@/components/common/Spinner'

export default function DashboardSubscriptionPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription', 'me'],
    queryFn: subscriptionService.getCurrentSubscription,
  })

  async function handleSelect(plan) {
    setError(null)

    if (plan.price === 0) {
      // Basic requires no payment — just record the selection.
      try {
        setIsProcessing(true)
        await subscriptionService.upgrade(plan.id)
        queryClient.invalidateQueries({ queryKey: ['subscription', 'me'] })
      } catch {
        setError('Could not switch plans. Please try again.')
      } finally {
        setIsProcessing(false)
      }
      return
    }

    try {
      setIsProcessing(true)
      const order = await subscriptionService.upgrade(plan.id)
      await paymentService.openCheckout({
        order: { ...order, planName: plan.name },
        user,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['subscription', 'me'] })
          setIsProcessing(false)
        },
        onFailure: (err) => {
          setError(err.message || 'Payment failed. Please try again.')
          setIsProcessing(false)
        },
      })
    } catch {
      setError('Could not start checkout. Please try again.')
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display text-xl font-bold text-orbit-ink">Subscription</h1>
      <p className="mt-1 mb-6 text-sm text-orbit-ink-soft">
        Current plan: <span className="font-semibold text-orbit-ink">{subscription?.planName || 'Basic'}</span>.
        Upgrading unlocks exams and worksheets instantly — no page refresh needed.
      </p>

      {error && <ErrorMessage className="mb-6">{error}</ErrorMessage>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelect={handleSelect}
            isCurrentPlan={subscription?.planId === plan.id || (!subscription && plan.id === 'basic')}
          />
        ))}
      </div>

      {isProcessing && (
        <div className="mt-6 flex items-center gap-2 text-sm text-orbit-ink-soft">
          <Spinner size="sm" /> Processing your request...
        </div>
      )}
    </div>
  )
}

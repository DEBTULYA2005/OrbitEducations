import axiosInstance from './axiosInstance'

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export const paymentService = {
  /**
   * Opens Razorpay checkout for a given order, then verifies payment
   * signature server-side. `order` comes from subscriptionService.upgrade().
   * Resolves once Django has confirmed and the subscription is updated —
   * callers should refetch subscription state after this resolves.
   */
  async openCheckout({ order, user, onSuccess, onFailure }) {
    const loaded = await loadRazorpayScript()
    if (!loaded) {
      onFailure?.(new Error('Unable to load payment gateway. Check your connection.'))
      return
    }

    const razorpay = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency || 'INR',
      name: 'Orbit Educations',
      description: `Subscription — ${order.planName}`,
      order_id: order.orderId,
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone,
      },
      theme: { color: '#1b4b8f' },
      handler: async (response) => {
        try {
          const { data } = await axiosInstance.post('/subscriptions/verify-payment/', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
          onSuccess?.(data)
        } catch (err) {
          onFailure?.(err)
        }
      },
      modal: {
        ondismiss: () => onFailure?.(new Error('Payment cancelled.')),
      },
    })

    razorpay.open()
  },
}

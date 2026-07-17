import axiosInstance from './axiosInstance'

export const subscriptionService = {
  async getCurrentSubscription() {
    const { data } = await axiosInstance.get('/subscriptions/me/')
    return data
  },

  async upgrade(planId) {
    // Returns a Razorpay order (order_id, amount, currency, key) to open
    // the checkout widget with — see paymentService.
    const { data } = await axiosInstance.post('/subscriptions/upgrade/', { planId })
    return data
  },
}

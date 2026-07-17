import axiosInstance from './axiosInstance'

export const notificationService = {
  async getNotifications() {
    const { data } = await axiosInstance.get('/notifications/')
    return data
  },

  async markAsRead(id) {
    const { data } = await axiosInstance.patch(`/notifications/${id}/`, { read: true })
    return data
  },

  async markAllAsRead() {
    const { data } = await axiosInstance.post('/notifications/mark-all-read/')
    return data
  },
}

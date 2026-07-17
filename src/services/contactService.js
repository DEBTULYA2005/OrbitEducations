import axiosInstance from './axiosInstance'

export const contactService = {
  async sendMessage(payload) {
    // payload: name, email, phone, message
    const { data } = await axiosInstance.post('/contact/', payload)
    return data
  },
}

import axiosInstance from './axiosInstance'

export const dashboardService = {
  async getProfile() {
    const { data } = await axiosInstance.get('/dashboard/profile/')
    return data
  },

  async updateProfile(payload) {
    const { data } = await axiosInstance.patch('/dashboard/profile/', payload)
    return data
  },

  async getCertificates() {
    const { data } = await axiosInstance.get('/dashboard/certificates/')
    return data
  },

  async downloadCertificate(id) {
    const response = await axiosInstance.get(`/dashboard/certificates/${id}/download/`, {
      responseType: 'blob',
    })
    return response.data
  },
}

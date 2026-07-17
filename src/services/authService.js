import axiosInstance from './axiosInstance'

export const authService = {
  async login({ uid, course, password }) {
    const { data } = await axiosInstance.post('/auth/login/', { uid, course, password })
    return data
  },

  async signup(payload) {
    // payload: uid, phone, name, email, password, parentName, parentPhone, address, enrolledCourse
    const { data } = await axiosInstance.post('/auth/signup/', payload)
    return data
  },

  async logout() {
    const { data } = await axiosInstance.post('/auth/logout/')
    return data
  },

  async getCurrentUser() {
    const { data } = await axiosInstance.get('/auth/me/')
    return data
  },
}

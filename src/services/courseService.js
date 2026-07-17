import axiosInstance from './axiosInstance'

export const courseService = {
  async getCourses({ category, search, page = 1 } = {}) {
    const { data } = await axiosInstance.get('/courses/', {
      params: { category, search, page },
    })
    return data
  },

  async getCourseById(id) {
    const { data } = await axiosInstance.get(`/courses/${id}/`)
    return data
  },

  async applyToCourse(payload) {
    // payload: name, phone, email, courseId, message
    const { data } = await axiosInstance.post('/courses/applications/', payload)
    return data
  },
}

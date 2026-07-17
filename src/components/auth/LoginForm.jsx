import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { COURSE_CATEGORIES } from '@/constants/courseCategories'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'

export default function LoginForm({ onSuccess }) {
  const { login, isLoggingIn, loginError } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ uid: '', course: '', password: '' })

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await login(form)
      onSuccess?.()
      navigate('/dashboard')
    } catch {
      // surfaced via loginError below
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="login-uid"
        name="uid"
        label="UID"
        placeholder="Your student UID"
        value={form.uid}
        onChange={handleChange}
        required
      />
      <Select
        id="login-course"
        name="course"
        label="Course"
        value={form.course}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select your course
        </option>
        {COURSE_CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </Select>
      <Input
        id="login-password"
        name="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange}
        required
      />

      {loginError && (
        <ErrorMessage>
          {loginError.response?.data?.detail || 'Unable to log in. Check your details and try again.'}
        </ErrorMessage>
      )}

      <Button type="submit" isLoading={isLoggingIn} className="mt-1 w-full">
        Log in
      </Button>
    </form>
  )
}

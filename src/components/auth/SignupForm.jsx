// import { useState } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { COURSE_CATEGORIES } from '@/constants/courseCategories'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'

const INITIAL_FORM = {
  uid: '',
  name: '',
  email: '',
  phone: '',
  password: '',
  parentName: '',
  parentPhone: '',
  address: '',
  enrolledCourse: '',
}

export default function SignupForm({ onSuccess }) {
  const { signup, isSigningUp, signupError } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)

  function generateUID() {
    return `ORB${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100)}`
  }
  
  useEffect(() => {
    setForm((f) => ({
      ...f,
      uid: generateUID(),
    }))
  }, [])

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await signup(form)
      onSuccess?.()
      navigate('/dashboard')
    } catch {
      // surfaced via signupError below
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input id="su-uid" name="uid" label="Student UID" value={form.uid} readOnly required />
        <Input id="su-name" name="name" label="Full name" value={form.name} onChange={handleChange} required />
        <Input id="su-email" name="email" type="email" label="Email" value={form.email} onChange={handleChange} required />
        <Input id="su-phone" name="phone" type="tel" label="Phone" value={form.phone} onChange={handleChange} required />
        <Input
          id="su-password"
          name="password"
          type="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="sm:col-span-2"
        />
      </div>

      <div className="border-t border-orbit-line pt-4">
        <p className="mb-3 text-sm font-semibold text-orbit-ink-soft">Parent / guardian details</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input id="su-parent-name" name="parentName" label="Parent's name" value={form.parentName} onChange={handleChange} required />
          <Input id="su-parent-phone" name="parentPhone" type="tel" label="Parent's phone" value={form.parentPhone} onChange={handleChange} required />
        </div>
      </div>

      <Input id="su-address" name="address" label="Address" value={form.address} onChange={handleChange} required />

      <Select id="su-course" name="enrolledCourse" label="Course to enroll in" value={form.enrolledCourse} onChange={handleChange} required>
        <option value="" disabled>
          Select a course category
        </option>
        {COURSE_CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </Select>

      {signupError && (
        <ErrorMessage>
          {signupError.response?.data?.detail || 'Unable to create your account. Please check your details.'}
        </ErrorMessage>
      )}

      <Button type="submit" isLoading={isSigningUp} className="mt-1 w-full">
        Create account
      </Button>
    </form>
  )
}

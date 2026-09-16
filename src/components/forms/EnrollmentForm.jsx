import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { courseService } from '@/services/courseService'
import { COURSE_CATEGORIES } from '@/constants/courseCategories'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'

export default function EnrollmentForm() {
  const { user, isAuthenticated } = useAuth()

  // Anonymous visitor: no form at all — just a prompt to log in.
  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-orbit-line bg-orbit-blue-50/40 p-6 text-center">
        <p className="font-display text-lg font-semibold text-orbit-ink">Log in to apply</p>
        <p className="mt-1 text-sm text-orbit-ink-soft">
          Applications are linked to your student account so our team can follow up directly.
        </p>
        <Link to="/login">
          <Button className="mt-4">Log in</Button>
        </Link>
      </div>
    )
  }

  // Logged in: only their enrolled category is selectable.
  const allowedCategory = COURSE_CATEGORIES.find((c) => c.id === user.enrolledCourseCategory)

  const initialForm = { courseId: allowedCategory?.id || '', message: '' }
  const [form, setForm] = useState(initialForm)

  const mutation = useMutation({
    mutationFn: (payload) =>
      courseService.applyToCourse({
        ...payload,
        name: user.name,
        phone: user.phone,
        email: user.email,
      }),
    onSuccess: () => setForm(initialForm),
  })

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    mutation.mutate(form)
  }

  if (mutation.isSuccess) {
    return (
      <div className="rounded-2xl border border-orbit-green-200 bg-orbit-green-50 p-6 text-center">
        <p className="font-display text-lg font-semibold text-orbit-green-700">Application received</p>
        <p className="mt-1 text-sm text-orbit-ink-soft">
          Our admissions team will reach out within 1–2 working days.
        </p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => mutation.reset()}>
          Submit another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <div className="rounded-lg border border-orbit-line bg-orbit-blue-50/40 px-3.5 py-2.5 text-sm text-orbit-ink-soft">
        Applying as <span className="font-semibold text-orbit-ink">{user.name}</span> ({user.email})
      </div>

      {allowedCategory ? (
        <div className="rounded-lg border border-orbit-line bg-white px-3.5 py-2.5 text-sm text-orbit-ink-soft">
          Course track: <span className="font-semibold text-orbit-ink">{allowedCategory.label}</span>
        </div>
      ) : (
        <ErrorMessage>
          You don't have a course track set on your account yet — contact admissions to update it.
        </ErrorMessage>
      )}

      <input type="hidden" name="courseId" value={form.courseId} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="ef-message" className="text-sm font-medium text-orbit-ink-soft">
          Anything we should know? (optional)
        </label>
        <textarea
          id="ef-message"
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-orbit-line bg-white px-3.5 py-2.5 text-sm text-orbit-ink placeholder:text-orbit-mist focus:outline-none focus:ring-2 focus:ring-orbit-green-500/40 focus:border-orbit-green-500"
        />
      </div>

      {mutation.isError && <ErrorMessage>Something went wrong submitting your application. Please try again.</ErrorMessage>}

      <Button type="submit" isLoading={mutation.isPending} disabled={!allowedCategory}>
        Submit application
      </Button>
    </form>
  )
}
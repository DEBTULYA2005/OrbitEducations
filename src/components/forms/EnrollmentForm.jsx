import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { courseService } from '@/services/courseService'
import { COURSE_CATEGORIES } from '@/constants/courseCategories'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'

const INITIAL_FORM = { name: '', phone: '', email: '', courseId: '', message: '' }

export default function EnrollmentForm() {
  const [form, setForm] = useState(INITIAL_FORM)

  const mutation = useMutation({
    mutationFn: courseService.applyToCourse,
    onSuccess: () => setForm(INITIAL_FORM),
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
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input id="ef-name" name="name" label="Full name" value={form.name} onChange={handleChange} required />
      <Input id="ef-phone" name="phone" type="tel" label="Phone" value={form.phone} onChange={handleChange} required />
      <Input id="ef-email" name="email" type="email" label="Email" value={form.email} onChange={handleChange} required className="sm:col-span-2" />
      <Select id="ef-course" name="courseId" label="Course of interest" value={form.courseId} onChange={handleChange} required className="sm:col-span-2">
        <option value="" disabled>
          Select a category
        </option>
        {COURSE_CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </Select>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
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

      {mutation.isError && (
        <ErrorMessage className="sm:col-span-2">
          Something went wrong submitting your application. Please try again.
        </ErrorMessage>
      )}

      <Button type="submit" isLoading={mutation.isPending} className="sm:col-span-2">
        Submit application
      </Button>
    </form>
  )
}

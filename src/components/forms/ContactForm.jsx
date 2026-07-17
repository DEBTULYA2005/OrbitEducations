import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { contactService } from '@/services/contactService'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'

const INITIAL_FORM = { name: '', email: '', phone: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM)

  const mutation = useMutation({
    mutationFn: contactService.sendMessage,
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
        <p className="font-display text-lg font-semibold text-orbit-green-700">Message sent</p>
        <p className="mt-1 text-sm text-orbit-ink-soft">We'll get back to you within a working day.</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => mutation.reset()}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input id="contact-name" name="name" label="Name" value={form.name} onChange={handleChange} required />
      <Input id="contact-email" name="email" type="email" label="Email" value={form.email} onChange={handleChange} required />
      <Input id="contact-phone" name="phone" type="tel" label="Phone" value={form.phone} onChange={handleChange} />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-orbit-ink-soft">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-orbit-line bg-white px-3.5 py-2.5 text-sm text-orbit-ink placeholder:text-orbit-mist focus:outline-none focus:ring-2 focus:ring-orbit-green-500/40 focus:border-orbit-green-500"
        />
      </div>

      {mutation.isError && <ErrorMessage>Something went wrong sending your message. Please try again.</ErrorMessage>}

      <Button type="submit" isLoading={mutation.isPending}>
        Send message
      </Button>
    </form>
  )
}

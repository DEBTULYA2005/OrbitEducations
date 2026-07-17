import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboardService'
import Card from '@/components/common/Card'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import Spinner from '@/components/common/Spinner'

const FIELDS = [
  { name: 'name', label: 'Full name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'address', label: 'Address' },
  { name: 'parentName', label: "Parent's name" },
  { name: 'parentPhone', label: "Parent's phone", type: 'tel' },
]

export default function DashboardProfilePage() {
  const queryClient = useQueryClient()
  const { data: profile, isLoading } = useQuery({
    queryKey: ['dashboard', 'profile'],
    queryFn: dashboardService.getProfile,
  })

  const [form, setForm] = useState(null)
  const [savedMessage, setSavedMessage] = useState(false)

  useEffect(() => {
    if (profile) setForm(profile)
  }, [profile])

  const mutation = useMutation({
    mutationFn: dashboardService.updateProfile,
    onSuccess: (updated) => {
      queryClient.setQueryData(['dashboard', 'profile'], updated)
      setSavedMessage(true)
      setTimeout(() => setSavedMessage(false), 2500)
    },
  })

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    mutation.mutate(form)
  }

  if (isLoading || !form) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <Card className="max-w-2xl">
      <h1 className="font-display text-xl font-bold text-orbit-ink">Your profile</h1>
      <p className="mt-1 mb-6 text-sm text-orbit-ink-soft">
        Keep your contact and parent/guardian details current.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <Input
            key={field.name}
            id={`profile-${field.name}`}
            name={field.name}
            type={field.type || 'text'}
            label={field.label}
            value={form[field.name] || ''}
            onChange={handleChange}
            className={field.name === 'address' ? 'sm:col-span-2' : ''}
          />
        ))}

        {mutation.isError && (
          <ErrorMessage className="sm:col-span-2">Couldn't save your changes. Please try again.</ErrorMessage>
        )}

        <div className="flex items-center gap-3 sm:col-span-2">
          <Button type="submit" isLoading={mutation.isPending}>
            Save changes
          </Button>
          {savedMessage && <span className="text-sm font-medium text-orbit-green-600">Saved</span>}
        </div>
      </form>
    </Card>
  )
}

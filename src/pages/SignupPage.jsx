import { Link } from 'react-router-dom'
import SignupForm from '@/components/auth/SignupForm'
import Card from '@/components/common/Card'

export default function SignupPage() {
  return (
    <section className="container-orbit flex min-h-[70vh] items-center justify-center py-16">
      <Card className="w-full max-w-xl">
        <h1 className="font-display text-2xl font-bold text-orbit-ink">Create your account</h1>
        <p className="mt-1 mb-6 text-sm text-orbit-ink-soft">Start on the Basic tier — free, always.</p>
        <SignupForm />
        <p className="mt-6 text-center text-sm text-orbit-mist">
          Already enrolled?{' '}
          <Link to="/login" className="font-semibold text-orbit-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </Card>
    </section>
  )
}

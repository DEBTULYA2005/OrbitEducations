import { Link } from 'react-router-dom'
import LoginForm from '@/components/auth/LoginForm'
import Card from '@/components/common/Card'

export default function LoginPage() {
  return (
    <section className="container-orbit flex min-h-[70vh] items-center justify-center py-16">
      <Card className="w-full max-w-md">
        <h1 className="font-display text-2xl font-bold text-orbit-ink">Welcome back</h1>
        <p className="mt-1 mb-6 text-sm text-orbit-ink-soft">Log in to continue your track.</p>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-orbit-mist">
          New to Orbit?{' '}
          <Link to="/signup" className="font-semibold text-orbit-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </Card>
    </section>
  )
}

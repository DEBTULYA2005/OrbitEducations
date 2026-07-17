import { Link } from 'react-router-dom'
import Button from '@/components/common/Button'

export default function NotFoundPage() {
  return (
    <div className="container-orbit flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="font-mono-stat text-sm font-semibold text-orbit-blue-600">404</span>
      <h1 className="mt-2 font-display text-3xl font-bold text-orbit-ink">Off orbit</h1>
      <p className="mt-3 max-w-sm text-orbit-ink-soft">
        This page doesn't exist. Let's get you back on track.
      </p>
      <Link to="/" className="mt-6">
        <Button>Back to home</Button>
      </Link>
    </div>
  )
}
